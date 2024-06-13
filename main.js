// Helicopter Game Start

// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables (Once)
let heliImg = document.createElement("img");
heliImg.src = "img/heliBlueTransparent.png";

let explosion = document.createElement("audio");
explosion.src = "sound/explosion.wav"

let propeller = document.createElement("audio");
propeller.src = "sound/propeller.wav"
let bestDistance = 0;
let mouseIsPressed = false;

// Global Variables (reset)
let distancePlus;
let wallSpeedVariable;
let wallspeed;
let distance;
let state = "start";
let heli;
let wall1, wall2, wall3;
let topWall1, topWall2, topWall3;
let powerBox
reset();

// Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state === "start") {
    drawStart();
  } else if (state === "gameon") {
    runGame();
  } else if (state === "gameover") {
  drawGameOver();
  }
  // Request Animation Frame
  requestAnimationFrame(draw);
}

// EVENT STUFF
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);

function mousedownHandler() {
  mouseIsPressed = true;
  //Play propeller sound
  propeller.currentTime = 0;
  propeller.play()

  // Start Game on Mousedown
  if (state === "start") {
    state = "gameon"
  }
}

function mouseupHandler() {
  propeller.pause()
  mouseIsPressed = false;
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

let aPressed = false;
let dPressed = false;

function keyDownHandler(event) {
  if (event.code == "KeyA") {
    aPressed = true;
  }
  if (event.code == "KeyD") {
    dPressed = true;
  }
}

function keyUpHandler(event) {
  if (event.code == "KeyA") {
    aPressed = false;
  }
  if (event.code == "KeyD") {
    dPressed = false;
  }
}