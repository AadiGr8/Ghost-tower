var tower,towerImg;
var door,doorImg,doorsGrp;
var climber,climberImg,climbersGrp;
var ghost,ghostImg;
var invisibleBlock,invisibleBlockGrp;
var gameState = "play";
var spookySound;
var score = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav")
}

function setup(){
  createCanvas(500,500);
  
  spookySound.loop();
  
  tower = createSprite(250,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  tower.scale=0.9
   
  ghost = createSprite(300,300,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
  
  doorsGrp = new Group();
  climbersGrp = new Group();
  invisibleBlockGrp = new Group();
    
}

function draw(){
  
  background(0);
  
  if (gameState==="play"){
  
  if(tower.y>400){
    tower.y=300;
  }
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  
    ghost.velocityY += 0.8;
    
  if(climbersGrp.isTouching(ghost)){
    ghost.velocityY=0; 
  }
    
  spawnDoors();
  
    if(invisibleBlockGrp.isTouching(ghost)||ghost.y>600){
      ghost.destroy(); 
      gameState="end";
    }
    
    if(frameCount%10===0){
      score=score+1; 
    }
    
  drawSprites();
  }
  
    stroke("red");
    fill("red");
    textSize(30);
    text("Score : "+score,200,50);
  
  if(gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",180,250); 
  }
  
}

function spawnDoors(){
  
  if(frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage("door",doorImg);
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=650;
    doorsGrp.add(door);
    ghost.depth=door.depth;
    ghost.depth += 1;
    
    climber=createSprite(200,10);
    climber.addImage("climber",climberImg);
    climber.x= door.x
    climber.velocityY=1;
    climber.lifetime=650;
    climbersGrp.add(climber);
   
    invisibleBlock=createSprite(200,15);
    invisibleBlock.visible=false;
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2
    invisibleBlock.x= door.x
    invisibleBlock.velocityY=1;
    invisibleBlock.lifetime=650;
    invisibleBlockGrp.add(invisibleBlock);
    
  }
  
}