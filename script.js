let player = (mark,counter) => {
    return {mark,counter}
 }
 
 let playerOne = player("X",0)
 console.log(playerOne);
 
 let selectButtons = document.querySelectorAll('button')
 
 
 let array = []
 for (let i = 0 ; i < selectButtons.length - 1 ; i++){
     selectButtons[i].dataset.index = i
 }
 
 
 selectButtons.forEach(button => button.addEventListener('click', ()=>{
     if(button.dataset.index){
    button.textContent = playerOne.mark 
    array[button.dataset.index] = playerOne.mark
    if (array[0] === "X" && array[1]==="X" && array[2]==="X") {
     alert("You win")
 }}
 }));arr
 
 