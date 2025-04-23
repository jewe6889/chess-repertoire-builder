function processPGN(moves) {
  console.log('processPGN', JSON.stringify(moves));
}

function addBookSymbol(move) {
  // Skip if move is '...'
  if (move.innerText === '...') return;

  // Find the san element and its parent
  const sanElement = move.querySelector('san');
  const moveParent = sanElement || move;
  const evalTag = moveParent.querySelector('eval');

  // Check if emoji already exists in innerHTML
  const hasEmoji = moveParent.innerHTML.includes('📖');

  // Only add if emoji isn't already present
  if (!hasEmoji) {
    const emojiSpan = document.createElement('span');
    emojiSpan.textContent = '  📖';
    
    if (evalTag) {
      moveParent.insertBefore(emojiSpan, evalTag);
    } else {
      moveParent.appendChild(emojiSpan);
    }
  }
}

function expandRepertoire(game, repertoire) {
  let currentRepertoire = repertoire;
  for (let i = 0; i < game.length; i++) {
    let move = game[i];
    if (currentRepertoire.hasOwnProperty(move)) {
      currentRepertoire = currentRepertoire[move];
    } else {
      currentRepertoire[move] = {};
      currentRepertoire = currentRepertoire[move];
    }
  }
  return repertoire;
}

function findCommonMoves(moves, repertoire) {
  console.log('moves', JSON.stringify(moves));
  console.log('repertoire:', JSON.stringify(repertoire));

  let currentPosition = repertoire;
  let lastCommonIndex = -1;
  
  // Iterate through moves array
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    // Check if current move exists in repertoire
    if (currentPosition[move]) {
      lastCommonIndex = i;
      currentPosition = currentPosition[move];
    } else {
      break;
    }
  }

  // Calculate if we're on black's move based on lastCommonIndex
  const isBlack = (lastCommonIndex + 1) % 2 === 1;
  
  return {
    lastCommonIndex,
    isBlack
  };
}

/**
 * Analyzes the current position against the repertoire and handles displaying results
 * @param {Array} moves - Array of moves played in the game
 * @param {Object} repertoire - User's repertoire object
 * @returns {Object} Analysis results including message and sharpest lines
 */
function analyzeRepertoirePosition(moves, repertoire) {
  const { lastCommonIndex, isBlack } = findCommonMoves(moves, repertoire);
  
  // Perfect match - all moves followed repertoire
  if (lastCommonIndex === moves.length - 1) {
    return {
      message: "Congratulations! You perfectly followed your repertoire. Keep up the great work!",
      perfectMatch: true,
      moves: [] // No need for sharpest lines analysis
    };
  }
  
  // Calculate the deviation point
  const deviationIndex = lastCommonIndex + 1;
  
  // Handle case where moves deviated from repertoire
  if (deviationIndex < moves.length) {
    const deviationMove = moves[deviationIndex];
    const isUserMove = (deviationIndex % 2 === 0) === !isBlack; // Check if it's user's move
    
    if (isUserMove) {
      // User deviated from repertoire
      return {
        message: `You deviated from your repertoire with ${deviationMove}`,
        perfectMatch: false,
        moves: getSharpestLines() // Replace with actual function to get sharp lines
      };
    } else {
      // Opponent deviated from repertoire
      return {
        message: `Opponent deviated from your repertoire with ${deviationMove}`,
        perfectMatch: false,
        moves: getSharpestLines() // Replace with actual function to get sharp lines
      };
    }
  }
  
  // Default response (shouldn't normally reach here)
  return {
    message: "Analyzing position...",
    perfectMatch: false,
    moves: []
  };
}

/**
 * Get sharpest lines for the current position
 * This is a placeholder function that should be replaced with actual implementation
 * @returns {Array} Array of sharp line descriptions
 */
function getSharpestLines() {
  // This would normally call the backend or use a chess engine
  // For now, returning placeholder data
  return [
    "Your move: e4 (popularity: 44.8%, eval: 0.4)",
    "Opponent has 20+ good moves in this position",
    "Opponent has a 5.2% chance to commit a mistake",
    "Opponent has a 0.8% chance to commit a blunder"
  ];
}

