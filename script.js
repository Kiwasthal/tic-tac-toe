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

        let gameButtons = document.querySelectorAll('.gameBtn');

        for (let i = 0 ; i < gameButtons.length  ; i++){
            gameButtons[i].dataset.index = i
        }

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
            target++;
            selector(display).textContent = target;
        }

        let restart = () => {
            gameButtons.forEach(button => {
                button.textContent = "";
        })
    }
        selector('.bg-modal').style.display = 'flex';
        selector('.gameOne').addEventListener('click', () =>{
            playerOne.name = selector('#player-one-name').value;
            selector('.player-one-display').textContent = playerOne.name;
            playerTwo.name = selector('#player-two-name').value;
            selector('.player-two-display').textContent = playerTwo.name;
            selector('.bg-modal').style.display = 'none'; 
        })
        selector('.restart').addEventListener('click' , restart )
        
        gameButtons.forEach(button => button.addEventListener('click', () => {
            if (button.textContent != "X" && button.textContent != "O" ) {

                if (playerOne.PlayerPlaying){
                    playerInput(button, playerOne.PlayerMark);
                    updatePlayer();
                
                } else if (!playerOne.PlayerPlaying) {
                    playerInput(button, playerTwo.PlayerMark);
                    updatePlayer();
            }
                if (checkForWinner(gameBoard.boardInputs,playerOne.PlayerMark)) {
                    updateScore(flowControl.playerOneScore,".PlayerOne-score");
                    selector('.game-state').textContent = 'Player One Has Won'
                } else if (checkForWinner(gameBoard.boardInputs,playerTwo.PlayerMark)) {
                    updateScore(flowControl.playerTwoScore,".PlayerTwo-score");
                    selector('.game-state').textContent = `Player Two Has Won`;
            }
        }}));  
})();






 
 