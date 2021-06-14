const score = document.querySelector('.score');
const  startPlaying =document.querySelector('.startPlaying');
const gameArea = document.querySelector('.gameArea')


startPlaying.addEventListener('click',startGame); 
let keys = { ArrowUp : false, ArrowDown : false, ArrowLeft : false, ArrowRight : false}

document.addEventListener('keydown',keyPressed);
document.addEventListener('keyup',keyReleased);

function keyPressed(e){
  e.preventDefault();
  keys[e.key] = true;
  console.log(keys);
}

function keyReleased(e){
  e.preventDefault();
  keys[e.key] = false;
  console.log(keys);
}

function startGame() {
}