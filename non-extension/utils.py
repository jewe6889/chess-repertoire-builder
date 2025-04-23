from stockfish import Stockfish
import random
import time
import os
import sys
import requests
import re
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import json
import chess.pgn

# Find Stockfish in common locations
def find_stockfish():
    stockfish_paths = [
        '/usr/local/bin/stockfish',
        '/usr/bin/stockfish',
        '/usr/games/stockfish',
        'stockfish',
        # Add more common paths if needed
    ]
    
    for path in stockfish_paths:
        if os.path.exists(path):
            print(f"Found Stockfish at: {path}")
            return path
    
    # Try using 'stockfish' directly (it might be in PATH)
    try:
        sf = Stockfish(path="stockfish")
        return "stockfish"
    except Exception:
        pass
        
    print("Warning: Stockfish not found. Using cloud evaluation as fallback.")
    return None

# Initialize stockfish only when needed, not at import time
# This helps with testing and environments where stockfish isn't installed
def get_stockfish():
    global _stockfish
    if '_stockfish' not in globals() or _stockfish is None:
        stockfish_path = find_stockfish()
        if stockfish_path:
            try:
                _stockfish = Stockfish(path=stockfish_path)
                print("Successfully initialized Stockfish engine")
            except Exception as e:
                print(f"Error initializing Stockfish: {e}")
                _stockfish = None
        else:
            _stockfish = None
    return _stockfish

# IMPORT GAMES
def get_moves_from_gameID(gameID):

    r = requests.get("https://lichess.org/game/export/" + gameID + "?tags=false&clocks=false", headers={"accept": "application/x-ndjson"})
    moves = r.content.decode("utf-8").replace("\n", "")

    return moves

def get_fens_from_pgn(pgn_path):

    fens = []
    with open(pgn_path, encoding='utf-8') as h:
        while True:
            game = chess.pgn.read_game(h)
            if game is None:
                break

            game = game.root()
            while game.next():
                game=game.next()
                fens.append(game.board().fen())

    return fens


