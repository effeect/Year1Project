//Welcome to our game.

//available values in soundDesign.js, scale from 0 to 100, can be changed in soundDesign.js if needed.
var bassMapped;
var lowMidMapped;
var midMapped;
var highMidMapped;
var trebleMapped;

var frameBuffer = 0; 

//Game variables
var GRAVITY = .4;
var JUMP = -7;
var GROUND_Y;
var MIN_OPENING = 300;
var warrior, ground;
var coins;
var platforms, enemies, shrooms, grounds, comets;
var gameOver;
var warriorImg, groundImg, ground_secondImg, coinImg, holeImg;
var score = 0;
var enemy_smallImg, shroomImg, enemy_bigImg, comet_smallImg;
var shootImg;
var shoots;
var lifePoints;
var damaged;
var isJumping;
var isFalling;

var startGrounds;

function setup()
{
    setupSound() //This is the setup function inside the soundDesign.js function.

    createCanvas(innerWidth,innerHeight) //Sets the canvas to stretch the screen



    //Preloading images for sprites
    warriorImg = loadImage("sprites/char_sprite.png");

    
    ground_secondImg = loadImage("sprites/ground_sprite.png")

    coinImg = loadImage("sprites/coin_sprite.png");

    backgroundImg = loadImage("sprites/background_img.png");

    platformImg = loadImage("sprites/platform_sprite.png");

    enemy_smallImg = loadImage("sprites/enemy_sprite.png");
    enemy_bigImg = loadImage("sprites/big_enemy.png");

    shroomImg = loadImage("sprites/shroom_sprite.png");

    holeImg = loadImage("sprites/hole_img.png");
    hole_second_Img = loadImage("sprites/hole_img_two.png");

    comet_smallImg = loadImage("sprites/comet_sprite.png");
    shootImg = loadImage("sprites/shoot_sprite.png");

    //Variable used for ground close sprites.
    GROUND_Y = height - 100;

    //Creating warrior sprite
    warrior = createSprite(width/2, GROUND_Y -130, 47, 55);
    warrior.setCollider("rectangle", 0, 0, 47, 55);
    warrior.addImage(warriorImg);
//    warrior.debug = true;


    //Creating ground sprite
    startGrounds = new Group();
    for(var i = 0; i <25; i++){
    ground = createSprite(100*i, GROUND_Y);
    ground.addImage(ground_secondImg);
    ground.setCollider("rectangle", 0, 0, 2600, 200)
//    ground.debug = true;
    startGrounds.push(ground);
    }


    lifePoints = 50;

    //Creating groups (it's like an array for sprites)
    coins = new Group();
    grounds = new Group();
    platforms = new Group();

    enemies = new Group();
    big_enemies = new Group();

    shrooms = new Group();
    holes = new Group();
    grounds = new Group();
    comets = new Group();
    
    shoots = new Group();

    damaged = false;
    gameOver = true;
    isJumping = false;
    isFalling = false;
    updateSprites(false);

    camera.position.y = height/2;
}

