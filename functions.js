// FUNCTIONS

// Draw Start Screen
function drawStart() {
    drawMainComponents();
  
    // Start Text
    ctx.font = "40px Consolas";
    ctx.fillStyle = "lightblue";
    ctx.fillText("CLICK TO START", 350, 285)
  
    ctx.font = "25px Consolas";
    ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
    ctx.fillText("RELEASE TO GO DOWN", 415, 480);
    ctx.fillText("USE A AND D TO MOVE LEFT/RIGHT WHILE GOING UP", 45, 510);
}
  


function runGame() {
    // Locig
    moveHeli();
    moveWalls();
    checkCollisions(heli, wall1);
    checkCollisions(heli, wall2);
    checkCollisions(heli, wall3);
    checkCollisions(heli, topWall1);
    checkCollisions(heli, topWall2);
    checkCollisions(heli, topWall3);
    checkSafeCollisions(heli, powerBox);

    //Draw
    drawGame();
}

function moveHeli() {
    distance = distance + Math.floor(distancePlus);
    // Accelerate upward if mouse pressed
    if (mouseIsPressed) {
        heli.speed += -1;
    }

    // Spply Gravity (accel)
    heli.speed += heli.accel;

    // Constrain Speed (max/min)
    if (heli.speed > 5) {
        heli.speed = 5;
    } else if (heli.speed < -5) {
        heli.speed = -5
    }
    //Move heliby its speed
    heli.y += heli.speed;

    // Move to the side
    if (mouseIsPressed && aPressed) {
        distance += Math.round(heli.sidespeed)
        heli.sidespeed = heli.sidespeed - heli.accelside
    }
    if (mouseIsPressed && dPressed) {
        distance += Math.round(heli.sidespeed)
        heli.sidespeed = heli.sidespeed + heli.accelside
    }

    if ((!mouseIsPressed||!dPressed) && heli.sidespeed > 0) {
        distance += Math.round(heli.sidespeed)
        heli.sidespeed = heli.sidespeed - heli.decelside
    }
    if ((!mouseIsPressed||!aPressed) && heli.sidespeed < 0) {
        distance += Math.round(heli.sidespeed)
        heli.sidespeed = heli.sidespeed + heli.decelside
    }

    //side Limites
    if (heli.x < 0){
        heli.x = 0
    }
    if (heli.x + heli.w > 800) {
        heli.x = 800 - heli.w
    }

    // Speed control
    if (heli.sidespeed > 5) {
        heli.sidespeed = 5;
    } else if (heli.sidespeed < -5) {
        heli.sidespeed = -5
    }
    heli.x = heli.x + Math.floor(heli.sidespeed);
}

function moveWalls() {

    if (distance >= wallSpeedVariable) {
        wallspeed -= 0.5;
        wallSpeedVariable += 500
        distancePlus += 0.5;
    }

    // Wall1
    wall1.x += wallspeed;
    if(wall1.x + wall1.w < 0) {
        wall1.x = wall3.x + 500;
        wall1.y = Math.random() * 300 + 100;
    }

    // Wall2
    wall2.x += wallspeed;
    if(wall2.x + wall2.w < 0) {
        wall2.x = wall1.x + 500;
        wall2.y = Math.random() * 300 + 100;
    }

    // Wall3
    wall3.x += wallspeed;
    if(wall3.x + wall3.w < 0) {
        wall3.x = wall2.x + 500;
        wall3.y = Math.random() * 300 + 100;
    }

    // Vertical Wall 1
    topWall1.y += wallspeed;
    if(topWall1.y + topWall1.h < 0) {
        topWall1.y = topWall3.y + 200;
        topWall1.x = Math.random() * 700;
    }

    // Vertical Wall 2
    topWall2.y += wallspeed;
    if(topWall2.y + topWall2.h < 0) {
        topWall2.y = topWall1.y + 200;
        topWall2.x = Math.random() * 700;
    }

    // Vertical Wall 3
    topWall3.y += wallspeed;
    if(topWall3.y + topWall3.h < 0) {
        topWall3.y = topWall2.y + 200;
        topWall3.x = Math.random() * 700;
    }

    powerBox.x += wallspeed*3;
    if(powerBox.x + powerBox.w < 0) {
        powerBox.x = 10000;
        powerBox.y = Math.random() * 300 + 100;
    }
}

