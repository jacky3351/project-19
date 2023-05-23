var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg, ghostjumping;
var invisibleBlockGroup, invisibleBlock;
var score = 0
var gameState = "play"
var wall, wall2, wall3

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png");
  ghostjumping = loadAnimation("ghost-jumping.png")
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.visible = true
  tower.velocityY = 1;
  wall = createSprite(650, 500, 100, 1000)
  wall.visible = false
  wall2 = createSprite(0, 500, 10, 1000)
  wall2.visible = false
  wall3 = createSprite(300, 0, 5000, 10)
  wall3.visible = false
  ghost = createSprite(300, 300)
  ghost.visible = true
  ghost.addAnimation("ghost", ghostImg)
  ghost.addAnimation("ghostjumping", ghostjumping)
  ghost.scale = 0.4
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
}

function draw() {
  background(200);
  fill("white")
  textSize(18)
  text("score: "+ score, 600, 200)
  ghost.collide(wall);
  ghost.collide(wall2)
  ghost.collide(wall3)
  if(gameState === "play"){
    score = score + Math.round(getFrameRate()/60)
    if(tower.y > 400){
      tower.y = 300
    }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-5
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+5
  }
  if(keyDown("space")){
    ghost.velocityY = -5
    ghost.changeAnimation("ghostjumping", ghostjumping)
  }
  else{
    ghost.changeAnimation("ghost", ghostImg)
  }
  ghost.velocityY = ghost.velocityY+1
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;

  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > windowHeight ){
    ghost.destroy()
    gameState = "end"
  }
    spawnDoors()
    drawSprites()
  }
  else{
    background("black")
    fill("white")
    textSize(52)
    text("game over", 200, 200)
  }
} 
function spawnDoors(){
  if(frameCount%300===0){
    var door = createSprite(200, -200);
    var climber = createSprite(200, -130)
    var invisibleBlock = createSprite(200, -120, climber.width, 5)
    invisibleBlock.visible = false
    door.addImage("door",doorImg)
    climber.addImage("climber",climberImg)
    door.x = Math.round(random(100, 455))
    climber.x = door.x
    invisibleBlock.x = door.x
    invisibleBlock.velocityY = 1
    door.velocityY = 1
    climber.velocityY = 1
    climber.lifetime = 1200
    door.lifetime = 1200
    invisibleBlock.lifetime = 1200
    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
    ghost.depth = door.depth
    ghost.depth = ghost.depth+2
  }
}