//Welcome to our game.

//available values in soundDesign.js, scale from 0 to 100, can be changed in soundDesign.js if needed.
var bassMapped;
var lowMidMapped;
var midMapped;
var highMidMapped;
var trebleMapped;


//Game variables
var GRAVITY = .3;
var FLAP = -7;
var GROUND_Y;
var MIN_OPENING = 300;
var warrior, ground;
var coins;
var gameOver;
var warriorImg, groundImg, coinImg;
var score;

function setup()
{
    setupSound() //This is the setup function inside the soundDesign.js function.

    createCanvas(800,600) //Sets the canvas to stretch the screen

    
    //Preloading images for sprites
    warriorImg = loadImage("sprites/char_sprite.png");
    groundImg = loadImage("sprites/pix_ground.png");
    coinImg = loadImage("sprites/coin_sprite.png");
    backgroundImg = loadImage("sprites/test1_bg.png");
    
    GROUND_Y = height - 200;
    
    //Creating warrior sprite
    warrior = createSprite(width/2, GROUND_Y -130, 40,40);
//    warrior.rotateToDirection = true;
    warrior.velocity.x = 2;
    warrior.setCollider("circle", 0,0,20);
    warrior.addImage(warriorImg);

    //Creating ground sprite
    ground = createSprite(800/2, GROUND_Y); //image 800x200
    ground.addImage(groundImg);
    ground.scale = 0.5
    ground.width = 100;

    coins = new Group();
    gameOver = true;
    updateSprites(false);

    camera.position.y = height/2;
}

function draw()
{

    soundDraw() //This is the draw function inside the soundDesign.js function.
//    background(bassMapped,0,0)
//    ellipse(500,500,bassMapped * 4, bassMapped * 4)

    //If gameover and music playing
    if(gameOver && isPlaying)
        newGame();
    
    if(!gameOver) {

    if(keyWentDown("x"))
      warrior.velocity.y = FLAP;
    
    warrior.velocity.y += GRAVITY;
    
    if(warrior.position.y<0){
      warrior.position.y = 0;
    }
     
    //To keep him on the ground. A kind of collision detection.
    if(warrior.position.y+warrior.height/2 > GROUND_Y-130){
        warrior.position.y = GROUND_Y - 130;
    }
        
    }
    
    
    //Only draws coins if the music is playing
    if(isPlaying){
        
        //Framecount needed to space them out evenly. For now
    if(frameCount%60 == 0){
        
        //The Y position is mapped for the bass for now
            var groundH = random(20, 160);
            var coin = createSprite(warrior.position.x+width/2, bassMapped, 80, groundH);
            coin.addImage(coinImg);
            coins.push(coin)
    }
        
        //Collecting the coins
        for(var i = 0; i < coins.length; i++){
        var collect = warrior.collide(coins[i]);

        if(collect){
            coins[i].remove();
            coins.splice(i, 1);

            score += 10;

        }
    }
    }
    text('Game score: ' + score, warrior.position.x +200, 100);
    //Centering camera position
    camera.position.x = warrior.position.x + width/4;
   
    
   
    //Wrapping ground
    if(camera.position.x > ground.position.x-ground.width+width/2){
        ground.position.x+=ground.width;
        
    }
    
    //Drawing background and background Image aswell
    background(200); 
    camera.off();
    image(backgroundImg, 0, GROUND_Y-290);
    camera.on();
    
    //Drawing sprites
    drawSprites(coins);
    drawSprite(ground);
    drawSprite(warrior);
}

function newGame() {

  gameOver = false;
  updateSprites(true);
  warrior.position.x = width/2;
  warrior.position.y = GROUND_Y - 130;
  warrior.velocity.y = 0;
  ground.position.x = 800/2;
  ground.position.y = GROUND_Y;
}

function mousePressed() {
  if(gameOver)
    newGame();
//  warrior.velocity.y = FLAP;
}