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
const player = document.createElement("div");
const cars = document.createElement("div");

let startButton = document.getElementById("startButton"); // visible while in main menu, hidden otherwise
let menuButton = document.getElementById("menuButton"); // visible while in game over screen, hidden otherwise
let restartButton = document.getElementById("restartButton"); // visible while in game over screen, hidden otherwise
let scoreDisplay = document.getElementById("scoreDisplay"); // visible while game is running or in game over screen, hidden otherwise
let gameOverText = document.getElementById("gameOverText"); // visible while in game over screen, hidden otherwise
let punchReady = document.getElementById("punchReady"); // visible while game is running and can_punch = true;

let score = 0;
let highScore = 0;
let scoreTimer;
let carGenTimer;
let collisionTimer;
let punchTimer;

let genTime = 3000;

let is_punching = false;
let on_car = false;
let is_jumping = false;
let counter = 0;
let can_punch = true;

menuButton.style.visibility = "hidden";
restartButton.style.visibility = "hidden";
gameOverText.style.visibility = "hidden";
punchReady.style.visibility = "hidden";

startButton.addEventListener("click", startGame);
menuButton.addEventListener("click", returnToMenu);
restartButton.addEventListener("click", startGame);

function generateCar () {
  clearInterval(carGenTimer);
  if (cars.classList.value == "") {
    let car_or_plane = Math.random()
    if (car_or_plane < 0.3){
      cars.classList.add('plane')
    }else{
      let car_chosen = Math.floor(Math.random() * 13)
      cars.classList.add(['car','car','car','car','car2','car3','car4','car5','car6','car7','car8','car9','car10','car11'][car_chosen]);
    }
  }
  cars.onanimationend = function() {
      cars.classList.value = ""
  }

  rollTime();

  carGenTimer = window.setInterval(generateCar, genTime);
}

function rollTime() {
  genTime = (Math.random() * (5 - 1.5) + 1.5).toFixed(2);
  genTime *= 1000;
}

function punch() {
  if (can_punch){
    is_punching = true
    player.style.animation = ".5s linear punch"
    let punch_sound = new Audio("sounds/punch.mp3");
    punch_sound.play()
    can_punch = false
    punchReady.style.visibility = "hidden";
    punchTimer = setInterval(resetPunch, 5000);
    player.onanimationend = function() {
      player.style.animation = ".5s infinite sprint"
      is_punching = false
    }
    player.onanimationcancel = function() {
      is_punching = false
    }
  }
}

function resetPunch(){
  is_punching = false
  can_punch = true
  punchReady.style.visibility = "visible";
  clearInterval(punchTimer);
}

function jump() {
  is_jumping = true
  if(player.style.animation != "death"){
  player.style.animation = "1s linear jump"
  player.onanimationend = function() {
      player.style.animation = ".5s infinite sprint"
      is_jumping = false
  }}
}


function slide() {
  if(player.style.animation != "death"){
  player.style.animation = ".5s ease-out slide"
  player.onanimationend = function() {
      player.style.animation = ".5s infinite sprint"
  }}
}


function collisions() {
  let playerHitbox = player.getBoundingClientRect()
  
  let carsHitbox = cars.getBoundingClientRect()
  if (is_punching && (carsHitbox.left + 100) < playerHitbox.right && carsHitbox.left > playerHitbox.left) {
    cars.classList.value = ""
    let explosion = new Audio('sounds/deltarune_explosion.mp3')
    explosion.play()
    is_punching = false
  } else if (!is_punching && !on_car && playerHitbox.bottom > carsHitbox.top && playerHitbox.right > carsHitbox.left && playerHitbox.left < carsHitbox.left) { //&& playerHitbox.right < carsHitbox.right) {
    // if the player's bottom is under the car's top  and  if the car's left side position is in between the player's left and right sides; did it this way because otherwise when the car passed under the player it would still trigger this
    console.log("you lose");
    lose();
  }
  /*
  if (Math.abs(Math.round(playerHitbox.bottom) - Math.round(carsHitbox.top)) < 5){   
    console.log("hello")
    is_jumping = false
    on_car = true
    player.style.bottom = `${parseInt(Math.round(carsHitbox.top)) - 20}px`; // thank you ChatGPT  
  } else {
    // console.log("bye")
    on_car = false
    player.style.bottom = "90px";
  } */
}

function keepScore() {
  score++;
  scoreDisplay.textContent = `Score: ${score}`;
}

function lose() {
  document.getElementById("background_music").pause()

  player.style.animation = ""
  player.style.animation = "1s linear death"
    if (score > highScore) {
    highScore = score;
  }

  punchReady.style.visibility = "hidden";

  scoreDisplay.textContent = `High Score: ${highScore}`;

  clearInterval(scoreTimer);
  clearInterval(carGenTimer);
  clearInterval(collisionTimer);
  clearInterval(punchTimer);

  menuButton.style.visibility = "visible";
  restartButton.style.visibility = "visible";
  gameOverText.style.visibility = "visible";
}

function startGame() {
  is_punching = false
  //document.removeChild(player)
  // player = document.createElement("div")
  startButton.style.visibility = "hidden";
  menuButton.style.visibility = "hidden";
  restartButton.style.visibility = "hidden";
  gameOverText.style.visibility = "hidden";
  punchReady.style.visibility = "visible";
  can_punch = true;
  score = 0;
  document.getElementById("background_music").play()
  scoreDisplay.textContent = `Score: ${score}`;
  
  area.appendChild(player);
  player.classList.add("player");
  area.appendChild(cars);
  player.style.animation = ".5s infinite sprint";
  collisionTimer = setInterval(collisions, 1); // check for collisions every millisecond
  generateCar(); // generate a car every interval
  scoreTimer = window.setInterval(keepScore, 1000); // increment score by 1 every se0cond

  score = 0;

  // handles all keybinds
  document.addEventListener("keydown", function(event) {
      if (event.key == "w" || event.key == "W") {
        is_punching = false  
        jump()
      // fast fall code check if the down arrow is being clicked while the player is jumping
      } if (event.key == "s" || event.key == "S" && is_jumping) {
        is_punching = false  
        player.style.animationDuration = ".4s"
      } if (event.key == "s" || event.key == "S" && !is_jumping) {
          is_punching = false
          slide()
      } if (event.key == "d" || event.key == "D") {
          punch()
      }
  })
}

function returnToMenu() {
  console.log("returning to menu");

  startButton.style.visibility = "visible";
  menuButton.style.visibility = "hidden";
  restartButton.style.visibility = "hidden";
  gameOverText.style.visibility = "hidden";
}