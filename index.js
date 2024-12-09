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

let startButton = document.getElementById("startButton");
let menuButton = document.getElementById("menuButton");
let restartButton = document.getElementById("restartButton");

menuButton.style.visibility = "hidden";
restartButton.style.visibility = "hidden";

startButton.addEventListener("click", startGame);
menuButton.addEventListener("click", returnToMenu);
restartButton.addEventListener("click", startGame);

function startGame() {
  alert("starting game");
  startButton.style.visibility = "hidden";
  menuButton.style.visibility = "visible";
  restartButton.style.visibility = "visible";
}

function returnToMenu() {
  alert("returning to menu");
  startButton.style.visibility = "visible";
  menuButton.style.visibility = "hidden";
  restartButton.style.visibility = "hidden";
}