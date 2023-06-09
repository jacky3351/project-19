var boy, boyImage
var background, backgroundImage
var obstacle, obstacle2, obstacleImage, obstaclesGroup
var score
var play = 1
var end = 0
var gameState = play
var invisibleGround

function preload(){
boyImage = loadImage("boy.webp",)
backgroundImage = loadImage("background.jpg")
obstacleImage = loadImage("obstacle.png")
}

function setup() {
createCanvas(windowWidth, windowHeight)

boy = createSprite(30, 600, 20, 50)
boy.addImage("boy", boyImage)
boy.scale = 0.1

background = createSprite(800, 180, 5000, 200)
background.addImage("background", backgroundImage)
background.scale = 1.2

obstaclesGroup = createGroup()

boy.setCollider("circle", 0, 0, 640)

score = 0

invisibleGround = createSprite(200, 1000, 200000, 200)
invisibleGround.visible = false
}

function draw() {
text("score " + score, 800, 60)
    if(gameState === play){
        background.velocityX = -4
        score = score + Math.round(frameCount/60)
        if(background.x < 700){
            background.x = background.width/2
        }
        if(keyDown("space")&& boy.y >130){
            boy.velocityY = -9 
        }
        if(boy.y <300){
            boy.velocityY = 9
        }
        if(obstaclesGroup.isTouching(boy) || invisibleGround.isTouching(boy)){
            gameState = end
        }
    spawnObstacles()
    } 
    else if (gameState === end){
        ground.velocityX = 0;
        obstaclesGroup.setLifetimeEach(-1)
        obstaclesGroup.setVelocityXEach(0);
        boy.velocityY = 0;
        text("game over", 500, 50)
    } 
boy.depth = background.depth
boy.depth = boy.depth + 2
drawSprites()
}

function spawnObstacles(){
    if (frameCount % 180 === 0){
        var obstacle = createSprite(1200, 600, 10, 40)
        obstacle.addImage("obstacle", obstacleImage)
        obstacle.scale = 0.05
        obstacle.velocityX = -6
        obstacle.lifetime = 300
        obstaclesGroup.add(obstacle);
        obstacle2 = createSprite(1600, 500, 10, 40)
        obstacle2.addImage("obstacle", obstacleImage)
        obstacle2.scale = 0.05
        obstacle2.velocityX = -6
        obstacle2.lifetime = 300
        obstaclesGroup.add(obstacle2);
    }
}

