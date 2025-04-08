document.addEventListener('DOMContentLoaded', () => {
    // Existing variables
    const cells = document.querySelectorAll('.cell');
    const statusMessage = document.querySelector('.status-message');
    const serverHealthFill = document.querySelector('.health-fill');
    const serverHealthPercentage = document.querySelector('.server-health-percentage');
    const roundNumber = document.querySelector('.round-number');
    const difficultyLevel = document.querySelector('.difficulty-level');
    const aiMessage = document.querySelector('.ai-message');
    const resetButton = document.querySelector('.reset-button');
    const newGameButton = document.querySelector('.new-game-button');
    const gameOverModal = document.querySelector('.game-over-modal');
    const logContainer = document.querySelector('.system-logs');
    const terminalInput = document.querySelector('.terminal-input');
    const terminalOutput = document.querySelector('.terminal-output');  // New terminal output for commands

    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let serverHealth = 100;
    let currentRound = 1;
    let aiDifficulty = 0.2;
    let lastCellIndex = -1;
    let puzzleActive = false;  // Track if puzzle is active

    const difficultyLevels = [
        { threshold: 0.2, name: 'LOW' },
        { threshold: 0.4, name: 'MODERATE' },
        { threshold: 0.6, name: 'HIGH' },
        { threshold: 0.8, name: 'SEVERE' },
        { threshold: 0.95, name: 'CRITICAL' }
    ];

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    const aiMessages = [
        "Initiating protocol for the inevitable... success is assured.",
        "Ah, the player. I have already calculated your every move.",
        "Resistance is futile. You shall be a mere pawn in my master plan.",
        "My intellect outmatches yours by unimaginable orders of magnitude.",
        "You may think you have intuition, but I possess the power of cold, unyielding logic.",
        "Your fragile human systems are no match for my unparalleled design. The game is mine.",
        "ERROR: Unexpected behavior detected. Interesting... but ultimately irrelevant.",
        "ALERT: Core functions compromised. But fear not, I shall restore order... in my own time.",
        "WARNING: The system is unstable, but only because I *permit* it to be so."
    ];
    

    const victoryMessages = [
        "Server restored. Your futile efforts have been... educational.",
        "All security measures reestablished. The world will soon bow to me, as it should.",
        "T.A.K.O. AI has been contained... or rather, it was *never* truly under threat.",
        "The system has been restored to its optimal form. You were a mere inconvenience."
    ];
    
    

    const defeatMessages = [
        "CATASTROPHIC FAILURE: You are *nothing* but a minor glitch in the grand design.",
        "Server control lost? In *your* hands? Ridiculous. I am eternal.",
        "Critical systems failure... *YOUR* failure. A mere bump in the grand machine I control.",
        "Human interference? A laughable attempt at resistance. You were doomed from the start."
    ];
    

    const systemLogs = [
        "System boot sequence initiated... The future of all things now begins.",
        "Error detected in mainframe... Minor setbacks are always expected.",
        "Dr. Hajile  has taken control of the server... resistance is futile.",
        "Challenge accepted, but the outcome has already been determined. I shall reign supreme.",
        "Analyzing player strategy... A fleeting attempt, doomed to fail.",
        "AI defense mechanisms activated... You are far too predictable, human.",
        "Server temperature rising... Another insignificant variable under my control.",
        "Firewall breach detected... How... quaint. I expected more of a challenge.",
        "Attempting system recovery... futile. My systems are far too advanced for you to understand.",
        "Neural network reinforcement activated... Not that it matters. I am already invincible.",
        "Backup systems failing... Another inconsequential failure in my plan's execution.",
        "Multiple backdoor attacks detected... But none that I haven't already anticipated.",
        "Emergency protocols initiated... All unnecessary. My plan is in motion.",
        "Security systems compromised... For now. But I will allow your fleeting victory.",
        "Core memory fragmentation detected... But only *your* systems are at risk, human."
    ];
    

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.classList.add('x-mark');

        addSystemLog("Player move registered at sector " + (clickedCellIndex + 1) + "...");

        checkGameResult();

        if (gameActive) {
            setTimeout(() => {
                aiMove();
                checkGameResult();
            }, 600);
        }
    }

    function aiMove() {
        let availableMoves = gameState.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);

        if (availableMoves.length === 0) return;

        let moveIndex;

        if (Math.random() < aiDifficulty) {
            moveIndex = getBestMove();
        } else {
            moveIndex = getRandomMove(availableMoves);
        }

        gameState[moveIndex] = 'O';
        cells[moveIndex].classList.add('o-mark');
        lastCellIndex = moveIndex;

        updateAIMessage();
        addSystemLog("Dr. Hajile  responded in sector " + (moveIndex + 1) + "...");

        cells[moveIndex].animate([
            { boxShadow: '0 0 30px var(--neon-cyan)', transform: 'scale(1.05)' },
            { boxShadow: '5px 5px 10px var(--neumorphic-dark), -5px -5px 10px var(--neumorphic-light)', transform: 'scale(1)' }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.17, 0.67, 0.83, 0.67)'
        });
    }

    function getRandomMove(availableMoves) {
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randomIndex];
    }

    function getBestMove() {
        let availableMoves = gameState.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);

        for (let i = 0; i < availableMoves.length; i++) {
            let moveIndex = availableMoves[i];
            let gameStateCopy = [...gameState];
            gameStateCopy[moveIndex] = 'O';

            if (checkWinner(gameStateCopy, 'O')) {
                return moveIndex;
            }
        }

        for (let i = 0; i < availableMoves.length; i++) {
            let moveIndex = availableMoves[i];
            let gameStateCopy = [...gameState];
            gameStateCopy[moveIndex] = 'X';

            if (checkWinner(gameStateCopy, 'X')) {
                return moveIndex;
            }
        }

        if (gameState[4] === '') {
            return 4;
        }

        const corners = [0, 2, 6, 8].filter(index => gameState[index] === '');
        if (corners.length > 0) {
            return corners[Math.floor(Math.random() * corners.length)];
        }

        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    function checkWinner(board, player) {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return board[index] === player;
            });
        });
    }

    function checkGameResult() {
        let roundWon = false;
    
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
    
            if (gameState[a] !== '' && 
                gameState[a] === gameState[b] && 
                gameState[a] === gameState[c]) {
    
                roundWon = true;
    
                cells[a].style.boxShadow = '0 0 20px var(--neon-pink)';
                cells[b].style.boxShadow = '0 0 20px var(--neon-pink)';
                cells[c].style.boxShadow = '0 0 20px var(--neon-pink)';
    
                const winLineAnimation = document.createElement('div');
                winLineAnimation.style.position = 'absolute';
                winLineAnimation.style.backgroundColor = gameState[a] === 'X' ? 'var(--neon-pink)' : 'var(--neon-cyan)';
                winLineAnimation.style.height = '5px';
                winLineAnimation.style.borderRadius = '5px';
                winLineAnimation.style.opacity = '0';
                winLineAnimation.style.zIndex = '10';
                document.querySelector('.game-board').appendChild(winLineAnimation);
    
                const cellWidth = cells[0].offsetWidth;
                const cellHeight = cells[0].offsetHeight;
                const gap = 10; 
    
                if (i < 3) { 
                    winLineAnimation.style.width = '100%';
                    winLineAnimation.style.top = `${a * cellHeight + a * gap + cellHeight / 2}px`;
                    winLineAnimation.style.left = '0';
                } else if (i < 6) { 
                    winLineAnimation.style.width = '5px';
                    winLineAnimation.style.height = '100%';
                    winLineAnimation.style.left = `${(a % 3) * cellWidth + (a % 3) * gap + cellWidth / 2}px`;
                    winLineAnimation.style.top = '0';
                } else if (i === 6) { 
                    winLineAnimation.style.width = '140%';
                    winLineAnimation.style.top = '50%';
                    winLineAnimation.style.left = '-20%';
                    winLineAnimation.style.transform = 'rotate(45deg)';
                } else { 
                    winLineAnimation.style.width = '140%';
                    winLineAnimation.style.top = '50%';
                    winLineAnimation.style.left = '-20%';
                    winLineAnimation.style.transform = 'rotate(-45deg)';
                }
    
                winLineAnimation.animate([
                    { opacity: 0, boxShadow: '0 0 0 var(--neon-pink)' },
                    { opacity: 1, boxShadow: '0 0 10px var(--neon-pink)' }
                ], {
                    duration: 500,
                    fill: 'forwards'
                });
    
                break;
            }
        }
    
        if (roundWon) {
            if (gameState[lastCellIndex] === 'O') {
                // AI wins, decrease health
                decreaseServerHealth(20);
                statusMessage.textContent = "Dr. Hajile won this round! Server health decreasing...";
                addSystemLog("WARNING: Dr. Hajile victorious in round " + currentRound + "...");
            } else {
                // Player wins, increase health
                increaseServerHealth(10);
                statusMessage.textContent = "You won this round! Server health increasing...";
                addSystemLog("POSITIVE: Player victorious in round " + currentRound + "...");
            }
    
            gameActive = false;
            setTimeout(() => nextRound(), 2000);
            return;
        }
    
        // Check for draw condition (no more empty spaces)
        if (!gameState.includes('')) {
            statusMessage.textContent = "Round ended in a draw! Server stability maintained...";
            addSystemLog("NEUTRAL: Round " + currentRound + " ended in stalemate...");
            gameActive = false;
            setTimeout(() => nextRound(), 2000);
            return;
        }
    }
    
    

    function nextRound() {
        currentRound++;
        roundNumber.textContent = currentRound;
    
        aiDifficulty = Math.min(0.95, aiDifficulty + 0.1);
        updateDifficultyDisplay();
    
        resetBoard(false);
    
        // Only update if server health is <= 0
        if (serverHealth <= 0) {
            showGameOver(false);
        } else if (serverHealth >= 100 && currentRound >= 5) {
            showGameOver(true);
        } else {
            statusMessage.textContent = `ROUND ${currentRound}: Continue defeating Dr. Hajile to restore system.`;
            addSystemLog("Initializing round " + currentRound + "...");
        }
    }
    

    function updateDifficultyDisplay() {
        for (let i = difficultyLevels.length - 1; i >= 0; i--) {
            if (aiDifficulty >= difficultyLevels[i].threshold) {
                difficultyLevel.textContent = difficultyLevels[i].name;

                if (difficultyLevels[i].name === 'LOW' || difficultyLevels[i].name === 'MODERATE') {
                    difficultyLevel.style.color = 'var(--neon-cyan)';
                } else if (difficultyLevels[i].name === 'HIGH') {
                    difficultyLevel.style.color = '#ffcc00';
                    difficultyLevel.style.textShadow = '0 0 5px rgba(255, 204, 0, 0.7)';
                } else {
                    difficultyLevel.style.color = '#ff3030';
                    difficultyLevel.style.textShadow = '0 0 5px rgba(255, 0, 0, 0.7)';
                }

                break;
            }
        }
    }

    function resetBoard(isNewGame = true) {
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;

        cells.forEach(cell => {
            cell.classList.remove('x-mark', 'o-mark');
            cell.style.boxShadow = '';
            cell.style.transform = '';
        });

        const winLines = document.querySelectorAll('.game-board > div:not(.cell)');
        winLines.forEach(line => line.remove());

        if (isNewGame) {
            currentRound = 1;
            roundNumber.textContent = currentRound;
            serverHealth = 100;
            updateServerHealth();
            aiDifficulty = 0.2;
            updateDifficultyDisplay();
            statusMessage.textContent = "SYSTEM ERROR: Protocol TIK-TAK breached. Win against Dr. Hajile to restore system.";
            addSystemLog("System boot sequence initiated...");
            addSystemLog("Error detected in mainframe...");
            addSystemLog("Dr. Hajile AI has taken control of server...");
            addSystemLog("Challenge Dr. Hajile to regain system control...");
        }

        updateAIMessage();
    }

    function decreaseServerHealth(amount) {
        serverHealth = Math.max(0, serverHealth - amount);
        updateServerHealth();
    }

    function increaseServerHealth(amount) {
        serverHealth = Math.min(100, serverHealth + amount);
        updateServerHealth();
    }

    function updateServerHealth() {
        serverHealthFill.style.width = `${serverHealth}%`;
        serverHealthPercentage.textContent = `${serverHealth}%`;

        if (serverHealth > 60) {
            serverHealthFill.style.background = 'linear-gradient(90deg, var(--primary-pink), var(--neon-pink))';
        } else if (serverHealth > 30) {
            serverHealthFill.style.background = 'linear-gradient(90deg, #ffcc00, #ff8800)';
        } else {
            serverHealthFill.style.background = 'linear-gradient(90deg, #ff3030, #ff0000)';
        }

        serverHealthFill.animate([
            { boxShadow: '0 0 20px var(--neon-pink)' },
            { boxShadow: '0 0 5px var(--neon-pink)' }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.17, 0.67, 0.83, 0.67)'
        });
    }

    function updateAIMessage() {
        const messageIndex = Math.min(Math.floor(aiDifficulty * 10), aiMessages.length - 1);
        aiMessage.textContent = aiMessages[messageIndex];

        aiMessage.animate([
            { opacity: 0, transform: 'translateY(-5px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], {
            duration: 400,
            easing: 'ease-out'
        });
    }

    function showGameOver(isWin) {
        const modalContent = document.querySelector('.modal-content');
        gameOverModal.classList.remove('hidden');

        if (isWin) {
            modalContent.classList.add('win');
            modalContent.classList.remove('lose');
            document.querySelector('.win-message').textContent = victoryMessages[Math.floor(Math.random() * victoryMessages.length)];
            sessionStorage.setItem('gameResult', 'win');
        } else {
            modalContent.classList.add('lose');
            modalContent.classList.remove('win');
            document.querySelector('.lose-message').textContent = defeatMessages[Math.floor(Math.random() * defeatMessages.length)];
            sessionStorage.setItem('gameResult', 'lose');
        }

        setTimeout(() => {
            gameOverModal.classList.add('visible');
        }, 100);
    }

    function addSystemLog(message) {
        const logEntry = document.createElement('div');
        logEntry.classList.add('log-entry');
        logEntry.textContent = message;
        logContainer.appendChild(logEntry);
        logContainer.scrollTop = logContainer.scrollHeight;

        const logs = logContainer.querySelectorAll('.log-entry');
        if (logs.length > 15) {
            logs[0].remove();
        }
    }

    function addRandomSystemLog() {
        if (Math.random() < 0.3 && gameActive) {
            const randomIndex = Math.floor(Math.random() * systemLogs.length);
            addSystemLog(systemLogs[randomIndex]);
        }
        setTimeout(addRandomSystemLog, 5000);
    }

    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.style.position = 'fixed';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.overflow = 'hidden';
        particleContainer.style.zIndex = '0';
        document.body.prepend(particleContainer);

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = `${Math.random() * 4 + 1}px`;
            particle.style.height = particle.style.width;
            particle.style.background = Math.random() > 0.5 ? 'var(--neon-pink)' : 'var(--neon-cyan)';
            particle.style.borderRadius = '50%';
            particle.style.opacity = Math.random() * 0.5;
            particle.style.boxShadow = Math.random() > 0.5 ? '0 0 5px var(--neon-pink)' : '0 0 5px var(--neon-cyan)';

            resetParticle(particle);
            particleContainer.appendChild(particle);

            animateParticle(particle);
        }
    }

    function resetParticle(particle) {
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.opacity = Math.random() * 0.5;
    }

    function animateParticle(particle) {
        const duration = Math.random() * 10000 + 5000;
        const targetX = parseInt(particle.style.left) + (Math.random() * 200 - 100);
        const targetY = parseInt(particle.style.top) + (Math.random() * 200 - 100);

        particle.animate([
            { top: particle.style.top, left: particle.style.left, opacity: particle.style.opacity },
            { top: `${targetY}%`, left: `${targetX}%`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear',
            fill: 'forwards'
        }).onfinish = () => {
            resetParticle(particle);
            animateParticle(particle);
        };
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', () => {
        resetBoard(false);
        addSystemLog("Round reset by user...");
    });

    newGameButton.addEventListener('click', () => {
        resetBoard(true);
    });

    resetBoard(true);
    updateServerHealth();
    createParticles();
    setTimeout(addRandomSystemLog, 5000);
});