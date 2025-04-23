import io
import chess.pgn
from utils import get_sharpest_lines_from_fen

def get_san(node, move):
    return node.board().san(move)

# TODO: Be able to infer is_user_white in the future from repertoire / get request.
def find_first_deviation(repertoire, game, is_user_white):
    repertoire = chess.pgn.read_game(io.StringIO(repertoire))
    game = chess.pgn.read_game(io.StringIO(game))

    def opponent_deviated(game_node):
        is_white_turn = game_node.turn()
        return is_white_turn if is_user_white else not is_white_turn

    repertoire_node = repertoire
    game_node = game

    shared_moves = []
    move_number = 1
    is_white_to_move = True

    while game_node.variations:
        next_moves = [variation.move for variation in repertoire_node.variations]
        if game_node.variations[0].move not in next_moves:
            break
        
        shared_moves.append(get_san(game_node, game_node.variations[0].move))
        repertoire_node = repertoire_node.variations[next_moves.index(game_node.variations[0].move)]
        game_node = game_node.variations[0]
        
        # Update move number
        if not is_white_to_move:
            move_number += 1
        is_white_to_move = not is_white_to_move

    # Check if we've reached the end of the game without deviation
    if not game_node.variations:
        return {
            'message': 'No deviation detected. The game follows the repertoire exactly.',
            'moves': []  # No need for sharpest lines analysis
        }

    # Calculate next move number for the deviation
    next_move_number = move_number
    if not is_white_to_move:
        next_move_number += 1
    
    if opponent_deviated(game_node): # either white deviated or theory ran out.
        if not next_moves:
            fen = game_node.board().fen()
            print(fen)
            analysis_results = get_sharpest_lines_from_fen(fen=fen, mistake_threshold=150, blunder_threshold=400, verbose=False, dev_limit=2)
            
            # Extract move info for visualization
            best_move = None
            if analysis_results["best_move"]:
                best_move = {
                    'from': analysis_results["best_move"]["from_square"],
                    'to': analysis_results["best_move"]["to_square"]
                }
            
            sharpest_line = None
            if analysis_results["sharpest_move"]:
                sharpest_line = {
                    'from': analysis_results["sharpest_move"]["from_square"],
                    'to': analysis_results["sharpest_move"]["to_square"]
                }
            
            return {
                'structured_moves': analysis_results, 
                'message': f'Prep ran out, you played {get_san(game_node, game_node.variations[0].move)}, novelty.',
                'bestMove': best_move,
                'sharpestLine': sharpest_line
            }
        else:
            correct_move = get_san(game_node, next_moves[0])
            # Create move notation with number
            move_notation = f"{next_move_number}. {correct_move}"
            if not is_white_to_move:
                move_notation = f"{next_move_number}... {correct_move}"
            
            # Provide from/to squares for visualization
            from_square = chess.square_name(next_moves[0].from_square)
            to_square = chess.square_name(next_moves[0].to_square)
            
            # Get sharpest lines for the current position
            fen = game_node.board().fen()
            print(fen)
            analysis_results = get_sharpest_lines_from_fen(fen=fen, mistake_threshold=150, blunder_threshold=400, verbose=False, dev_limit=2)
            
            return {
                'message': f'You should have played {move_notation} according to your prep.',
                'bestMove': {'from': from_square, 'to': to_square},
                'structured_moves': analysis_results
            }
    else:
        # need to make opponent's move and then grab the FEN
        fen = game_node.variations[0].board().fen()
        print(fen)
        analysis_results = get_sharpest_lines_from_fen(fen=fen, mistake_threshold=150, blunder_threshold=400, verbose=False, dev_limit=3)
        
        # Extract move info for visualization
        best_move = None
        if analysis_results["best_move"]:
            best_move = {
                'from': analysis_results["best_move"]["from_square"],
                'to': analysis_results["best_move"]["to_square"]
            }
        
        sharpest_line = None
        if analysis_results["sharpest_move"]:
            sharpest_line = {
                'from': analysis_results["sharpest_move"]["from_square"],
                'to': analysis_results["sharpest_move"]["to_square"]
            }
        
        opponent_move = get_san(game_node, game_node.variations[0].move)
        return {
            'structured_moves': analysis_results, 
            'message': f'Opponent played {opponent_move} deviating from your prep.',
            'bestMove': best_move,
            'sharpestLine': sharpest_line
        }

def testcases():
    repertoire = '1. e4 e5 (1... d5 2. exd5) 2. Nf3 Nc6'
    game = '1. e4 e5 2. Nf3 Nc6 3. Bc4 b5'
    assert find_first_deviation(repertoire, game, True)['message'] == 'Prep ran out, you played Bc4, novelty.', find_first_deviation(repertoire, game, True)

    repertoire = '1. e4 e5 (1... d5 2. exd5) 2. Nf3 Nc6'
    game = '1. e4 e5 2. Na3 Nc6 3. b4 b5'
    assert find_first_deviation(repertoire, game, True)['message'] == 'You should have played 2. Nf3 according to your prep.', find_first_deviation(repertoire, game, True)

    repertoire = '1. e4 e5 (1... d5 2. exd5) 2. Nf3 Nc6'
    game = '1. e4 e5 2. Nf3 a5 3.a4 b5'
    assert find_first_deviation(repertoire, game, True)['message'] == 'Opponent played a5 deviating from your prep.', find_first_deviation(repertoire, game, True)

    repertoire = '1. e4 (1. d4 e5) e5 2. Nf3 Nc6'
    game = '1. e4 e5 2. Nf3 Nc6 3. Bc4 b5'
    assert find_first_deviation(repertoire, game, False)['message'] == 'Opponent played Bc4 deviating from your prep.', find_first_deviation(repertoire, game, False)

    repertoire = '1. e4 (1. d4 e5) e5 2. Nf3 Nc6'
    game = '1. e4 c5 2. Na3 Nc6 3. b4 b5'
    assert find_first_deviation(repertoire, game, False)['message'] == 'You should have played 1... e5 according to your prep.', find_first_deviation(repertoire, game, False)

    repertoire = '1. e4 (1. d4 e5 2. dxe5) e5 2. Nf3 Nc6'
    game = '1. d4 e5 2. dxe5 Nf6 a4 b5'
    assert find_first_deviation(repertoire, game, False)['message'] == 'Prep ran out, you played Nf6, novelty.', find_first_deviation(repertoire, game, False)

# testcases()
