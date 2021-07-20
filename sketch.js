//defining variables
{var player, playerLabel, playerLabelImg;
var spike, gaps, walls, collisionWalls, enemy, enemyLabel, enemyLabelImg;
var border;
var particles, particlesGroup;
var coins, coinSound;
var coinsCollected = 0;
var gameState = "start";
var startMusic, playMusic, endSound;
var coinSine = 0;
var score = 0;}
//preloading everything that needs to be loaded before it is used
function preload() {
  //loading the music
  startMusic = new Audio("startMusic.mp3");
  startMusic.volume = 0.7;
  playMusic = new Audio("playMusic.mp3");
  playMusic.volume = 0.1;
  endSound = new Audio("endSound.mp3");
  coinSound = new Audio("collected.mp3")
  playerLabelImg = loadImage("label-player.png")
  enemyLabelImg = loadImage("label-enemy.png")
}
//setting position
function setup() {

  var canvas = createCanvas(1260, 600);
  //starting the background music for the start of the game
  startMusic.play();
  //particles
  particlesGroup = new Group();
  //player
  player = createSprite(200, 525, 50, 50);
  player.shapeColor = "#107ab0";
  player.setCollider("rectangle", 0, 0, 50, 50);
  player.visible = false;
  //enemy
  enemy = createSprite(100, 525, 50, 50);
  enemy.shapeColor = 0;
  enemy.setCollider("rectangle", 0, 0, 50, 50);
  enemy.visible = false;
  //coins
  coins = createSprite(Math.round(random(1300, 1600)), 320, 35, 35);
  coins.shapeColor = "#FADA5E"
  //borders
  border1 = createSprite(630, 25, 1260, 50);
  border2 = createSprite(630, 625, 1260, 150);
  //spikes
  spike = createSprite(Math.round(random(1300, 1600)), 62.5, 25, 25);
  spike.shapeColor = "#ED2939";
  //gaps
  gaps = createSprite(Math.round(random(1300, 1600)), 574, 100, 50);
  gaps.shapeColor = 100;
  //walls and collision detectors
  walls = createSprite(Math.round(random(1300, 1600)), 80, 50, 50);
  collisionWalls = createSprite(walls.x+29.5, walls.y, 0, 50);
  //labels
  playerLabel = createSprite()
  playerLabel.addImage(playerLabelImg)
  playerLabel.scale = 0.1

  enemyLabel = createSprite()
  enemyLabel.addImage(enemyLabelImg)
  enemyLabel.scale = 0.1
}
//the game
function draw() {
  //setting the background to a dark gray
  background(100);
  //text for score and coins
  fill("white");
  textFont("monospace")
  text("coins: " + coinsCollected, 1150, 100)
  text("Score: " + score, 50, 100)
  //displaying title and instructions
  if(gameState == "start"){
    textFont("monospace")
    fill("lightgrey")
    textSize(40);
    text("Gravity Man", 200, 200)
    textSize(20);
    fill("grey")
    text("[Press Space to start]", 200, 230)
    text("[Press the up or down arrow key to change gravity]", 200, 260)
    text("[Avoid red rectangles and gaps in the floor and ceiling]", 200, 290)
    text("[Don't get pushed into the enemy by walls!]", 200, 320)
    text("[Collect as many coins as you can, and survive for as long as you can!]", 200, 350)
    text("[Both of these raise your score.]", 200, 380)
    fill("lightgreen")
    textSize(30)
    text("GOOD LUCK!", 200, 450)
    playerLabel.visible = false;
    enemyLabel.visible = false;
  }
  //starting the game
  if(keyDown("SPACE") && (gameState == "start" || gameState == "end")){
    //resetting everything
    startMusic.pause();
    score = 0;
    coinsCollected = 0;
    playMusic.currentTime = 0;
    gameState = "play";
    player.visible = true;
    player.x = 200;
    player.y = 525;
    player.velocityX = 0;
    enemy.visible = true;
    enemy.x = 100;
    enemy.y = 525;
    coins.x = Math.round(random(1300, 1600));
    coins.y = 320;
    spike.x = Math.round(random(1300, 1600));
    spike.y = 62.5;
    gaps.x = Math.round(random(1300, 1600));
    gaps.y = 574;
    walls.x = Math.round(random(1600, 1900));
    walls.y = 75;
  }
  //everything that happens in the game
  if(gameState == "play"){
    //playing the music
    playMusic.play();
    //updating the score
    textFont("monospace")
    if(frameCount%5==0){
      score++;
    }
    //labeling the player and enemy
    playerLabel.x = player.x
    playerLabel.y = player.y - 75
    playerLabel.depth = playerLabel.depth + 1;
    enemyLabel.x = enemy.x
    enemyLabel.y = enemy.y - 75
    enemyLabel.depth = enemyLabel.depth + 1;
    //setting the velocities for the obstacles and coins
    spike.velocityX = - 25;
    gaps.velocityX = - 25;
    walls.velocityX = - 25;
    coins.velocityX = -25;
    //creating the collision walls
    collisionWalls.x = walls.x - 20;
    collisionWalls.y = walls.y;
    //moving the coins in a sine wave
    coinSine = coinSine + 0.1
    coins.y = 100*Math.sin(coinSine)+320
    //bringing everything except the particles to the front
    player.depth = player.depth + 1;
    spike.depth = spike.depth + 1;
    gaps.depth = gaps.depth + 1;
    enemy.depth = enemy.depth + 1;
    coins.depth = coins.depth + 1;
    walls.depth = walls.depth + 1;
    collisionWalls.depth = collisionWalls.depth + 1;
    //setting the border positions
    border1.y = 25;
    border2.y = 625;
    //setting the enemy y position to the player y position every frame
    enemy.y = player.y;
    //resetting the positions of all obstalces and coins after they go off screen
    if(spike.x < -50){
      spike.x = 1600;
      i = Math.round(random(1,2));
      switch(i){
        case 1: spike.y = 62.5
          break;
        case 2: spike.y = 537.5
          break;
        default:break;
      }
    }
    if(gaps.x < -50){
      i = Math.round(random(1,2));
      gaps.x = 1300;
      switch(i){
        case 1: gaps.y = 574
          break;
        case 2: gaps.y = 26
          break;
        default:break;
      }
    }
    if(walls.x < -50){
      walls.x = 1300;
      switch(i){
        case 1: walls.y = 525
          break;
        case 2: walls.y = 75
          break;
        default:break;
      }
    }
    if(coins.x < -50){
      coins.visible = true;
      
      coins.x = 1300;
      coins.y = 320;
    }
    //moving the player and the enemy up, or flipping gravity upwards
    if(keyDown(UP_ARROW) && player.position.y == 525){
      player.velocityY = -60;
    }
    //moving the player and the enemy down, or flipping gravity downwards
    if(keyDown(DOWN_ARROW) && player.position.y == 75){
      player.velocityY = 60;
    }
    //"pinching" the player and enemy to make it look like they are actually moving
    if(enemy.velocityY != 0){
      player.width = 60;
      player.height = 40;
      enemy.width = 60;
      enemy.height = 40;
    }
    //resetting the size and proportions of the player and the enemy once they hit the borders
    if(enemy.velocityY == 0){
      player.width = 50;
      player.height = 50;
      enemy.width = 50;
      enemy.height = 50;
    }
    //collecting the coins
    if(player.isTouching(coins)){
      coins.x = -100;
      coinSound.play();
      coinsCollected ++;
      score = score + 15;
    }
    //collision detection with the borders and walls
    player.collide(border1);
    player.collide(border2);
    player.collide(collisionWalls);
    if(player.isTouching(collisionWalls)){
      collisionWalls.x = walls.x
      collisionWalls.y = walls.y
    }
    enemy.collide(border1);
    enemy.collide(border2);
    enemy.collide(collisionWalls);
    if(enemy.isTouching(collisionWalls)){
      collisionWalls.x = walls.x
      collisionWalls.y = walls.y
    }
    //spawning the particles
    if(frameCount%10 == 0){
    spawnParticles();
    }
    //hiding the enemy when it hits one of the obstacles
    if(enemy.isTouching(spike) || enemy.isTouching(gaps) || enemy.x < -0){
      enemy.visible = false;
      enemy.x = -50;
    }
    //resetting the enemy every 1000 frames
    if(frameCount%400 == 0){
      player.x = 200;
      enemy.visible = true;
      enemy.x = 100;
    }
  }
  //displaying the game over screen
  if(gameState == "end"){
    playMusic.pause();
    playerLabel.visible = false;
    enemyLabel.visible = false;
    textFont("monospace")
    fill("#FF7276")
    textSize(40);
    text("Game Over", 200, 200)
    textSize(20);
    fill("grey")
    text("[Press Space to restart]", 200, 240)
  }
  //setting the gamestate to "end" when the player hits one of the obstacles or the enemy, or get pushed off
  if(player.isTouching(spike) || player.isTouching(gaps) || player.isTouching(enemy) || player.x < 0){
    gameState = "end";
    player.visible = false;
    enemy.visible = false;
    collisionWalls.visible = false;
    endSound.loop = false;
    collisionWalls.visible = false;
    endSound.play();
  }
  //drawing everything
  drawSprites();
}
//the function that spawns the particles
function spawnParticles(){
  particles = createSprite(1300,Math.round(random(65, 540)),200,10);
  particles.shapeColor = 105;
  particlesGroup.add(particles);
  particlesGroup.setVelocityXEach(-15);
  particlesGroup.setLifetimeEach(100);
}