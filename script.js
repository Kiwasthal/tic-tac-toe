const gameModule = (() => {
        let gameBoard = {
            boardInputs : [],
        };
        let createPlayer = (PlayerMark , PlayerPlaying) => {
            return {PlayerMark , PlayerPlaying}
        };

        let playerOne = createPlayer("X" , true);
        let playerTwo = createPlayer("O", false);

        let flowControl = {
            playerPlaying : playerOne.PlayerPlaying,
            playerOneScore : 0,
            playerTwoScore : 0,
            gameCount : 0
        };



        let selector = (name) => {
           return document.querySelector(name)
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
        
        let gameButtons = document.querySelectorAll('.gameBtn');


        for (let i = 0 ; i < gameButtons.length  ; i++){
                 gameButtons[i].dataset.index = i
             }

        let playerInput = (target, mark) => {
            target.textContent = mark
            gameBoard.boardInputs[target.dataset.index] = mark
        }

        let updatePlayer = () => {
            playerOne.PlayerPlaying === true ? playerOne.PlayerPlaying = false : playerOne.PlayerPlaying = true
        }

        let updateScore = (target,display) => {
            target++
            selector(display).textContent = target
        }

           
        gameButtons.forEach(button => button.addEventListener('click', () => {
            if (button.textContent != "X" && button.textContent != "O" ) {
                console.log(gameBoard.boardInputs)
                if (playerOne.PlayerPlaying){
                    playerInput(button, playerOne.PlayerMark);
                    updatePlayer();
                
                } else if (!playerOne.PlayerPlaying) {
                    playerInput(button, playerTwo.PlayerMark);
                    updatePlayer();
               
            }
                if (checkForWinner(gameBoard.boardInputs,playerOne.PlayerMark)) {
                    alert("You won");
                    updateScore(flowControl.playerOneScore,".PlayerOne-score");
                    selector('.game-state').textContent = `Player One Has Won`
                } else if (checkForWinner(gameBoard.boardInputs,playerTwo.PlayerMark)) {
                    alert("You lost");
                    updateScore(flowControl.playerTwoScore,".PlayerTwo-score");
                    selector('.game-state').textContent = `Player Two Has Won`
            }
        }}));  
})();


 
 