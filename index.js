/*
Website code
 - Title at the top
 - gameArea in div below title
 - gameArea has 3 states: menu, gameplay, and gameOver
   - menu state shows highscore and start button with a background of the road. start button enters gameplay state
   - gameplay state is the actual gameplay, getting hit enters gameOver state
   - gameOver freezes the screen and displays "restart" and "menu" buttons, which put the game in the gameplay and menu states respectively
 - Credits and stuff beneath the gameArea

Functions
 - keepScore()
   - uses setInteval to increment score variable by 1 each second while state === gameplay
   - compares score to highScore, briefly displays blinking text at top of screen for a few seconds when score becomes greater
 - makeCars()
   - creates car obstacles at a semi-random intervals
   - display distinct popup at elivation prior to spawning
   - cars get faster[1] and more plentiful as game continues
   - starts immediately
 - makeAircraft()
   - creates aircraft obstacles at semi-random intervals
   - display distinct popup at elivation prior to spawning
   - random elivation
   - aircraft get faster[1] and more plentiful as game continues
   - starts a random ammount of time after the game starts, maybe 15-30 seconds, but usually starts sooner than makeTrucks()
 - makeTrucks()
   - creates truck obstacles at slower, semi-random intervals
   - display distinct popup at elivation prior to spawning
   - trucks get faster[1] as game continues
   - starts a random amount of time after the game starts, maybe 25-45 seconds, usually after makeAircraft()
 - startGame()
   - removes any buttons and displays specific to the other states
   - enables controls
   - initiates keepScore() and obstacle generation
 - gameOver()
   - freezes all motion
   - stops obstacle generation
   - stops keepScore()
   - update highScore variable if score variable is greater
   - show "restart" and "menu" buttons

Notes
 - [1]: obstacle speed is randomly generate from a range that increases slowly up to a maximum speed as the game continues
*/
const area = document.getElementById("myCanvas");
const player = document.createElement("div")
const cars = document.createElement("div");

let is_punching = false
let on_car = false 
let is_jumping = false
let counter = 0


function generateCar () {
  if (counter % 2 == 0) {
      cars.classList.add('car');
  } else {
      cars.classList.add('car2');    
  }
  
  cars.onanimationend = function() {
      cars.classList.value = ""
  }

  counter += 1
}


function punch() {
  is_punching = true
  player.style.animation = ".5s linear punch"
  player.onanimationend = function() {
      player.style.animation = ".5s infinite sprint"
      is_punching = false
  }
}


function jump() {
  is_jumping = true
  player.style.animation = ".5s ease-out jump"
  player.onanimationend = function() {
      player.style.animation = ".5s infinite sprint"
      is_jumping = false
  }
}


function slide() {
  player.style.animation = ".5s ease-out slide"
  player.onanimationend = function() {
      player.style.animation = ".3s infinite sprint"
  }
}


function collisions() {
  let playerHitbox = player.getBoundingClientRect()
  let carsHitbox = cars.getBoundingClientRect()
  console.log(playerHitbox.bottom, carsHitbox.top)
  if (is_punching && playerHitbox.right < carsHitbox.left && (playerHitbox.right + 20) > carsHitbox.left) {
      cars.classList.value = ""
  
  } if (Math.round(playerHitbox.bottom) < Math.round(carsHitbox.top)){   
      console.log("hello")
      is_jumping = false
      on_car = true
      player.style.bottom = `500px`; // thank you ChatGPT
  
  } else if (!on_car && playerHitbox.bottom > carsHitbox.top && (playerHitbox.right > Math.round(carsHitbox.left) && Math.round(carsHitbox.left) > playerHitbox.left)) {
      // if the player's bottom is under the car's top  and  if the car's left side position is in between the player's left and right sides; did it this way because otherwise when the car passed under the player it would still trigger this
      alert("you lose")
  
  } if (on_car && playerHitbox.y < carsHitbox.right) {
      console.log("bye")
      on_car = false
      player.style.bottom = "0px";
  } 
}


function main() {
  area.appendChild(player);
  player.classList.add("player");
  area.appendChild(cars);
  setInterval(collisions, 1);
  setInterval(generateCar, 3000);

  // handles all keybinds
  document.addEventListener("keydown", function(event) {
      if (event.key == "ArrowUp") {
          jump()
      // fast fall code check if the down arrow is being clicked while the player is jumping
      } if (event.key == "ArrowDown" && is_jumping) {
          player.style.animationDuration = ".4s"
      } if (event.key == "ArrowDown" && !is_jumping) {
          slide()
      } if (event.key == "ArrowRight") {
          punch()
      }
  })
}



let startButton = document.getElementById("startButton"); // visible while in main menu, hidden otherwise
let menuButton = document.getElementById("menuButton"); // visible while in game over screen, hidden otherwise
let restartButton = document.getElementById("restartButton"); // visible while in game over screen, hidden otherwise
let scoreDisplay = document.getElementById("scoreDisplay"); // visible while game is running or in game over screen, hidden otherwise
let highscoreDisplay = document.getElementById("highscoreDisplay"); // visible while in main menu or game over screen, hidden otherwise
let gameOverText = document.getElementById("gameOverText"); // visible while in game over screen, hidden otherwise

let score = 0;
let highScore = 0;
let timeID;

/*
timeID = window.setInterval(keepScore, 1000);

function keepScore() {
  score++;
  scoreDisplay.textContent = `Score: ${score}`;

  if (score > highScore) {
    highScore = score;
  }
}
*/

scoreDisplay.style.visibility = "hidden";
menuButton.style.visibility = "hidden";
restartButton.style.visibility = "hidden";
gameOverText.style.visibility = "hidden";

startButton.addEventListener("click", startGame);

function lose() {
  menuButton.addEventListener("click", returnToMenu);
  restartButton.addEventListener("click", startGame);
}

function startGame() {
  main();
  startButton.style.visibility = "hidden";
  highscoreDisplay.style.visibility = "hidden";
  scoreDisplay.style.visibility = "visible";
  menuButton.style.visibility = "visible";
  restartButton.style.visibility = "visible";
  gameOverText.style.visibility = "visible";
}

function returnToMenu() {
  alert("returning to menu");

  highscoreDisplay.textContent = `High Score: ${highScore}`

  startButton.style.visibility = "visible";
  highscoreDisplay.style.visibility = "visible";
  scoreDisplay.style.visibility = "hidden";
  menuButton.style.visibility = "hidden";
  restartButton.style.visibility = "hidden";
  gameOverText.style.visibility = "hidden";
}