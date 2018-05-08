//Welcome to our game.

//available values in soundDesign.js, scale from 0 to 100, can be changed in soundDesign.js if needed.
var bassMapped;
var lowMidMapped;
var midMapped;
var highMidMapped;
var trebleMapped;


//Game variables
var GRAVITY = .4;
var FLAP = -9;
var GROUND_Y;
var MIN_OPENING = 300;
var warrior, ground;
var coins;
var platforms, enemies, shrooms, grounds;
var gameOver;
var warriorImg, groundImg, ground_secondImg, coinImg, holeImg;
var score = 0;
var enemy_smallImg, shroomImg;

var lifePoints;
var damaged;


function setup()
{
    setupSound() //This is the setup function inside the soundDesign.js function.

    createCanvas(innerWidth,innerHeight) //Sets the canvas to stretch the screen



    //Preloading images for sprites
    warriorImg = loadImage("sprites/char_sprite.png");
    groundImg = loadImage("sprites/pix_ground.png");
    ground_secondImg = loadImage("sprites/pixil-frame-0.png")
    coinImg = loadImage("sprites/coin_sprite.png");
    backgroundImg = loadImage("sprites/background_img.png");
    platformImg = loadImage("sprites/platform_sprite.png");
    enemy_smallImg = loadImage("sprites/enemy_sprite.png");
    shroomImg = loadImage("sprites/shroom_sprite.png");
    holeImg = loadImage("sprites/hole_img.png");
    hole_second_Img = loadImage("sprites/hole_img_two.png");

    GROUND_Y = height - 100;

    //Creating warrior sprite
    warrior = createSprite(width/2, GROUND_Y -130, 47, 55);
    
    warrior.setCollider("rectangle");
    warrior.addImage(warriorImg);
    warrior.debug = true;


    //Creating ground sprite
    ground = createSprite(width/2, GROUND_Y);
    ground.addImage(groundImg);
    ground.width = width/4+115;
    ground.setCollider("rectangle", 0, 0, 2600, 200)
    ground.debug = true;


    lifePoints = 50;

    //Creating groups (it's like an array for sprites)
    coins = new Group();
    grounds = new Group();
    platforms = new Group();
    enemies = new Group();
    shrooms = new Group();
    holes = new Group();
    grounds = new Group();

    damaged = false;
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
        //           

        warrior.velocity.y += GRAVITY;

        if(warrior.position.y<0){
            warrior.position.y = 0;
        }
        
        if(warrior.position.y > height){
            dead();
        }

        if(lifePoints == 0){
            dead();
        }
                warrior.collide(ground)
        
    }


    //Only draws coins if the music is playing
    if(isPlaying){

        
        //Framecount needed to space them out evenly. For now
        if(frameCount%60 == 0){

            //The Y position is mapped for the bass for now
            var groundH = random(20, 160);
            var coin = createSprite(warrior.position.x+width/2, lowMidMapped*random(6,7), 30, 30);
            coin.addImage(coinImg);
            coin.setCollider("circle");
            coin.debug = true;
            coins.push(coin);
//            console.log(midMapped)
            
        
            
      if(midMapped < 50){
          
          groundLevel();
          groundRemove();
          
          
      }
      else if(midMapped > 50){
          
          
            
            drawHole();
          holeRemover();
        
          
      }
        }
        
    
    }

    //Collecting the coins

    ////the first parameter will be the sprite (individual or from a group) 
    //calling the function
    //the second parameter will be the sprite (individual or from a group)
    //against which the overlap, collide, bounce, or displace is checked
    warrior.overlap(coins, collect);


    //Platform-warrior and warrior-shroom collision
    warrior.collide(platforms);
    //    warrior.collide(shrooms);

    //Warrior and enemy collision + life lost
    warrior.overlap(enemies, lifeDamage);

    warrior.collide(grounds);
    //Enemies movement
    //Between two shrooms. If they collide the speed changes by *-1;
    for(var i = 0; i < enemies.length; i++){
        for(var j = 0; j < shrooms.length; j++){
            if(enemies[i].collide(shrooms[j])){
                enemies[i].velocity.x *= -1;
            }
        }  
    }
for(var j = 0; j < enemies.length; j++){
    for(var i = 0; i < holes.length; i++){
        
            if(enemies[j].collide(holes[i])){
                enemies[j].velocity.x *= -1;
            }
        }
    }

    //Centering camera position
    camera.position.x = warrior.position.x + width/4;

    //Wrapping ground
//    if(camera.position.x > ground.position.x-ground.width+width/2){
//        ground.position.x+=ground.width;
//    }

    //Drawing background and background Image aswell
    background(200); 
    camera.off();
    image(backgroundImg, 0, GROUND_Y-(height-100), width, height-100);
    camera.on();

    //Game score and life points
    textSize(14);
    textStyle(BOLD);
    text('Game score: ' + score, warrior.position.x +200, 100);
    text('Life Points: ' + lifePoints, warrior.position.x +200, 200);


    //Drawing sprites
    drawingSprites();
}

