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
var platforms, enemies, shrooms;
var gameOver;
var warriorImg, groundImg, coinImg;
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
    coinImg = loadImage("sprites/coin_sprite.png");
    backgroundImg = loadImage("sprites/background_img.png");
    platformImg = loadImage("sprites/platform_sprite.png");
    enemy_smallImg = loadImage("sprites/enemy_sprite.png");
    shroomImg = loadImage("sprites/shroom_sprite.png");

    GROUND_Y = height - 100;

    //Creating warrior sprite
    warrior = createSprite(width/2, GROUND_Y -130, 47, 55);
    warrior.velocity.x = 3;
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
    if(gameOver)
        newGame();

    if(!gameOver) {

        if(keyWentDown("x"))
            warrior.velocity.y = FLAP;
        //           

        warrior.velocity.y += GRAVITY;



        if(warrior.position.y<0){
            warrior.position.y = 0;
        }

//        warrior.collide(ground)
        //To keep him on the ground. A kind of collision detection.
        if(warrior.position.y+warrior.height/2 > GROUND_Y-130){
            warrior.position.y = GROUND_Y - 125;
        }
        //
    }


    //Only draws coins if the music is playing
    if(isPlaying){

        //Framecount needed to space them out evenly. For now
        if(frameCount%60 == 0){

            //The Y position is mapped for the bass for now
            var groundH = random(20, 160);
            var coin = createSprite(warrior.position.x+width/2, lowMidMapped, 30, 30);
            coin.addImage(coinImg);
            coin.setCollider("circle");
            coin.debug = true;
            coins.push(coin)

            //Creating platforms under some of the coins

            var platform = createSprite(warrior.position.x+width/2+random(200,400)*random(2,4), lowMidMapped*random(3,5)+50, 99, 23);
            platform.addImage(platformImg);
            platform.debug = true;
            platform.setCollider("rectangle");
            platforms.push(platform);

            //Creating shrooms from camera position so its not tied to the character
            var shroomH = random(20, 80);
            var shroom = createSprite(camera.position.x+width/2+random(200, 400), GROUND_Y-130, 50, 60);
            shroom.setCollider("circle")
            shroom.addImage(shroomImg);
            shroom.debug = true;
            shrooms.push(shroom);

            //Creating small enemies between the shrooms with a basic velocity 1;
            var small_enemy = createSprite(shroom.position.x+random(40, 50), GROUND_Y-110, 50, 50);
            small_enemy.addImage(enemy_smallImg);
            small_enemy.velocity.x = 1;
            small_enemy.setCollider("circle", 0, 0, 20, 20)
            small_enemy.debug = true;
            enemies.push(small_enemy);
            //            console.log(platform)
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
    
    //    for(var i = 0; i < enemies.length; i++){
    //        var damage = warrior.collide(enemies[i]);
    //        if(damage){
    //            lifePoints = lifePoints - 10;
    //        }
    //    }
    //
    //    if(lifePoints == 0){
    //        dead();
    //    }

    //Enemies movement
    //Between two shrooms. If they collide the speed changes by *-1;
        for(var i = 0; i < enemies.length; i++){
            for(var j = 0; j < shrooms.length; j++){
                if(enemies[i].collide(shrooms[j])){
                    enemies[i].velocity.x *= -1;
                }
            }  
        }


    //Centering camera position
    camera.position.x = warrior.position.x + width/4;

    //Wrapping ground
    if(camera.position.x > ground.position.x-ground.width+width/2){
        ground.position.x+=ground.width;
    }

    //Drawing background and background Image aswell
    background(200); 
    camera.off();
    image(backgroundImg, 0, GROUND_Y-height, width, height-100);
    camera.on();

    //Game score and life points
    textSize(14);
    textStyle(BOLD);
    text('Game score: ' + score, warrior.position.x +200, 100);
    text('Life Points: ' + lifePoints, warrior.position.x +200, 200);


    //Drawing sprites
    drawingSprites();
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
}
function drawingSprites(){

    drawSprites(coins);
    drawSprite(ground);
    drawSprite(warrior);
    drawSprites(grounds);
    drawSprites(platforms);
    drawSprites(enemies);
    drawSprites(shrooms);

}

function newGame() {

    gameOver = false;
    updateSprites(true);
    warrior.position.x = width/2;
    warrior.position.y = GROUND_Y - 130;
    warrior.velocity.y = 0;
    ground.position.x = width/2;
    ground.position.y = GROUND_Y;
}

function mousePressed() {
    if(gameOver)
        newGame();
    //      warrior.velocity.y = FLAP;
}