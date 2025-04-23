// const { addBookSymbol, expandRepertoire } = require('../helper-functions.js');


class LichessAdapter {
  constructor() {
    this.repertoire = {};
  }

  getBoardElement() {
    return document.getElementsByClassName('analyse__board')[0];
  }

  handleMutations(mutationsList, repertoire) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          if (node.id === 'analyse-cm' && node.classList.contains('visible')) {
            this.addRepertoireButton(node);
          }
        }
      }
    }
  }

  addRepertoireButton(contextMenu) {
    // Check if repertoire button already exists
    const existingButton = Array.from(contextMenu.children)
      .find(child => child.textContent === 'Add to repertoire');
    
    if (!existingButton) {
      const newLink = document.createElement('a');
      newLink.textContent = 'Add to repertoire';
      newLink.setAttribute('data-icon', '🎵');
      newLink.addEventListener("click", () => {
        const activeMove = document.querySelector('.tview2 .context-menu');
        console.log(activeMove)
        this.getMoves(activeMove);
        console.log('moves');
      });
      contextMenu.appendChild(newLink);
    }
  }

  markRepertoireMoves(repertoire) {
    this.repertoire = repertoire;
    const moveElements = document.querySelector('.tview2-column');
    if (!moveElements) return [];

    const moves = [];
    const sanElements = moveElements.querySelectorAll('move san');
    
    let currentPosition = repertoire;
    let lastCommonIndex = -1;

    for (let i = 0; i < sanElements.length; i++) {
      const sanElement = sanElements[i];
      const move = sanElement.textContent;
      moves.push(move);
      
      // Check if move exists in repertoire
      if (currentPosition && currentPosition[move]) {
        lastCommonIndex = i;
        currentPosition = currentPosition[move];
        
        // Add book emoji before the eval tag if it exists
        const moveParent = sanElement.parentNode;
        const evalTag = moveParent.querySelector('eval');
        
        // Check if emoji already exists by looking at all spans
        const hasEmoji = Array.from(moveParent.getElementsByTagName('span'))
          .some(span => span.textContent.includes('📖'));
        
        if (!hasEmoji) {
          const emojiSpan = document.createElement('span');
          emojiSpan.textContent = '  📖';
          
          if (evalTag) {
            moveParent.insertBefore(emojiSpan, evalTag);
          } else {
            moveParent.appendChild(emojiSpan);
          }
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
      container.style.fontSize = '14px';
      container.style.color = '#333';
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

  getMoves(activeMove) {
    let move = activeMove;
    let moves = [];
    let moveNodes = [];
  
    while (move) {
      if (move.tagName === "MOVE") {
        moves.unshift(move.innerText);
        moveNodes.unshift(move);
      }
      move = move.previousElementSibling;
    }
  
    let parent = activeMove.parentElement;
    // Skip line element if present
    if (parent && parent.tagName === 'LINE') {
      parent = parent.parentElement;
    }
    if (parent) parent = parent.parentElement;
    moveNodes.forEach(node => console.log(node.innerText));
    console.log("parent: ", parent);
    while (parent) {
      console.log("parent: ", parent);
      const moveChildren = [];
      const nodeChildren = [];
      let interruptFound = false;
  
      for (const child of parent.children) {
        if (interruptFound || child === activeMove) break;
        if (child.tagName === 'MOVE') {
          moveChildren.push(child.innerText);
          nodeChildren.push(child);
        }
        if (child.tagName === 'INTERRUPT') interruptFound = true;
      }
      console.log("moveChildren: ", moveChildren);
      moves = [...moveChildren, ...moves];
      moveNodes = [...nodeChildren, ...moveNodes];
      console.log(moveNodes);
      if (parent.parentElement && parent.parentElement.className === 'tview2 tview2-column') {
        while (parent) {
          if (parent.tagName === "MOVE") {
            moves.unshift(parent.innerText);
            moveNodes.unshift(parent);
          }
          parent = parent.previousElementSibling;
        }
        break;
      } else {
        parent = parent.parentElement;
      }
    }
    // --
    for (let i = 1; i < moves.length; i++) {
      if (/^\d+\.\.\./.test(moves[i]) && !/^\d+/.test(moves[i - 1])) {
        moves.splice(i - 1, 1);
        moveNodes.splice(i - 1, 1);
        i--;
      }
    }
  
    for (let i = 1; i < moves.length; i++) {
      const currentMove = moves[i];
      const prevMove = moves[i - 1];
  
      if (currentMove === '...' && prevMove === '...') {
        moves.splice(i, 1);
        moves.splice(i - 1, 1);
        moveNodes.splice(i, 1);
        moveNodes.splice(i - 1, 1);
        i -= 2;
      } else if (currentMove === '...' && i < moves.length - 1 && moves[i + 1] !== '...') {
        moves.splice(i, 1);
        moves.splice(i - 1, 1);
        moveNodes.splice(i, 1);
        moveNodes.splice(i - 1, 1);
        i -= 2;
      }
    }
  
    moves = moves.map(item => item.replace(/^\d+\.+/, ''));
    moves = moves.map(move => move.replace(/\s+.*$/, ''));
    console.log("moves:", moveNodes);
    for (const moveNode of moveNodes) {
      addBookSymbol(moveNode);
    }
    this.repertoire = expandRepertoire(moves, this.repertoire);
    console.log('setting..');
    localStorage.setItem('repertoire', JSON.stringify(this.repertoire));

    // Add book symbols only to moves that don't already have them
    for (const moveNode of moveNodes) {
      const sanElement = moveNode.querySelector('san');
      if (sanElement) {
        const moveParent = sanElement.parentNode;
        const hasEmoji = Array.from(moveParent.getElementsByTagName('span'))
          .some(span => span.textContent.includes('📖'));
        
        if (!hasEmoji) {
          const evalTag = moveParent.querySelector('eval');
          const emojiSpan = document.createElement('span');
          emojiSpan.textContent = '  📖';
          
          if (evalTag) {
            moveParent.insertBefore(emojiSpan, evalTag);
          } else {
            moveParent.appendChild(emojiSpan);
          }
        }
      }
    }
  }
}