function draw()
{   
    frameBuffer++
    if(frameBuffer > 60)
        {
            frameBuffer = 0
        }
    if(frameBuffer == 10 || frameBuffer == 20 || frameBuffer == 30 || frameBuffer == 40 || frameBuffer == 50 || frameBuffer == 60 || frameBuffer == 5 || frameBuffer == 15 || frameBuffer == 25 || frameBuffer == 35 || frameBuffer == 45 || frameBuffer == 55)
        {
            soundDraw()
        }
//    var frame = frameRate();
    
//    soundDraw() //This is the draw function inside the soundDesign.js function.
    //    background(bassMapped,0,0)
    //    ellipse(500,500,bassMapped * 4, bassMapped * 4)

    //If gameover and music playing
    if(gameOver && isPlaying)
        newGame();

    if(!gameOver) {

        //Jumping and falling.
        if(isJumping)
        {
            warrior.velocity.y = JUMP;
        }
        else if(isFalling)
        {

            warrior.velocity.y += GRAVITY; //Gravity Mechanic 
//            console.log(warrior.velocity.y)
        }
        
        

        //To not let the character go off screen on top.
        if(warrior.position.y<0){
            warrior.position.y = 0;
        }

        //Game over conditions.
        if(warrior.position.y > height){
            dead();
        }

        if(lifePoints <= 0){
            lifePoints = lifePoints;
            dead();
        }
        
        }


    //Only draws coins if the music is playing
    if(isPlaying){


        //Framecount needed to space them out evenly. For now
        if(frameCount%60 == 0){

            //The Y position is mapped for the bass for now
            var groundH = random(20, 160);
            var coin = createSprite(camera.position.x+width/2, lowMidMapped*random(6,7), 30, 30);
            coin.addImage(coinImg);
            coin.setCollider("circle");
            coins.push(coin);
            if(midMapped < 50){

                groundLevel();
                groundRemove();
            }
            else if(midMapped > 50){
                drawHole();
                holeRemover();
            }
            if(midMapped > 55){
                cometFall();

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

    //Warrior and enemy collision + life lost
    warrior.overlap(enemies, lifeDamage);
    warrior.overlap(big_enemies, lifeDamage);

    warrior.collide(comets, cometHit);
    grounds.collide(comets, cometCrash);
    platforms.collide(comets, cometCrash);

    warrior.collide(grounds, hitGround);

    warrior.collide(startGrounds, hitGround);
    
    
    shoots.overlap(enemies, enemyKill);

    //Enemies movement
    //Between two shrooms. If they collide the speed changes by *-1;
    for(var i = 0; i < enemies.length; i++){
        for(var j = 0; j < shrooms.length; j++){
            if(enemies[i].collide(shrooms[j])){
                enemies[i].velocity.x *= -1;
            }
        }  
    }
    
    //Enemies turning back at the edge of ground.
    for(var j = 0; j < enemies.length; j++){
        for(var i = 0; i < holes.length; i++){

            if(enemies[j].collide(holes[i])){
                enemies[j].velocity.x *= -1;
            }
        }
    }

    //Big_enemies moving along the platforms
    for(var i = 0; i < big_enemies.length; i++){
        for(var j = 0; j < platforms.length; j++){
            if(big_enemies[i].position.x > platforms[j].position.x + 30 || big_enemies[i].position.x < platforms[j].position.x - 30 ){
                big_enemies[i].velocity.x *= -1;
            }
        }
    }

    //Centering camera position
    camera.position.x = warrior.position.x + width/4;

    //Drawing background and background Image aswell
//    background(200); 
//    camera.off();
//    image(backgroundImg, 0, GROUND_Y-(height-100), width, height-100);
//    camera.on();

    //Game score and life points
    colorMode(HSB)
    background(bassMapped + 100,lowMidMapped,trebleMapped) // Mapped Background
    textSize(20);
    textStyle(BOLD);
    stroke(0)
    fill(220)
    text('Game score: ' + score, warrior.position.x, 100);
    text('Life Points: ' + lifePoints, warrior.position.x, 130);
    
    textStyle(ITALIC);
    text('Jump - x, shoot - mousePress(cost 20 score point)', warrior.position.x - 400, 50);

    

    //Drawing sprites
    drawingSprites();
    
}

function groundLevel(){

    //Drawing ground continuosly with double sprites to counter the "frame gap" which occurs because the sprites only drawn at every 60 frameCount.
    var ground_second = createSprite(camera.position.x+width/2, GROUND_Y, 100, 200);
    var ground_second_plus = createSprite(ground_second.position.x+100, GROUND_Y, 100, 200);
    ground_second.addImage(ground_secondImg);
    ground_second_plus.addImage(ground_secondImg);
    ground_second.setCollider("rectangle");
    ground_second_plus.setCollider("rectangle");
//    ground_second.debug = true;
//    ground_second_plus.debug = true;
    grounds.push(ground_second);
    grounds.push(ground_second_plus);

    //Creating mushrooms
    var shroom = createSprite(camera.position.x+width/2+random(10, 100), GROUND_Y-130, 50, 60);
    shroom.setCollider("circle")
    shroom.addImage(shroomImg);
//    shroom.debug = true;
    shrooms.push(shroom);

    //Creating ground enemies
    var small_enemy = createSprite(shroom.position.x+random(10, 15), GROUND_Y-125, 50, 50);
    small_enemy.addImage(enemy_smallImg);
    small_enemy.velocity.x = 1;
    small_enemy.setCollider("circle", 0, 0, 20)
//    small_enemy.debug = true;
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
    hole.setCollider("rectangle", 0, 0, 75, 205);
    hole_second.setCollider("rectangle", 0, 0, 75, 205);
//    hole.debug = true;
//    hole_second.debug = true;
    holes.push(hole);
    holes.push(hole_second);

    //Creating platforms
    var platform = createSprite(camera.position.x+width/2, lowMidMapped*random(7,8)+50, 99, 23);
    platform.addImage(platformImg);
//    platform.debug = true;
    platform.setCollider("rectangle");
    platforms.push(platform);

    //Creating bigger enemies on platforms
    var big_enemy = createSprite(platform.position.x, platform.position.y -25, 50, 50);
    big_enemy.addImage(enemy_bigImg);
    big_enemy.velocity.x = 1;
    big_enemy.setCollider("circle", 0, 0, 20)
//    big_enemy.debug = true;
    big_enemies.push(big_enemy);
}


function holeRemover(){
    
    //Removes everything from their respective group arrays after passing out of sight.
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


    for(var k = 0; k < big_enemies.length; k++){
        if(big_enemies[k].position.x < warrior.position.x-width/2){
            big_enemies[k].remove();
        }
    }

}

function cometFall(){
    
    //Comets falling from the sky for bit more challange damaging the character.
    var comet_small = createSprite(warrior.position.x+random(250, width/2), random(100, 200), 50, 50)
    comet_small.addImage(comet_smallImg);
    comet_small.setCollider("circle");
    comet_small.velocity.x = -1;
    comet_small.velocity.y = 2;
//    comet_small.debug = true;
    comets.push(comet_small);
}

function collect(collector, collected){
    
    //Coin collection function, explained where the function is called.
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

function cometHit(character, comet){
    //When hitting the character it damages it and removes itself.
    comet.remove();
    lifePoints -= 20;
}

function cometCrash(object, comet){
    //Hitting the ground the comet removes itself.
    comet.remove();
}


function hitGround(character, ground){
    isFalling = false;
}

function shooting(){
    
        var shoot = createSprite(warrior.position.x+20, warrior.position.y, 10, 10);
        shoot.addImage(shootImg);
        shoot.setCollider("circle");
        shoot.velocity.x = 4;
        shoots.push(shoot);
}

function enemyKill(shoot, enemy){
    shoot.remove();
    enemy.remove();
}

function dead(){
    //If dead, sprites stop updating gameOver is true.
    updateSprites(false);
    gameOver = true;
    isPlaying = false;
    

}


function drawingSprites(){

    //Drawing sprite groups and individual sprites.
    drawSprites(coins);
    drawSprites(platforms);
    drawSprites(big_enemies);
    drawSprites(holes);
    drawSprites(grounds);
    drawSprites(shrooms);
    drawSprites(enemies);
    drawSprites(comets);
    drawSprites(startGrounds);
    drawSprites(shoots);
    drawSprite(warrior);
}

function newGame() {

    //When newGame everyting resets.
    gameOver = false;
    updateSprites(true);
    warrior.position.x = width/2;
    warrior.position.y = GROUND_Y - 130;
    warrior.velocity.y = 0;
    warrior.velocity.x = 3;
//    ground.position.x = width/2;
    ground.position.y = GROUND_Y;
}

function mousePressed(){
    if(score >= 10 && isPlaying){
        shooting();
        score -= 10;
        
    }
}
function keyPressed(){
    if(key == 'X'){
        isJumping = true;
    }
    }

function keyReleased()
        {
            if(key == 'X'){
                isJumping = false;
                isFalling = true;
            }

        }

