const score = document.querySelector('.score');
const startPlaying = document.querySelector('.startPlaying');
const gamingArea = document.querySelector('.gamingArea');
// const coinCount = document.querySelector('.coin');
let coinTouch = new Audio();
let carCrash = new Audio();
let carRace = new Audio();

coinTouch.src = "sound/coin.mp3";
carCrash.src = "sound/crash.wav";
carRace.src = "sound/racing.wav";

startPlaying.addEventListener('click', startGame);

let player = { speed: 7, score: 0, coin: 0 };

let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);

function keyPressed(e) {
  e.preventDefault();
  keys[e.key] = true;
}

function keyReleased(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function isCollide(car, enemyCar) {
  carRect = car.getBoundingClientRect();
  enemyCarRect = enemyCar.getBoundingClientRect();

  return !((carRect.top > enemyCarRect.bottom) ||
    (carRect.bottom < enemyCarRect.top) ||
    (carRect.left > enemyCarRect.right) ||
    (carRect.right < enemyCarRect.left))
}



function moveLine() {
  let lines = document.querySelectorAll('.trackLine')
  lines.forEach(function (line) {

    if (line.y >= 700) {
      line.y = line.y - 750;
    }

    line.y = line.y + player.speed;
    line.style.top = line.y + "px";

  })
}

function coinCount(car, coin) {
  carRect = car.getBoundingClientRect();
  coinRect = coin.getBoundingClientRect();

  return !((carRect.top > coinRect.bottom) ||
    (carRect.bottom < coinRect.top) ||
    (carRect.left > coinRect.right) ||
    (carRect.right < coinRect.left))
}


function coin(car) {
  let coins = document.querySelectorAll('.coin')
  coins.forEach(function (coin) {

    if (coinCount(car, coin)) {
      coin.parentElement.removeChild(coin);
      player.coin = player.coin + 1;
      coinTouch.play();
    }
    if (coin.y >= 800) {
      coin.y = coin.y - 700;
      coin.style.left = Math.floor(Math.random() * 290) + "px";
    }

    coin.y = coin.y + player.speed;
    coin.style.top = coin.y + "px";

  })
}





function moveEnemyCar(car) {
  let enemyCars = document.querySelectorAll('.enemyCars')
  enemyCars.forEach(function (enemyCar) {

    if (isCollide(car, enemyCar)) {
      carCrash.play();
      endGame();
    }

    if (enemyCar.y >= 800) {
      enemyCar.y = enemyCar.y - 700;
      enemyCar.style.left = Math.floor(Math.random() * 390) + "px";
    }

    enemyCar.y = enemyCar.y + player.speed;
    enemyCar.style.top = enemyCar.y + "px";

  })
}


function endGame() {
  player.startGame = false;
  startPlaying.classList.remove('hide');

}

function playGame() {
  let car = document.querySelector('.car');
  let track = gamingArea.getBoundingClientRect();
  // console.log(track);
  if (player.startGame) {

    moveLine();
    coin(car);
    moveEnemyCar(car);

    if (keys.ArrowUp && player.y > track.top + 20) { player.y = player.y - player.speed }
    if (keys.ArrowDown && player.y < track.bottom - 90) { player.y = player.y + player.speed }
    if (keys.ArrowRight && player.x < 450) { player.x = player.x + player.speed }
    if (keys.ArrowLeft && player.x > 0) { player.x = player.x - player.speed }
    carRace.play();
    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(playGame);
    player.score++;

    score.innerText = "Score:" + player.score + "Coin:" + player.coin;


  }
}

function startGame() {
  startPlaying.classList.add('hide');
  gamingArea.innerHTML = "   "
  player.startGame = true;
  player.score = 0;
  player.coin = 0;
  window.requestAnimationFrame(playGame);

  for (i = 0; i < 5; i++) {
    let trackLine = document.createElement('div');
    trackLine.setAttribute('class', 'trackLine');
    trackLine.y = i * 150;
    trackLine.style.top = trackLine.y + "px";
    gamingArea.appendChild(trackLine);
  }


  let car = document.createElement('div');
  car.setAttribute('class', 'car');
  gamingArea.appendChild(car);


  player.y = car.offsetTop;
  player.x = car.offsetLeft;

  for (i = 0; i < 10; i++) {
    let coin = document.createElement('div');
    coin.setAttribute('class', 'coin');
    coin.y = ((i + 1) * 150) * -1;
    coin.style.top = coin.y + "px";
    coin.style.left = Math.floor(Math.random() * 290) + "px";
    gamingArea.appendChild(coin);
  }

  for (i = 0; i < 4; i++) {
    let enemyCars = document.createElement('div');
    enemyCars.setAttribute('class', 'enemyCars');
    enemyCars.y = ((i + 1) * 350) * -1;
    enemyCars.style.top = enemyCars.y + "px";
    enemyCars.style.backgroundColor = randomColor();
    enemyCars.style.left = Math.floor(Math.random() * 390) + "px";
    gamingArea.appendChild(enemyCars);
  }



}

function randomColor() {
  function color() {
    let hex = Math.floor(Math.random() * 255).toString(16);
    return ("0" + String(hex)).substr(-2);
  }
  return "#" + color() + color() + color();
}