function checkCollisions(s1, s2) {
    // Collision with Top and Bottom Green Bars
    if (heli.y < 50) {
        gameOver();
    } else if (heli.y + heli.h > cnv.height - 50) {
        gameOver();
    }

    // Collision with walls
    if (s1.x + s1.w > s2.x &&
        s1.y + s1.h > s2.y &&
        s1.x < s2.x + s2.w &&
        s1.y < s2.y + s2.h) {
        gameOver();
    }
}

function checkSafeCollisions(s1, s2) {
    // Collision with Top and Bottom Green Bars

    // Collision with walls
    if (s1.x + s1.w > s2.x &&
        s1.y + s1.h > s2.y &&
        s1.x < s2.x + s2.w &&
        s1.y < s2.y + s2.h) {
        heli.w = 40
        heli.h = 20
        heli.accelside = 0.4;
        setTimeout(setSize, 10000)
    }
}

function setSize() {
    heli.w = 80;
    heli.h = 40;
    heli.accelside = 0.2

}

function gameOver() {
    explosion.play()
    state = "gameover";

    if (distance > bestDistance) {
        bestDistance = distance;
    }

    setTimeout(reset, 2000);
}

// Draw Game Elements
function drawGame() {
    drawMainComponents();
    drawWalls()
}
  
// Draw Game Over Screen
function drawGameOver() {
    drawMainComponents();
    drawWalls();
  
    // Circle around Helicopter
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 60, 0, 2 * Math.PI);
    ctx.stroke();
  
    // Game Over Text
    ctx.font = "40px Consolas";
    ctx.fillStyle = "lightblue";
    ctx.fillText("GAME OVER", 350, 285);
}

// Helper Functions

function reset() {

    state = "start";
    heli = {
    x: 200,
    y: 250,
    w: 80,
    h: 40,
    sidespeed: 0,
    accelside: 0.2,
    decelside: 0.1,
    speed: 0,
    accel: 0.7
    }
    wall1 = {
    x: cnv.width,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100
    }
    wall2 = {
    x: cnv.width + 500,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100
    }
    wall3 = {
    x: cnv.width + 1000,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100
    }
    topWall1 = {
    x: Math.random() * 700,
    y: cnv.height,
    w: 100,
    h: 50
    }
    topWall2 = {
    x: Math.random() * 700,
    y: cnv.height + 300,
    w: 100,
    h: 50
    }
    topWall3 = {
    x: Math.random() * 700,
    y: cnv.height + 600,
    w: 100,
    h: 50
    }
    powerBox = {
    x: cnv.width + 10000,
    y: Math.random() * 300 + 100,
    w: 10,
    h: 10
    }
    distance = 0;
    wallspeed = -3;
    wallSpeedVariable = 500;
    distancePlus = 1;
}

function drawWalls() {
    ctx.fillStyle = "green";
    ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
    ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
    ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);
    ctx.fillRect(topWall1.x, topWall1.y, topWall1.w, topWall1.h);
    ctx.fillRect(topWall2.x, topWall2.y, topWall2.w, topWall2.h);
    ctx.fillRect(topWall3.x, topWall3.y, topWall3.w, topWall3.h);
    ctx.fillStyle = "red"
    ctx.fillRect(powerBox.x, powerBox.y, powerBox.w, powerBox.h);
}

function drawMainComponents() {

    // Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
  
    // Green Bars
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, cnv.width, 50);
    ctx.fillRect(0, cnv.height - 50, cnv.width, 50);
    
    // Green Bar Text
    ctx.font = "30px Consolas";
    ctx.fillStyle = "black";
    ctx.fillText("HELICOPTER GAME", 25, 35);
    ctx.fillText(`DISTANCE: ${distance}`, 25, cnv.height - 15);
    ctx.fillText(`BEST: ${bestDistance}`, cnv.width - 250, cnv.height - 15);
    
    // Helicopter
    ctx.drawImage(heliImg, heli.x, heli.y, heli.w, heli.h);
}