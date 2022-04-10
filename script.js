const gameModule = (() => {
            
        let gameBoard = {
            boardInputs : [ "" , "" , "" ,"" , "" , "" , "", "" , ""],
        };
        let createPlayer = (PlayerMark , PlayerPlaying) => {
            return {PlayerMark , PlayerPlaying}
        };

        let playerOne = createPlayer("X" , true);
        let playerTwo = createPlayer("O", false);

        let flowControl = {
            playerOneScore : 0,
            playerTwoScore : 0,
            gameCount : 0
        };

        let gameButtons = document.querySelectorAll('.gameBtn');

        for (let i = 0 ; i < gameButtons.length  ; i++){
            gameButtons[i].dataset.index = i
        };

        let selector = (name) => {
           return document.querySelector(name);
        };
        
        let checkForWinner = (array , mark ) => {
            if (array[0] === mark && array[1] === mark && array[2] === mark ||
                array[3] === mark && array[4] === mark && array[5] === mark ||
                array[6] === mark && array[7] === mark && array[8] === mark ||
                array[0] === mark && array[3] === mark && array[6] === mark ||
                array[1] === mark && array[4] === mark && array[7] === mark ||
                array[2] === mark && array[5] === mark && array[8] === mark ||
                array[0] === mark && array[4] === mark && array[8] === mark ||
                array[2] === mark && array[4] === mark && array[6] === mark ) {

                    return true;

            } else 
                    return false;
            }
        
        let playerInput = (target, mark) => {
            target.textContent = mark;
            gameBoard.boardInputs[target.dataset.index] = mark;
        }

        let updatePlayer = () => {
            playerOne.PlayerPlaying === true ? playerOne.PlayerPlaying = false : playerOne.PlayerPlaying = true;
        }

        let updateScore = (target,display) => {
            ++target;
            selector(display).textContent = target;
        }

        let clearButtons = () => {
            gameButtons.forEach(button => {
                button.textContent = "";
            })
        }

        let clearBoard = (array) => {
            for (let i = 0 ; i < array.length ; i++) {
                array[i] = ""
            }
        }

        selector('.gameTwo').addEventListener('click', () => {
            alert("LOL")
        })


//AI INTERFACE!!!

        class Move
            {
             constructor()
         {
        let move;
         }
          }

        isMovesLeft = (board) => {
            for(let i = 0; i < 9; i++){
                console.log(board[i]);
                if (board[i] == ''){
                 return true; }
            }      
            return false;

        }

        evaluate = (board) => {
            console.log(board);
            if ( board[0] == board[1] && board[1] == board[2]) {
                if(board[0] === "X" || board[1] === "X" || board[2] === "X"){
                    return +10;
                }
                else if ( board[0] == "O" || board[1] == "O" || board[2] == "O") {
                    return -10;
                }
            }
            if ( board[3] == board[4] && board[4] == board[5]) {
                if(board[3] == "X" || board[4] == "X" || board[5] == "X"){
                    return +10;
                }
                else if (board[3] == "O" || board[4] == "O" || board[5] == "O") {
                    return -10;
                }
            }
            if ( board[6] == board[7] && board[7] == board[8]) {
                if( board[6] == "X" || board[7] == "X" || board[8] == "X"){
                    return +10;
                }
                else if (board[6] == "O" || board[7] == "O" || board[8] == "O") {
                    return -10;
                }
            }
            if (board[0] == board[3] && board[3] == board[6]) {
                if (board[0] == "X" || board[3] == "X" || board[6] == "X") {
                    return 10
                }
                else if (board[0] == "O" || board[3] == "O" || board[6] == "O") {
                    return -10
                } 
            }
            if (board[1] == board[4] && board[4] == board[7]) {
                if (board[1] == "X" || board[4] == "X" || board[7] == "X") {
                    return 10
                }
                else if (board[1] == "O" || board[4] == "O" || board[7] == "O") {
                    return -10
                } 
            }
            if (board[2] == board[5] && board[5] == board[8]) {
                if (board[2] == "X" || board[5] == "X" || board[8] == "X") {
                    return 10
                }
                else if (board[2] == "O" || board[5] == "O" || board[8] == "O") {
                    return -10
                } 
            }
            if (board[0] == board[4] && board[4] == board[8]){
                if (board[0] == "X") {
                    return 10
                }
                else if (board[0] == "O") {
                    return -10
                }
            }
            if (board[2] == board[4] && board[4] == board[6]){
                if (board[2] == "X" ){
                    return 10
                }
                else if (board[2] == "O"){
                    return -10
                }
            }
            
    return 0   
    }

    minimax = (board, depth, isMax) => {
        if (score = 10)
           return score;
   
       if (score = -10)
           return score;
   
       if (isMovesLeft(board) == false)
           return 0;
   
       if (isMax) {
           let best = -1000
               for (let i = 0 ; i < 9; i++){
                   if (board[i] == "") {
                       board[i] == "X";
                       best = Math.max(best, minimax(board,
                           depth + 1, !isMax));
                       board[i] = "";
                   }
               }
       return best    
       }
       else {
           let best = 1000
           for (let i = 0 ; i < 9; i++ ){
               if (board[i] == '') {
                        board[i] = "O";
                        best = Math.min(best, minimax(board,
                                        depth + 1, !isMax));
                        board[i] = "";
                    }
           }
       return best; 
       }
    }

    findBestMove = (board) => {
        let bestVal = -1000;
        let bestMove = new Move();
        bestMove.move = -1
        
        for (let i = 0; i < 9 ; i++ ) {
             if (board[i] == "") {
                 board[i] = "X";
                 let moveVal = minimax(board, 0 , false);
                 board[i] = "";
                 if (moveVal > bestVal) {
                    bestMove.move  = i ;
                    bestVal = moveVal;
                 }
             }
         }
     return bestMove
    }
    



    

// //AI INTERFACE!!!!! 

        selector('.bg-modal').style.display = 'flex';
        selector('.gameOne').addEventListener('click', () =>{
            playerOne.name = selector('#player-one-name').value;
            selector('.player-one-display').textContent = playerOne.name;
            playerTwo.name = selector('#player-two-name').value;
            selector('.player-two-display').textContent = playerTwo.name;
            selector(".game-state").textContent = `${playerOne.name} is playing`
            selector('.bg-modal').style.display = 'none'; 
        })
        selector('.restart').addEventListener('click' , () =>{
            clearButtons();
            clearBoard(gameBoard.boardInputs);
            flowControl.gameCount = 0;
            flowControl.playerOneScore = 0;
            flowControl.playerTwoScore = 0;
            selector(".PlayerOne-score").textContent = `${flowControl.playerOneScore}`;
            selector(".PlayerTwo-score").textContent = `${flowControl.playerTwoScore}`;
        } )
        
        gameButtons.forEach(button => button.addEventListener('click', () => {
            
            if (button.textContent != "X" && button.textContent != "O" ) {
                flowControl.gameCount++
                if (playerOne.PlayerPlaying){
                    selector(".game-state").textContent = `${playerTwo.name} is playing`  
                    playerInput(button, playerOne.PlayerMark);
                    updatePlayer();
                    
                
                } else if (!playerOne.PlayerPlaying) {
                    console.log(findBestMove(gameBoard.boardInputs));
                    selector(".game-state").textContent = `${playerOne.name} is playing`
                    playerInput(button, playerTwo.PlayerMark);
                    updatePlayer();
                }
                if (checkForWinner(gameBoard.boardInputs,playerOne.PlayerMark)) {
                    updateScore(flowControl.playerOneScore,".PlayerOne-score");
                    selector('.game-state').textContent = `${playerOne.name} has won!`
                    clearButtons();
                    clearBoard(gameBoard.boardInputs);
                    flowControl.playerOneScore++;
                    updatePlayer();
                    flowControl.gameCount = 0;
                    
                } else if (checkForWinner(gameBoard.boardInputs,playerTwo.PlayerMark)) {
                    updateScore(flowControl.playerTwoScore,".PlayerTwo-score");
                    selector('.game-state').textContent = `${playerTwo.name} Has Won`;
                    clearButtons();
                    clearBoard(gameBoard.boardInputs);
                    flowControl.playerTwoScore++;
                    flowControl.gameCount = 0;

                } else if (flowControl.gameCount === 9) {
                    
                    selector('.game-state').textContent = `It's a Draw`; 
                    clearButtons();
                    clearBoard(gameBoard.boardInputs);
                    flowControl.gameCount = 0;
                }  
        }}));  
})();