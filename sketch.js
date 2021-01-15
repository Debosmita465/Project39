var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,backgroundImg;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;




function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  backgroundImg = loadImage("background.png");
 // gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  //jumpSound = loadSound("jump.mp3");
 // dieSound = loadSound("die.mp3");
 // checkPointSound = loadSound("checkPoint.mp3"); 
}

function setup() {
  createCanvas(displayWidth, displayHeight-100);

  console.log(displayHeight);
  ground = createSprite(displayWidth/2,displayHeight-110,displayWidth,125);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  trex = createSprite(50,displayHeight-170,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.setCollider('rectangle',0,0,trex.width,trex.height)
  trex.scale = 1;
  
  //gameOver = createSprite(300,100);
  //gameOver.addImage(gameOverImg);
  
  restart = createSprite(displayWidth/2+45,(displayHeight-100)/2);
  restart.addImage(restartImg);
  restart.scale = 0.12;
  
  //gameOver.scale = 0.5;

  //gameOver.visible = false;
  restart.visible = false;
  
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

 // ground.debug=true;
  ground.setCollider('rectangle',0,0,ground.width,3)


}

function draw() {
  background(backgroundImg);
textSize(20);
fill("black");
  text("Score: "+ score, camera.position.x+490,50);

  trex.x=camera.position.x-530;  
 
  if (gameState===PLAY){
    if(frameCount%4==0)
  {
    score++;
  }


    camera.position.x+=6;

    
    if(camera.position.x>ground.width/2+1200)
    {
      camera.position.x=640;
      obstaclesGroup.destroyEach();
      cloudsGroup.destroyEach();
      console.log(ground.x);
    }
   
    if(keyDown("space") && trex.y >= 150) {
      //jumpSound.play();
      trex.velocityY = -14;
    }
  
    trex.velocityY = trex.velocityY + 0.8;
  
    
    trex.collide(ground);
    //spawnClouds();
    spawnObstacles();
   
  //  if (score>0 && score%100 === 0){
    //  checkPointSound.play();
  //  }
  
    if(obstaclesGroup.isTouching(trex)){
     // dieSound.play();  
      gameState = END;
        
    }
  }
  else if (gameState === END) {
    //gameOver.x=camera.position.x;
    restart.x=camera.position.x;
   // gameOver.visible = true;
    restart.visible = true;
textSize(50);
text("GAME OVER",camera.position.x-150,(displayHeight-100)/2-50);

    
    //set velcity of each game object to 0
    trex.velocityY = 0;
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var cloud = createSprite(camera.position.x+600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    
     //assign lifetime to the variable
    cloud.lifetime = 100;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
   
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(camera.position.x+300,550,10,40);
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1.1;
    obstacle.lifetime = 350;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
  }
}

function reset(){
  gameState = PLAY;
 // gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);

  camera.position.x=640;
  
  score = 0;
  
}