function groundLevel(){

    //Drawing ground continuosly with double sprites to counter the "frame gap".
    var ground_second = createSprite(camera.position.x+width/2, GROUND_Y, 100, 200);
    var ground_second_plus = createSprite(ground_second.position.x+100, GROUND_Y, 100, 200);
    ground_second.addImage(ground_secondImg);
    ground_second_plus.addImage(ground_secondImg);
    ground_second.setCollider("rectangle");
    ground_second_plus.setCollider("rectangle");
    ground_second.debug = true;
    ground_second_plus.debug = true;
    grounds.push(ground_second);
    grounds.push(ground_second_plus);
    
    //Creating mushrooms
    var shroom = createSprite(camera.position.x+width/2+random(10, 100), GROUND_Y-130, 50, 60);
    shroom.setCollider("circle")
    shroom.addImage(shroomImg);
    shroom.debug = true;
    shrooms.push(shroom);

    //Creating ground enemies
    var small_enemy = createSprite(shroom.position.x+random(10, 20), GROUND_Y-125, 50, 50);
    small_enemy.addImage(enemy_smallImg);
    small_enemy.velocity.x = 1;
    small_enemy.setCollider("circle", 0, 0, 20, 20)
    small_enemy.debug = true;
    enemies.push(small_enemy);
}

function groundRemove(){
    
    //Function to remove all the passed sprites from respective arrays
    ////
    
    for(var i = 0; i < grounds.length; i++){
              if(grounds[i].position.x < warrior.position.x-width/2){
                  grounds[i].remove();
              }
          }
    
    for(var j = 0; j < shrooms.length; j++){
       if(shrooms[j].position.x < warrior.position.x-width/2){
                  shrooms[j].remove();
              }
    }
    
    for(var k = 0; k < enemies.length; k++){
       if(enemies[k].position.x < warrior.position.x-width/2){
                  enemies[k].remove();
              }
    }
}
function drawHole(){
    
    //Creating the "holes" again with double sprites
    var hole = createSprite(camera.position.x+width/2, GROUND_Y, 100, 210);
    var hole_second = createSprite(hole.position.x +100, GROUND_Y, 100, 210);
    hole.addImage(holeImg);
    hole_second.addImage(holeImg);
    hole.setCollider("rectangle", 0, 0, 75, 210);
    hole_second.setCollider("rectangle", 0, 0, 75, 210);
    hole.debug = true;
    hole_second.debug = true;
    holes.push(hole);
    holes.push(hole_second);
    
    //Creating platforms
     var platform = createSprite(camera.position.x+width/2, lowMidMapped*random(7,8)+50, 99, 23);
    platform.addImage(platformImg);
    platform.debug = true;
    platform.setCollider("rectangle");
    platforms.push(platform);
}


function holeRemover(){
    for(var i = 0; i < holes.length; i++){
              if(holes[i].position.x < warrior.position.x-width/2){
                  holes[i].remove();
              }
          }
    
    for(var j = 0; j < platforms.length; j++){
       if(platforms[j].position.x < warrior.position.x-width/2){
                  platforms[j].remove();
              }
    }
    
   
    
}

function collect(collector, collected){
    collected.remove();
    score += 10;
}

function lifeDamage(character, enemy){
    //Life damage system
    //If the character overlaps with an enemy and not wounded/damaged -10 points and becomes damaged.

    if(damaged == false){
        lifePoints -= 10;
        damaged = true;
    }

    //If damaged life stays same so the draw loop wont decrement infinitely.
    if(damaged == true){
        lifePoints = lifePoints;
    }

    //FrameCount seems the only way to time something. So after certain frameCount damaged status refereshed.
    if(frameCount%60 == 0){
        damaged = false;
    }

}
function dead(){
    updateSprites(false);
    gameOver = true;
    isPlaying = false;
}
function drawingSprites(){

    drawSprites(coins);
    drawSprite(ground);
    drawSprite(warrior);
    
    drawSprites(platforms);
    
    
    drawSprites(holes);
    drawSprites(grounds);
    drawSprites(shrooms);
    drawSprites(enemies);

}

function newGame() {

    gameOver = false;
    updateSprites(true);
    warrior.position.x = width/2;
    warrior.position.y = GROUND_Y - 130;
    warrior.velocity.y = 0;
    warrior.velocity.x = 3;
    ground.position.x = width/2;
    ground.position.y = GROUND_Y;
}

function mousePressed() {
//    if(gameOver)
//        newGame();
    //      warrior.velocity.y = FLAP;
}