# STOCKFISH
def engine_cloud_eval(fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201", multiPv="5", variant="standard"):
    # Starting function to query a particular position with preferred criteria
    # Returns a json from the opening explorer API

    url = "https://lichess.org/api/cloud-eval?variant=" + variant + "&multiPv=" + multiPv + "&fen=" + fen
    r = requests.get(url, headers={"Accept": "application/x-ndjson"})
    r_text = json.loads(r.content.decode("utf-8"))

    return r_text


class TooManyRequestsError(Exception):
    pass

# OPENING EXPLORER
def opening_explorer(fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201", speeds="blitz,rapid,classical,correspondence", variant="standard", moves="30", ratings="1800,2000,2200,2500"):
    # Starting function to query a particular position with preferred criteria
    # Returns a json from the opening explorer API
    url = "https://explorer.lichess.ovh/lichess?variant=" + variant + "&moves=" + moves + "&speeds=" + speeds + "&ratings=" + ratings + "&fen=" + fen
    r = requests.get(url, headers={"Accept": "application/x-ndjson"})
    if r.status_code == 429:
        print('too many requests')
        raise TooManyRequestsError("Too Many Requests. Wait 1 minute.")
    r_text = json.loads(r.content.decode("utf-8"))
    # time.sleep(1)
    return r_text


def get_total_games_played(opening_explorer_json, from_popularity=0, to_popularity=-1, from_move="", move_system="san"):
    # Returns the denominator of the % likelihood of a move getting played

    # You can use this function to compute the numerator for a single move
    # by adjusting the from_popularity and to_popularity to two consecutive values
    # (e.g. respectively 0 and 1 to get the number of games playing the most popular move)

    # move_system = 'san' (e.g. Nf3) or 'uci' (e.g. g1f3)

    total_games_played = 0

    if from_move != "":
        return [move["white"] + move["draws"] + move["black"] for move in opening_explorer_json["moves"] if move[move_system]==from_move][0]

    for move in opening_explorer_json["moves"][from_popularity:to_popularity]:
        total_games_played += move["white"] + move["draws"] + move["black"]

    return total_games_played


def isOpening(opening_explorer_json):

    total_games_played = 0

    for move in opening_explorer_json["moves"]:
        total_games_played += move["white"] + move["draws"] + move["black"]

    if total_games_played > 5:
        return True

    else:
        return False


# OPPORTUNITY ANALYSIS
def analyse_missed_opportunity_from_fen(starting_fen, following_fen, threshold=100):

    try:
        opportunity_eval = engine_cloud_eval(starting_fen, multiPv="1")["pvs"][0]["cp"]
    except:
        stockfish = get_stockfish()
        stockfish.set_fen_position(starting_fen)
        current_position = stockfish.get_fen_position()
        opportunity_eval = stockfish.get_top_moves(1)[0]["Centipawn"]

    try:
        played_move_eval = engine_cloud_eval(following_fen, multiPv="1")["pvs"][0]["cp"]
    except:
        stockfish = get_stockfish()
        stockfish.set_fen_position(following_fen)
        current_position = stockfish.get_fen_position()
        played_move_eval = stockfish.get_top_moves(1)[0]["Centipawn"]

    diff = opportunity_eval - played_move_eval

    if (opportunity_eval - played_move_eval >= threshold):
        try:
            print("Missed opportunity to play", engine_cloud_eval(starting_fen, multiPv="1")["pvs"][0]["moves"].split(" ")[0], "to gain an advantage of +", round(diff/100,1))
        except:
            stockfish = get_stockfish()
            print("Missed opportunity to play", stockfish.get_top_moves(1)[0]["Move"], "to gain an advantage of +", round(diff/100,1))

    #elif (engine_cloud_eval(following_fen, multiPv="3")["error"] == 'Not found'):
        #print("Outside of opening phase")

    return


def get_mistake_blunder_likelihood_from_fen(fen, mistake_threshold=200, blunder_threshold=500, verbose=False):

    opening_explorer_from_fen = opening_explorer(fen)
    mistake_likelihood = 0
    blunder_likelihood = 0
    good_move = []
    total_games = get_total_games_played(opening_explorer_from_fen, from_popularity=0, to_popularity=-1)
    messages = []
    # Get initial eval
    stockfish = get_stockfish()
    stockfish.set_fen_position(fen)
    current_position = stockfish.get_fen_position()
    current_eval = stockfish.get_top_moves(1)[0]["Centipawn"]

    for move in opening_explorer_from_fen["moves"]:
        # Reinitialise
        mate_eval = None
        stockfish = get_stockfish()
        stockfish.set_fen_position(fen)
        current_position = stockfish.get_fen_position()

        # Fixing issue with castling
        if (move["san"]=='O-O')&(move["uci"]=='e8h8'):
            move["uci"]='e8g8'
        if (move["san"]=="O-O-O")&(move["uci"]=='e8a8'):
            move["uci"]='e8c8'
        if (move["san"]=='O-O')&(move["uci"]=='e1h1'):
            move["uci"]='e1g1'
        if (move["san"]=="O-O-O")&(move["uci"]=='e1a1'):
            move["uci"]='e1c1'

        # Make a move from the Opening Explorer
        stockfish.make_moves_from_current_position([move["uci"]])
        new_position = stockfish.get_fen_position()

        # Handling mates in the eval
        mate_eval = stockfish.get_top_moves(1)[0]["Mate"]
        if mate_eval != None:
            mistake_likelihood += get_total_games_played(opening_explorer_from_fen, from_move=move["uci"], move_system="uci")
            blunder_likelihood += get_total_games_played(opening_explorer_from_fen, from_move=move["uci"], move_system="uci")
            print(move["san"],
                  get_total_games_played(opening_explorer_from_fen, from_move=move["uci"], move_system="uci"),
                  total_games,
                  round(get_total_games_played(opening_explorer_from_fen, from_move=move["uci"], move_system="uci") / total_games, 3),
                  "Mate in", mate_eval)
            continue

        current_eval = stockfish.get_top_moves(1)[0]["Centipawn"]

        # Calculate evaluation difference
        diff = new_eval - current_eval

        # Automatically identifying if we're evaluating black or white
        if fen.split(" ")[1] == 'b':
            if diff <= mistake_threshold * -1:
                mistake_likelihood += get_total_games_played(opening_explorer_from_fen, from_move=move["uci"], move_system="uci")
            if diff <= blunder_threshold * -1:
                blunder_likelihood += get_total_games_played(opening_explorer_from_fen, from_move=move["uci"], move_system="uci")
            if diff > mistake_threshold * -1:
                good_move.append(move)
        else:
            if diff >= mistake_threshold:
                mistake_likelihood += get_total_games_played(opening_explorer_from_fen, from_move=move["uci"], move_system="uci")
            if diff >= blunder_threshold:
                blunder_likelihood += get_total_games_played(opening_explorer_from_fen, from_move=move["uci"], move_system="uci")
            if diff < mistake_threshold:
                good_move.append(move)

        if verbose==True:
            print(move["san"],
                  get_total_games_played(opening_explorer_from_fen, from_move=move["uci"], move_system="uci"),
                  total_games,
                  round(get_total_games_played(opening_explorer_from_fen, from_move=move["uci"], move_system="uci") / total_games, 3),
                  diff
             )

    try:
        print("")
        print("Opponent has", len(good_move), "good move(s) in this position")
        print("Opponent has a", '{:.1%}'.format(mistake_likelihood / total_games), "chance to commit a mistake")
        print("Opponent has a", '{:.1%}'.format(blunder_likelihood / total_games), "chance to commit a blunder")

        messages.append("")
        messages.append("Opponent has " + str(len(good_move)) + " good move(s) in this position")
        messages.append("Opponent has a " + '{:.1%}'.format(mistake_likelihood / total_games) + " chance to commit a mistake")
        messages.append("Opponent has a " + '{:.1%}'.format(blunder_likelihood / total_games) + " chance to commit a blunder")

    except:
        print("Not enough games in Opening Explorer")
        print("")

    return


def get_sharpest_lines_from_fen(fen="rn1qk1nr/pp3pbp/4p1p1/2ppP3/3P4/2N2B1P/PPP2PP1/R1BQK2R w KQkq - 0 9", mistake_threshold=150, blunder_threshold=400, verbose=False, dev_limit=100):
    # Initialize stockfish once at the beginning
    stockfish = get_stockfish()
    if not stockfish:
        return {
            "your_move": None,
            "best_move": None,
            "sharpest_move": None,
            "status": "Stockfish not available for analysis"
        }
    
    # Cache for opening explorer results to avoid redundant API calls
    explorer_cache = {}
    
    # Step 1: Get opening explorer data for initial position
    try:
        opening_explorer_from_fen = opening_explorer(fen)
        explorer_cache[fen] = opening_explorer_from_fen
    except TooManyRequestsError:
        return {
            "your_move": None,
            "best_move": None,
            "sharpest_move": None,
            "status": "Rate limit reached. Please try again later."
        }
    except Exception as e:
        return {
            "your_move": None,
            "best_move": None,
            "sharpest_move": None,
            "status": f"Error analyzing position: {str(e)}"
        }
    
    # Calculate total games once
    total_games = get_total_games_played(opening_explorer_from_fen, from_popularity=0, to_popularity=-1)
    if total_games == 0:
        return {
            "your_move": None,
            "best_move": None,
            "sharpest_move": None,
            "status": "Not enough games in database for analysis"
        }
    
    # Set up initial position evaluation
    stockfish.set_fen_position(fen)
    try:
        current_eval = stockfish.get_top_moves(1)[0]["Centipawn"]
    except:
        return {
            "your_move": None,
            "best_move": None,
            "sharpest_move": None,
            "status": "Error evaluating position"
        }
    
    # Step 2: Identify the most frequent move (Your Move)
    # Get the most popular move from opening explorer
    moves_with_data = []
    
    # Sort moves by popularity
    popular_moves = sorted(opening_explorer_from_fen["moves"], 
                         key=lambda m: get_total_games_played(opening_explorer_from_fen, from_move=m["uci"], move_system="uci"), 
                         reverse=True)
    
    your_move = None
    best_move = None
    sharpest_move = None
    
    if popular_moves:
        # Process the most popular move (Your Move)
        most_popular = popular_moves[0]
        your_move = process_move(most_popular, opening_explorer_from_fen, total_games, fen, 
                               stockfish, current_eval, explorer_cache, mistake_threshold, 
                               blunder_threshold, "Your Move")
        
        # Add this move to our list
        moves_with_data.append(your_move)
    
    # Step 3: Find the best move by evaluation
    for move in popular_moves[:min(5, len(popular_moves))]:  # Only check top 5 popular moves for efficiency
        move_games = get_total_games_played(opening_explorer_from_fen, from_move=move["uci"], move_system="uci")
        if move_games < 3:  # Skip moves with too few games
            continue
        
        move_data = process_move(move, opening_explorer_from_fen, total_games, fen, 
                               stockfish, current_eval, explorer_cache, mistake_threshold, 
                               blunder_threshold, "Candidate")
        
        # Track this move
        moves_with_data.append(move_data)
    
    # Sort by evaluation (highest eval first)
    moves_by_eval = sorted(moves_with_data, key=lambda m: m["eval_numeric"] if m["eval_numeric"] is not None else -9999, reverse=True)
    
    # The best move is the one with highest evaluation
    if moves_by_eval and len(moves_by_eval) > 0:
        best_move = moves_by_eval[0]
        best_move["type"] = "Best Move"
    
    # Step 4: Find the sharpest move (highest blunder likelihood for opponent)
    # Sort by blunder likelihood for opponent
    moves_by_sharpness = sorted(moves_with_data, key=lambda m: m["blunder_chance"] if m["blunder_chance"] is not None else 0, reverse=True)
    
    # The sharpest move is the one with highest blunder chance for opponent
    if moves_by_sharpness and len(moves_by_sharpness) > 0:
        sharpest_move = moves_by_sharpness[0]
        sharpest_move["type"] = "Sharpest Move"
    
    # Return structured data instead of plain text messages
    return {
        "your_move": your_move,
        "best_move": best_move,
        "sharpest_move": sharpest_move,
        "status": "success"
    }

def process_move(move, opening_explorer_from_fen, total_games, fen, stockfish, current_eval, explorer_cache, mistake_threshold, blunder_threshold, move_type):
    # Helper function to process a single move's data
    move_games = get_total_games_played(opening_explorer_from_fen, from_move=move["uci"], move_system="uci")
    popularity = round(move_games / total_games, 3)
    
    # Fix castling notation
    move_uci = move["uci"]
    if move["san"] == 'O-O' and move_uci == 'e8h8':
        move_uci = 'e8g8'
    elif move["san"] == "O-O-O" and move_uci == 'e8a8':
        move_uci = 'e8c8'
    elif move["san"] == 'O-O' and move_uci == 'e1h1':
        move_uci = 'e1g1'
    elif move["san"] == "O-O-O" and move_uci == 'e1a1':
        move_uci = 'e1c1'
    
    # Evaluate position after move
    stockfish.set_fen_position(fen)
    stockfish.make_moves_from_current_position([move_uci])
    new_position = stockfish.get_fen_position()
    
    # Get eval after move
    top_moves = stockfish.get_top_moves(1)
    if not top_moves:
        return {
            "san": move["san"],
            "uci": move_uci,
            "popularity": popularity,
            "popularity_text": f"{popularity:.1%}",
            "eval": "Unknown",
            "eval_numeric": None,
            "good_moves": 0,
            "mistake_chance": 0,
            "blunder_chance": 0,
            "type": move_type,
            "from_square": move_uci[:2],
            "to_square": move_uci[2:4]
        }
    
    mate_eval = top_moves[0]["Mate"]
    eval_text = ""
    eval_numeric = None
    
    if mate_eval is not None:
        eval_text = f"mate in {mate_eval}"
        # Use a high value for mate to sort properly
        eval_numeric = 10000 if mate_eval > 0 else -10000
    else:
        intermediate_eval = top_moves[0]["Centipawn"]
        eval_text = f"{round(intermediate_eval/100, 1)}"
        eval_numeric = intermediate_eval
    
    # Initialize other fields
    good_moves = 0
    mistake_chance = 0
    blunder_chance = 0
    
    # Get new position data - using cache if available
    if new_position in explorer_cache:
        opening_explorer_from_new_fen = explorer_cache[new_position]
    else:
        try:
            opening_explorer_from_new_fen = opening_explorer(new_position)
            explorer_cache[new_position] = opening_explorer_from_new_fen
        except:
            return {
                "san": move["san"],
                "uci": move_uci,
                "popularity": popularity,
                "popularity_text": f"{popularity:.1%}",
                "eval": eval_text,
                "eval_numeric": eval_numeric,
                "good_moves": 0,
                "mistake_chance": 0,
                "blunder_chance": 0,
                "type": move_type,
                "from_square": move_uci[:2],
                "to_square": move_uci[2:4]
            }
    
    new_total_games = get_total_games_played(opening_explorer_from_new_fen, from_popularity=0, to_popularity=-1)
    if new_total_games == 0:
        return {
            "san": move["san"],
            "uci": move_uci,
            "popularity": popularity,
            "popularity_text": f"{popularity:.1%}",
            "eval": eval_text,
            "eval_numeric": eval_numeric,
            "good_moves": 0,
            "mistake_chance": 0,
            "blunder_chance": 0,
            "type": move_type,
            "from_square": move_uci[:2],
            "to_square": move_uci[2:4]
        }
    
    # Analyze opponent's possible responses
    good_move_count = 0
    mistake_count = 0
    blunder_count = 0
    
    # Limit responses to analyze for efficiency
    response_limit = min(5, len(opening_explorer_from_new_fen["moves"]))
    for new_move in opening_explorer_from_new_fen["moves"][:response_limit]:
        move_count = get_total_games_played(opening_explorer_from_new_fen, from_move=new_move["uci"], move_system="uci")
        
        # Skip rarely played moves with insufficient sample size
        if move_count < 2:
            continue
            
        # Fix castling notation
        new_move_uci = new_move["uci"]
        if new_move["san"] == 'O-O' and new_move_uci == 'e8h8':
            new_move_uci = 'e8g8'
        elif new_move["san"] == "O-O-O" and new_move_uci == 'e8a8':
            new_move_uci = 'e8c8'
        elif new_move["san"] == 'O-O' and new_move_uci == 'e1h1':
            new_move_uci = 'e1g1'
        elif new_move["san"] == "O-O-O" and new_move_uci == 'e1a1':
            new_move_uci = 'e1c1'
        
        # Quick evaluation
        stockfish.set_fen_position(new_position)
        stockfish.make_moves_from_current_position([new_move_uci])
        newest_position = stockfish.get_fen_position()
        
        top_resp = stockfish.get_top_moves(1)
        if not top_resp:
            continue
            
        mate_eval = top_resp[0]["Mate"]
        if mate_eval is not None:
            # Count as mistake/blunder if mate is found
            mistake_count += move_count
            blunder_count += move_count
            continue
        
        newest_eval = top_resp[0]["Centipawn"]
        diff = newest_eval - current_eval
        
        # Evaluate quality based on position
        is_white_to_move = newest_position.split(" ")[1] == 'w'
        
        if (is_white_to_move and diff <= -mistake_threshold) or (not is_white_to_move and diff >= mistake_threshold):
            mistake_count += move_count
            if (is_white_to_move and diff <= -blunder_threshold) or (not is_white_to_move and diff >= blunder_threshold):
                blunder_count += move_count
        else:
            good_move_count += 1
    
    # Calculate percentages
    if new_total_games > 0:
        mistake_chance = mistake_count / new_total_games if new_total_games > 0 else 0
        blunder_chance = blunder_count / new_total_games if new_total_games > 0 else 0
    
    return {
        "san": move["san"],
        "uci": move_uci,
        "popularity": popularity,
        "popularity_text": f"{popularity:.1%}",
        "eval": eval_text,
        "eval_numeric": eval_numeric,
        "good_moves": good_move_count,
        "mistake_chance": mistake_chance,
        "blunder_chance": blunder_chance,
        "type": move_type,
        "from_square": move_uci[:2],
        "to_square": move_uci[2:4]
    }
