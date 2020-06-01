var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud_img;
var ob1,ob2,ob3,ob4,ob5,ob6;
var score=0;
var gameState="start";
var cloud_group;
var restart_animate;
var restart_button;
var game_overanimate,game_over


var obstacles_group
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  restart_animate=loadImage("restart.png");
  groundImage = loadImage("ground2.png");
  cloud_img=loadImage("cloud.png");
  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle5.png");
ob3=loadImage("obstacle2.png");
ob4=loadImage("obstacle4.png");
ob5=loadImage("obstacle6.png");
ob6=loadImage("obstacle3.png");
  game_overanimate=loadImage("gameOver.png");
  
}

function setup() {
  createCanvas(800,200);
  
   cloud_group=new Group();
  obstacles_group=new Group();
  trex = createSprite(50,170,20,50);
  trex.addAnimation("running", trex_running);
  trex.addImage("trex",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  restart_button=createSprite(400,100,50,50);
   restart_button.addImage("res",restart_animate);
  restart_button.scale=0.5;
  
   game_over=createSprite(400,100,50,50);
  game_over.addImage("gameOver",game_overanimate);
  
  
  
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
}

function draw() {
  background(255);
  if(gameState==="start"){
    if(keyDown("space")){
       gameState="started";
      
       }
    score=0;
    ground.velocityX=0;
      restart_button.visible=false;
    game_over.visible=false;
  
    cloud_group.destroyEach();
    obstacles_group.destroyEach();
    trex.changeAnimation("running", trex_running);
     }
  if(gameState==="started"){
  
  if(keyDown("space")&& trex.y>150) {
    trex.velocityY = -15;
  }
    restart_button.visible=false;
   
  game_over.visible=false;
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
     ground.velocityX = -(3+0.5*score/60);
  
  trex.collide(invisibleGround);
  score=score+1;
  cloud_spawning();
  obstacle_spawning();
     if(obstacles_group.isTouching(trex)){
      gameState="end";
      
    }
     
  }
  if(gameState==="end"){
    ground.velocityX=0;
    trex.collide(invisibleGround);
    obstacles_group.setVelocityXEach(0);
    cloud_group.setVelocityXEach(0);
    trex.changeAnimation("trex",trex_collided);
    restart_button.visible=true;
     game_over.visible=true;
    if(mousePressedOver(restart_button)){
      gameState="start";
    }
  }
  drawSprites();
  
  text(score,50,30);
}

function cloud_spawning(){
  if(frameCount%60===0){
  var cloud=createSprite(820,Math.round(random(50,120)),50,50);
  cloud.addImage("cloud",cloud_img);
  cloud.velocityX=-(3+0.5*score/50);
    trex.depth=cloud.depth;
    trex.depth=trex.depth+10;
    cloud_group.add(cloud);
  }
}

function obstacle_spawning(){
  if(frameCount%60===0){
  var obst=createSprite(810,170,50,50);
  obst.velocityX=-(3+0.5*score/10);
    var rand=Math.round(random(1,6));
      switch(rand){
        case 1:obst.addImage(ob1);
        break;
        case 2:obst.addImage(ob2);
        break;
        case 3:obst.addImage(ob3);
        break;
        case 4:obst.addImage(ob4);
        break;
        case 5:obst.addImage(ob5);
        break;
        case 6:obst.addImage(ob6);
        break;
        default: break;
      
      }
    obstacles_group.add(obst);
 obst.scale=0.5;   
}
}



















