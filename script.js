const gameModule = (() => {
            
        let gameBoard = {
            boardInputs : [ ["", "", ""],
                            ["", "", ""],
                            ["", "", ""] ],
        };
        let createPlayer = (PlayerMark , PlayerPlaying) => {
            return {PlayerMark , PlayerPlaying}
        };

        let playerOne = createPlayer("X" , true);
        let playerTwo = createPlayer("O", false);
        let aiMark = "O";

        let flowControl = {
            playerOneScore : 0,
            playerTwoScore : 0,
            roundCount : 0
        };

        let gameButtons = document.querySelectorAll('.gameBtn');

        let selector = (name) => {
           return document.querySelector(name);
        };
        
        let checkForWinner = (array , mark ) => {
            for(let row = 0 ; row < 3 ; row++) {
                if (array[row][0] == mark && array[row][1] == mark && array[row][2] == mark) {
                    return true;
                }    
            }
            for(let col = 0; col < 3 ; col++) {
                if (array[0][col] == mark && array[1][col] == mark && array[2][col] == mark) {
                    return true;
                }
            }
            if (array[0][0] === mark && array[1][1] === mark && array[2][2] === mark){
                return true;
            }
            if (array[0][2] == mark && array[1][1] == mark && array[2][0] == mark) {
                return true;
            }  
            else  
                return false;
        }; 

        //AI IMPLEMENTATION 

        class Move {
            constructor() {
                let row,col;
            }
        };

        let isMovesLeft =(board) => {
            for(let i = 0; i < 3; i++)
                for(let j = 0; j < 3; j++)
                    if (board[i][j] == '')
                        return true;   
        return false;
        }

        let evaluate = (b) => {
            for(let row = 0; row < 3; row++){
                if (b[row][0] == b[row][1] && b[row][1] == b[row][2]){
                    if (b[row][0] == aiMark)
                        return +10;
                 
                    else if (b[row][0] == playerOne.PlayerMark)
                        return -10;
                 }
             }
             for(let col = 0; col < 3; col++){
                if (b[0][col] == b[1][col] &&b[1][col] == b[2][col]){
                     if (b[0][col] == aiMark)
                        return +10;
  
                else if (b[0][col] == playerOne.PlayerMark)
                        return -10;
                }
            }
            if (b[0][0] == b[1][1] && b[1][1] == b[2][2]){
                if (b[0][0] == aiMark)
                    return +10;
             
            else if (b[0][0] == playerOne.PlayerMark)
                    return -10;
            }
  
            if (b[0][2] == b[1][1] && b[1][1] == b[2][0]){
                if (b[0][2] == aiMark)
                    return +10;
            else if (b[0][2] == playerOne.PlayerMark)
                    return -10;
             }
        return 0;
        }

        let minimax = (board, depth, isMax) => {
            let score = evaluate(board);
            
                if (score == 10) 
                    return score;
                if (score == -10)
                    return score;

                if (isMovesLeft(board) == false)
                    return 0;
                if (isMax) {
                    let best = -1000; 
                    for(let i = 0; i < 3; i++){
                        for(let j = 0; j < 3; j++){
                            if ( board[i][j] == '' ){
                                board[i][j] = aiMark;
                                best = Math.max(best, minimax(board, depth + 1, !isMax));
                                board[i][j] = '';
                            }
                         }
                     }
                return best;
                }  
                else {
                    let best = 1000;
                    for(let i = 0; i < 3; i++) {
                        for(let j = 0; j < 3; j++){
                            if (board[i][j] == '') {
                                board[i][j] = playerOne.PlayerMark;
                                best = Math.min(best, minimax(board, depth + 1, !isMax));
                                board[i][j] = '';
                            }
                        }
                     }
                return best;
                }
            } 

            let findBestMove = (board) => {
                let bestVal = -1000;
                let bestMove = new Move();
                bestMove.row = -1;
                bestMove.col = -1;
  
                for(let i = 0; i < 3; i++){
                    for(let j = 0; j < 3; j++){
                        if (board[i][j] == ''){
                            board[i][j] = aiMark;
                            let moveVal = minimax(board, 0, false);
                            board[i][j] = '';
  
                        if (moveVal > bestVal){
                            bestMove.row = i;
                            bestMove.col = j;
                            bestVal = moveVal;
                        }
                    }
                }
            }
            
        return bestMove;
        }

        let playerInput = (target, mark) => {
            target.textContent = mark;
            gameBoard.boardInputs[target.dataset.row][target.dataset.column] = mark;
        }

        let updatePlayer = () => {
            playerOne.PlayerPlaying === true ? playerOne.PlayerPlaying = false : playerOne.PlayerPlaying = true;
        }

        let updateScore = (target,display) => {
            ++target;
            selector(display).textContent = target;
        }

        let clearButtons = () => {
            setTimeout( function() {  
            gameButtons.forEach(button => {
                button.textContent = "";
            })} ,50 )
        }

        let clearBoard = (array) => { 
            
              for (let i = 0 ; i < 3 ; i++) {
                for (let j = 0 ; j < 3 ; j++) {
                    array[i][j] = "";
                   

                }
            }
        }

        let resetButtonAnimation = () => {
            gameButtons.forEach(button => button.style.fontSize = "0em")
        }


        selector('.bg-modal').style.display = 'flex';
        selector('.restart').style.display = 'none'

        selector('.restart').addEventListener('click' , () => {
            clearButtons();
            clearBoard(gameBoard.boardInputs);
            flowControl.roundCount = 0;
            flowControl.playerOneScore = 0;
            flowControl.playerTwoScore = 0;
            selector(".PlayerOne-score").textContent = `${flowControl.playerOneScore}`;
            selector(".PlayerTwo-score").textContent = `${flowControl.playerTwoScore}`;
            playerOne.PlayerPlaying = true;
        } )

        selector('.gameOne').addEventListener('click', () =>{
            selector('.restart').style.display = ''
            playerOne.name = selector('#player-one-name').value;
            selector('.player-one-display').textContent = playerOne.name;
            playerTwo.name = selector('#player-two-name').value;
            selector('.player-two-display').textContent = playerTwo.name;
            selector(".game-state").textContent = `${playerOne.name} is playing`;
            selector('.bg-modal').style.display = 'none';
                 gameButtons.forEach(button => button.addEventListener('click', () => {
                        if (button.textContent != "X" && button.textContent != "O" ) {
                            flowControl.roundCount++
                            if (playerOne.PlayerPlaying){
                                button.style.fontSize = "4em"
                                selector(".game-state").textContent = `${playerTwo.name} is playing`;
                                playerInput(button, playerOne.PlayerMark);
                                updatePlayer();
                                    
                            } else if (!playerOne.PlayerPlaying) {
                                button.style.fontSize = "4em"
                                selector(".game-state").textContent = `${playerOne.name} is playing`;
                                playerInput(button, playerTwo.PlayerMark);
                                updatePlayer();
                            }
                                
                            if (checkForWinner(gameBoard.boardInputs,playerOne.PlayerMark)) {
                                updateScore(flowControl.playerOneScore,".PlayerOne-score");
                                selector('.game-state').textContent = `${playerOne.name} has won!`
                                clearButtons();
                                clearBoard(gameBoard.boardInputs);
                                flowControl.playerOneScore++;
                                flowControl.roundCount = 0;
                                resetButtonAnimation();
                                updatePlayer();
                        
                            } else if (checkForWinner(gameBoard.boardInputs,playerTwo.PlayerMark)) {
                                updateScore(flowControl.playerTwoScore,".PlayerTwo-score");
                                selector('.game-state').textContent = `${playerTwo.name} Has Won`;
                                clearButtons();
                                clearBoard(gameBoard.boardInputs);
                                flowControl.playerTwoScore++;
                                flowControl.roundCount = 0;
                                resetButtonAnimation();
                                playerOne.PlayerPlaying = true;
                                
    
                            } else if (flowControl.roundCount === 9) {
                                selector('.game-state').textContent = `It's a Draw`; 
                                clearButtons();
                                clearBoard(gameBoard.boardInputs);
                                flowControl.roundCount = 0;
                                resetButtonAnimation();
                        };
            }}));  
        });    
        selector('.gameTwo').addEventListener('click', () => {
            selector('.restart').style.display = ''
            selector('.bg-modal').style.display = 'none';
            selector('.player-one-display').textContent = "Player";
            selector('.player-two-display').textContent = "Computer";
            
                gameButtons.forEach(button => button.addEventListener('click', () => {
                    if (button.textContent != "X" && button.textContent != "O" ){
                        button.style.fontSize = "4em"
                        flowControl.roundCount++
                        playerInput(button, playerOne.PlayerMark);
                        if (checkForWinner(gameBoard.boardInputs,playerOne.PlayerMark)) {
                            updateScore(flowControl.playerOneScore,".PlayerOne-score");
                            selector('.game-state').textContent = 'Player has won!';
                            clearButtons();
                            clearBoard(gameBoard.boardInputs);
                            flowControl.playerOneScore++;
                            flowControl.roundCount = 0;
                            resetButtonAnimation();
                        } else if (flowControl.roundCount === 5){
                            selector('.game-state').textContent = `It's a Draw`; 
                            clearButtons();
                            clearBoard(gameBoard.boardInputs);
                            flowControl.roundCount = 0;
                            resetButtonAnimation();
                        } else {
                            if(isMovesLeft(gameBoard.boardInputs)) {
                                let bestMove = findBestMove(gameBoard.boardInputs)
                                gameBoard.boardInputs[bestMove.row][bestMove.col] = aiMark
                                for (let i = 0 ; i < gameButtons.length ; i++){
                                    if ( gameButtons[i].dataset.row == bestMove.row && gameButtons[i].dataset.column == bestMove.col) {
                                        gameButtons[i].style.fontSize = "4em"
                                        gameButtons[i].textContent = aiMark;
                                    }
                        }}
                        if (checkForWinner(gameBoard.boardInputs,aiMark)) {
                            updateScore(flowControl.playerOneScore,".PlayerTwo-score");
                            selector('.game-state').textContent = 'Computer has won!';
                            clearButtons();
                            clearBoard(gameBoard.boardInputs);
                            flowControl.playerOneScore++;
                            flowControl.roundCount = 0;
                            resetButtonAnimation();
                        }};   
                    };
            }));
        });
})();