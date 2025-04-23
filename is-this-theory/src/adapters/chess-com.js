class ChessComAdapter {
  constructor() {
    this.repertoire = {};
    this.moveMenu = new MoveMenu();
    console.log('ChessComAdapter initialized');
    
    // Add click listener for nodes
    document.addEventListener(
      'click',
      (e) => {
        const node = e.target.closest('.node-highlight-content');
        if (node) {
          const clickedNodeId = node.closest('[data-node]').getAttribute('data-node');
          this.moveMenu.show(node, (moveText) => {
            // Get all elements with data-node attribute
            const nodeElements = document.querySelectorAll('[data-node]');
            const moves = [];
            const nodeIds = [];
            
            // First collect all moves and node IDs up to clicked node
            for (const element of nodeElements) {
              const nodeId = element.getAttribute('data-node');
              const firstSpan = element.querySelector('span');
              const moveText = firstSpan?.innerText.split(' ')[0];
              
              if (moveText) {
                moves.push(moveText);
                nodeIds.push(nodeId);
              }

              // Stop when we reach the clicked node
              if (nodeId === clickedNodeId) {
                moves.push(moveText); // Include the clicked node's move
                nodeIds.push(nodeId); // Include the clicked node's ID
                break;
              }
            }

            this.logMoveData(nodeIds, moves);
          });
        }
      },
      true
    );

    // Add listeners for arrow key presses to hide menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        this.moveMenu.remove();
      }
    });
  }


  logMoveData(nodeIds, moves) {
    // Start from the last node ID and work backwards
    const filteredNodeIds = [];
    const filteredMoves = [];
    
    let currentFirstNum = Infinity;
    
    // Process in reverse order
    for (let i = nodeIds.length - 1; i >= 0; i--) {
      const nodeId = nodeIds[i];
      const firstNum = parseInt(nodeId.split('-')[0]);
      
      if (firstNum < currentFirstNum) {
        // Found a smaller first number, just update current
        currentFirstNum = firstNum;
      } else if (firstNum === currentFirstNum) {
        // Same first number, add to filtered list
        filteredNodeIds.unshift(nodeId);
        filteredMoves.unshift(moves[i]);
      }
      // Ignore if first number is larger
    }
    
    console.log('Filtered Node IDs:', filteredNodeIds);
    console.log('Corresponding Moves:', filteredMoves);

    // Add book emoji to each filtered node
    filteredNodeIds.forEach(nodeId => {
      const element = document.querySelector(`[data-node="${nodeId}"]`);
      if (element) {
        const span = element.querySelector('span');
        if (span && !span.textContent.includes('📖')) {
          span.appendChild(document.createTextNode(' 📖'));
        }
      }
    });

    this.repertoire = expandRepertoire(filteredMoves, this.repertoire)
    console.log('setting..')
    localStorage.setItem('repertoire', JSON.stringify(this.repertoire));
  }

  getBoardElement() {
    // Chess.com specific board element selector
    return document.querySelector('.cc-switch-button');
  }

  handleMutations(mutationsList, repertoire) {
    // Chess.com specific mutation handling
  }

  addRepertoireButton(contextMenu) {
    // Chess.com specific button addition
  }

  getMoves(activeMove) {
    // Chess.com specific move extraction logic
  }

  markRepertoireMoves(repertoire) {
    this.repertoire = repertoire;
    const moveElements = document.querySelectorAll('.node');
    if (!moveElements.length) return [];

    const moves = [];
    let currentPosition = repertoire;
    let lastCommonIndex = -1;

    for (let i = 0; i < moveElements.length; i++) {
      const moveElement = moveElements[i];
      const moveSpan = moveElement.querySelector('.node-highlight-content');
      if (!moveSpan) continue;

      const move = moveSpan.textContent.trim();
      moves.push(move);
      
      // Check if move exists in repertoire
      if (currentPosition && currentPosition[move]) {
        lastCommonIndex = i;
        currentPosition = currentPosition[move];
        
        // Check if emoji already exists
        if (!moveSpan.textContent.includes('📖')) {
          // Create and append text node instead of directly setting textContent
          const bookEmoji = document.createTextNode(' 📖');
          moveSpan.appendChild(bookEmoji);
        }
      } else {
        break;
      }
    }

    const isBlack = (lastCommonIndex + 1) % 2 === 1;
    
    // Analyze the current position and display results
    this.displayAnalysisResults(moves, repertoire);
    
    return { moves, lastCommonIndex, isBlack };
  }
  
  /**
   * Display analysis results in a notification/tooltip
   * @param {Array} moves - Array of moves played in the game
   * @param {Object} repertoire - User's repertoire object
   */
  displayAnalysisResults(moves, repertoire) {
    // Get analysis results
    const results = analyzeRepertoirePosition(moves, repertoire);
    
    // Create or update notification container
    let container = document.getElementById('repertoire-analysis-container');
    
    if (!container) {
      container = document.createElement('div');
      container.id = 'repertoire-analysis-container';
      container.style.position = 'fixed';
      container.style.bottom = '20px';
      container.style.right = '20px';
      container.style.backgroundColor = 'white';
      container.style.padding = '15px';
      container.style.borderRadius = '5px';
      container.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
      container.style.zIndex = '9999';
      container.style.maxWidth = '300px';
      container.style.transition = 'opacity 0.3s ease-in-out';
      document.body.appendChild(container);
    }
    
    // Clear previous content
    container.innerHTML = '';
    
    // Add message
    const messageElement = document.createElement('div');
    messageElement.style.fontWeight = 'bold';
    messageElement.style.marginBottom = '10px';
    messageElement.style.color = results.perfectMatch ? '#4CAF50' : '#2196F3';
    messageElement.textContent = results.message;
    container.appendChild(messageElement);
    
    // Add sharp lines if available and not a perfect match
    if (!results.perfectMatch && results.moves && results.moves.length > 0) {
      const sharpLinesTitle = document.createElement('div');
      sharpLinesTitle.style.fontWeight = 'bold';
      sharpLinesTitle.style.marginTop = '5px';
      sharpLinesTitle.style.marginBottom = '5px';
      sharpLinesTitle.textContent = 'Sharp Lines Analysis:';
      container.appendChild(sharpLinesTitle);
      
      results.moves.forEach(move => {
        const moveElement = document.createElement('div');
        moveElement.style.marginBottom = '5px';
        moveElement.textContent = move;
        container.appendChild(moveElement);
      });
    }
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '10px';
    closeButton.style.padding = '5px 10px';
    closeButton.style.backgroundColor = '#f0f0f0';
    closeButton.style.border = '1px solid #ccc';
    closeButton.style.borderRadius = '3px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = () => {
      container.style.opacity = '0';
      setTimeout(() => container.remove(), 300);
    };
    container.appendChild(closeButton);
    
    // Show the container with animation
    container.style.opacity = '0';
    setTimeout(() => {
      container.style.opacity = '1';
    }, 10);
    
    // Automatically hide after 10 seconds
    setTimeout(() => {
      if (container && document.body.contains(container)) {
        container.style.opacity = '0';
        setTimeout(() => {
          if (container && document.body.contains(container)) {
            container.remove();
          }
        }, 300);
      }
    }, 10000);
  }
}