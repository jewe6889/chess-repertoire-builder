import unittest
import io
import chess.pgn
import chess
from unittest.mock import patch, MagicMock
import json
from logic import find_first_deviation

# Create mock classes
class MockStockfish:
    def __init__(self, path=None):
        self.fen = None
        self.mock_eval = 20
        self.moves_made = []

    def set_fen_position(self, fen):
        self.fen = fen
        
    def get_fen_position(self):
        return self.fen
        
    def get_top_moves(self, n):
        return [{"Centipawn": self.mock_eval, "Move": "e4", "Mate": None}]
        
    def make_moves_from_current_position(self, moves):
        self.moves_made.extend(moves)
        # Just tracking the moves, not actually changing position

class MockResponse:
    def __init__(self, json_data, status_code=200):
        self.json_data = json_data
        self.status_code = status_code
        self.content = bytes(json.dumps(json_data), encoding='utf-8')
        
    def json(self):
        return self.json_data

def mock_opening_explorer(fen, **kwargs):
    # Return a simplified opening explorer response
    return {
        "moves": [
            {"san": "e4", "uci": "e2e4", "white": 100, "draws": 50, "black": 30},
            {"san": "d4", "uci": "d2d4", "white": 80, "draws": 40, "black": 20}
        ]
    }

def mock_get_sharpest_lines(fen, **kwargs):
    # Return simplified sharp lines
    return [
        "Your move: e4 (popularity: 44.8%, eval: 0.4)",
        "Opponent has 2 good move(s) in this position",
        "Opponent has a 5.2% chance to commit a mistake",
        "Opponent has a 0.8% chance to commit a blunder"
    ]

# Patching all external functions to avoid actual chess engine calls
@patch('utils.get_stockfish')
@patch('utils.opening_explorer', mock_opening_explorer)
@patch('utils.get_sharpest_lines_from_fen', mock_get_sharpest_lines)
@patch('utils.requests.get')
class TestRepertoireBuilder(unittest.TestCase):
    
    def setUp(self):
        # Sample repertoires and games for testing
        self.white_repertoire = '1. e4 e5 2. Nf3 Nc6 3. Bb5'
        # No 'a6' or 'Ba4' in repertoire to test novelty
        self.short_repertoire = '1. e4 e5 2. Nf3 Nc6'
        self.black_repertoire = '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6'
        
        # Games that follow the repertoire but then deviate
        self.game_novelty = '1. e4 e5 2. Nf3 Nc6 3. Bc4'  # Changed - Bishop move is novelty since repertoire has Bb5
        self.game_blunder = '1. e4 e5 2. Bc4 Nc6'  # Blunder, should have played Nf3
        self.game_opponent_deviation = '1. e4 e5 2. Nf3 d6'  # Opponent deviated with d6 instead of Nc6
        
    def test_find_first_deviation_novelty(self, mock_get, mock_stockfish):
        # Configure mocks
        mock_stockfish.return_value = MockStockfish()
        mock_get.return_value = MockResponse({"pvs": [{"cp": 20, "moves": "e4"}]})
        
        # Test when prep runs out and player plays a novelty
        result = find_first_deviation(self.short_repertoire, self.game_novelty, True)
        print(f"Novelty test result: {result['message']}")
        self.assertIn('Prep ran out', result['message'], f"Expected 'Prep ran out' but got: {result['message']}")
        self.assertIn('novelty', result['message'])

    def test_find_first_deviation_blunder(self, mock_get, mock_stockfish):
        # Configure mocks
        mock_stockfish.return_value = MockStockfish()
        mock_get.return_value = MockResponse({"pvs": [{"cp": 20, "moves": "Nf3"}]})
        
        # Test when player makes a blunder (deviates from repertoire)
        result = find_first_deviation(self.white_repertoire, self.game_blunder, True)
        print(f"Blunder test result: {result['message']}")
        # Updated assertion to match the actual message format
        self.assertIn('You should have played', result['message'])
        self.assertIn('2. Nf3', result['message'])  # Check that the correct move is mentioned
        
    def test_find_first_deviation_opponent(self, mock_get, mock_stockfish):
        # Configure mocks
        mock_stockfish.return_value = MockStockfish()
        mock_get.return_value = MockResponse({"pvs": [{"cp": 20, "moves": "Nc6"}]})
        
        # Test when opponent deviates from repertoire
        result = find_first_deviation(self.white_repertoire, self.game_opponent_deviation, True)
        print(f"Opponent deviation test result: {result['message']}")
        self.assertIn('Opponent played', result['message'])
        self.assertIn('d6', result['message'])

    def test_visualize_deviation(self, mock_get, mock_stockfish):
        """A utility method that creates a visual representation of the position at deviation"""
        # Configure mocks
        mock_stockfish.return_value = MockStockfish()
        
        # This is more of a developer aid than a test
        repertoire = '1. e4 e5 2. Nf3 Nc6 3. Bb5'
        game = '1. e4 e5 2. Nf3 Nc6 3. Bc4'
        
        # Parse game and repertoire
        game_pgn = chess.pgn.read_game(io.StringIO(game))
        rep_pgn = chess.pgn.read_game(io.StringIO(repertoire))
        
        # Navigate to the position where deviation occurs
        game_node = game_pgn
        while game_node.variations and len(game_node.variations) > 0:
            game_node = game_node.variations[0]
        
        # Display the board
        board = game_node.board()
        print("\nPosition at deviation:")
        print(board)
        print(f"FEN: {board.fen()}")
        
        # For a proper test we should assert something
        self.assertIsNotNone(board)
        
        # Simple visual test - count pieces
        pieces = board.piece_map()
        self.assertEqual(len(pieces), 32)  # All pieces should be on board at this point

# Use direct mocking for this test class to avoid dependency on the TestRepertoireBuilder class
@patch('logic.get_sharpest_lines_from_fen', mock_get_sharpest_lines)
class TestFindFirstDeviation(unittest.TestCase):
    
    def test_exact_match(self):
        """Test when a game perfectly follows the repertoire"""
        repertoire = '1. e4 e5 2. Nf3 Nc6 3. Bb5'
        game = '1. e4 e5 2. Nf3 Nc6 3. Bb5'
        
        result = find_first_deviation(repertoire, game, True)
        
        self.assertEqual(result['message'], 'No deviation detected. The game follows the repertoire exactly.')
        self.assertEqual(result['moves'], [])  # No sharpest lines when game matches repertoire
    
    def test_user_deviation(self):
        """Test when the user deviates from their repertoire"""
        repertoire = '1. e4 e5 2. Nf3 Nc6 3. Bb5'
        game = '1. e4 e5 2. d4 Nc6'
        
        result = find_first_deviation(repertoire, game, True)
        
        self.assertIn('You should have played', result['message'])
        self.assertIn('2. Nf3', result['message'])
    
    def test_opponent_deviation(self):
        """Test when the opponent deviates from the repertoire"""
        repertoire = '1. e4 e5 2. Nf3 Nc6 3. Bb5'
        game = '1. e4 d5 2. exd5'
        
        result = find_first_deviation(repertoire, game, True)
        
        self.assertIn('Opponent played', result['message'])
        self.assertIn('d5', result['message'])
    
    def test_move_beyond_repertoire(self):
        """Test when user plays a move beyond the repertoire"""
        repertoire = '1. e4 e5 2. Nf3 Nc6'
        game = '1. e4 e5 2. Nf3 Nc6 3. Bb5'
        
        result = find_first_deviation(repertoire, game, True)
        
        self.assertIn('Prep ran out', result['message'])
        self.assertIn('Bb5', result['message'])

if __name__ == "__main__":
    unittest.main()