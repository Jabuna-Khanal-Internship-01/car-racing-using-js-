const score = document.querySelector('.score');
const startPlaying = document.querySelector('.startPlaying');
const gamingArea = document.querySelector('.gamingArea')


startPlaying.addEventListener('click', startGame);

let player = { speed: 5 };


let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);

function keyPressed(e) {
  e.preventDefault();
  keys[e.key] = true;
  console.log(keys);
}

function keyReleased(e) {
  e.preventDefault();
  keys[e.key] = false;
  console.log(keys);
}

function playGame() {
  console.log('hited');
  let car = document.querySelector('.car');
  let road = gamingArea.getBoundingClientRect();
  console.log(road);
  if (player.startGame) {
    if (keys.ArrowUp && player.y > road.top + 20) { player.y = player.y - player.speed }
    if (keys.ArrowDown && player.y <road.bottom-90) { player.y = player.y + player.speed }
    if (keys.ArrowRight && player.x <450) { player.x = player.x + player.speed }
    if (keys.ArrowLeft && player.x >0) { player.x = player.x - player.speed }


    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(playGame);
  }
}

function startGame() {
  gamingArea.classList.remove('hide');
  startPlaying.classList.add('hide');
  player.startGame = true;
  window.requestAnimationFrame(playGame);

  let car = document.createElement('div');
  car.setAttribute('class', 'car');
  gamingArea.appendChild(car);

  player.y = car.offsetTop;
  player.x = car.offsetLeft;

}
