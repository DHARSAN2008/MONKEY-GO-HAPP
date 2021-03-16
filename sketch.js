var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var bground,bgroundImage;
var ground;

function preload(){
  
  
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")

  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  bgroundImage = loadImage("jungle.jpg");
 
}



function setup() {
  
  createCanvas(600,600)
  

 
  bground = createSprite(0,250,10,10);
  bground.addImage(bgroundImage)
  bground.scale=1
  bground.velocityX=-4;
  
  ground = createSprite(300,510,600,5);
  
  monkey = createSprite(100,500,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1
  
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  
}


function draw() {
 
  background(280);
  if(bground.x<100){
  bground.x=bground.width/2;
  }
  
  ground.visible=false;
  monkey.collide(ground)
  
  
  if(keyDown ("space")&& monkey.y>= 460){
     monkey.velocityY=-40;
  }
  
  monkey.velocityY = monkey.velocityY + 3;
  
  
  switch(score){
    case 10: monkey.scale=0.12;
      break;
    case 20: monkey.scale=0.14;
      break;
    case 30: monkey.scale=0.16;
      break;    
    case 40: monkey.scale=0.18;
      break;  
      default:break;  
  }
  
  if(obstacleGroup.isTouching(monkey)){

    monkey.visible=false;
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();

    
    textSize(30);
    fill("blue")
    text("GAME OVER",220,300)
  
  }
  
  if(FoodGroup.isTouching(monkey)){
    
    FoodGroup.destroyEach();
    score=score+2;
  }
  
  spawnFood();
  spawnObstacles();
  
  drawSprites();
  
  
  stroke("black");
  textSize(20);
  fill("blue");
  textFont("algerian");
  text("Score:"+ score,480,50);
  
}

function spawnFood(){
  
  if (frameCount % 80 === 0) {
    var food = createSprite(600,120,40,10);
    food.y = Math.round(random(200,300),10,10);
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -8;
    
     
    food.lifetime = 120;
    
    FoodGroup.add(food);
  
  }
}

function spawnObstacles(){
  
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,470,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -12;
    
     
    obstacle.lifetime = 120;
    
    obstacleGroup.add(obstacle);
  
  }
}






