var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieImg;
var zombieGroup
var bullets = 70
var score = 0;
var explosion1,lose1,win1
var heart1,heart2,heart3
var heart1Img,heart2Img,heart3Img
var gameState = "play"
var life = 3

function preload(){
  zombieImg = loadImage("assets/zombie.png")
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  b_img = loadImage("bullet.png")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  explosion1 = loadSound("assets/explosion.mp3")
  lose1 = loadSound("assets/lose.mp3")
  win1 = loadSound("assets/win.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
heart1 = createSprite(100,27,50,50)
heart1.addImage("heart1",heart1Img)
heart1.scale = 0.2
heart1.visible = false

heart2 = createSprite(100,27,50,50)
heart2.addImage("heart2",heart2Img)
heart2.scale = 0.2
heart2.visible = false

heart3 = createSprite(100,27,50,50)
heart3.addImage("heart3",heart3Img)
heart3.scale = 0.2
heart3.visible = false
//creating the player sprite
//player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
player = createSprite(500,775,50,50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

zombieGroup = new Group()
bulletGroup = new Group()
}

function draw() {
  background(0); 
if(gameState ==="play"){
  if(life ===3){
    heart3.visible = true
    heart2.visible = false
    heart1.visible = false
  }
  if(life ===2){
    heart3.visible = false
    heart2.visible = true
    heart1.visible = false
  }
  if(life ===1){
    heart3.visible = false
    heart2.visible = false
    heart1.visible = true
  }
  if(life===0){
    gameState = "end"
  }
  if(score===100){
    gameState = "won"
    win1.play()
  }
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+30
  }
  if(keyWentDown("space")){
    bullet = createSprite(displayWidth - 1150,player.y - 30,20,10)
    bullet.addImage(b_img)
    bullet.scale = 0.05
    bullet.velocityX = 20
    bulletGroup.add(bullet)
  player.addImage(shooter_shooting)
  bullets = bullets -1
  player.depth = bullet.depth
  }
  else if(keyWentUp("space")){
    player.addImage(shooterImg)
  }
  
  if(zombieGroup.isTouching(player)){
    lose1.play()
    for(var i = 0;i<zombieGroup.length;i++){
      if(zombieGroup.isTouching(player)){
        lose1.play()
        zombieGroup[i].destroy()
        life = life-1
      }
    }
  }
  
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i = 0;i<zombieGroup.length;i++){
    bulletGroup.destroyEach()
    explosion1.play()
      zombieGroup[i].destroy()
      score = score+20
    }
  }
  enemy()
}
drawSprites();
textSize(15)
text(mouseX+","+mouseY,mouseX,mouseY)
fill("yellow")
text("score: "+score,1510,34)
text("bullets: "+bullets,1510,74)

if(gameState ==="end"){
  fill("blue")
  textSize(150)
  text("YOU LOST!!!",730,368)
  zombieGroup.destroyEach()
  player.destroy()
}
else if(gameState ==="won"){
  fill("blue")
  textSize(150)
  text("YOU WIN!!!",740,458)
  zombieGroup.destroyEach()
  player.destroy()
}
else if(gameState ==="bullet"){
  fill("blue")
  text("YOU NEED MORE BULLETS",400,400)
  zombieGroup.destroyEach()
  player.destroy()
bulletGroup.destroyEach()
}
}

function enemy(){
if(frameCount%50===0){
  zombie = createSprite(random(500,1100),random(100,500),40,40)
  zombie.addImage(zombieImg)
  zombie.scale = 0.15
  zombie.velocityX = -2.5
  zombie.debug = true
  zombie.setCollider("rectangle",0,0,400,400)
  zombie.lifeTime = 400
  zombieGroup.add(zombie)
}
}