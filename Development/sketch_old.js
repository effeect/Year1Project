//Sprite variabless
var warrior;
var warrior_img;

var ground;
var ground_img;

var box;
var box_img;

var slash;
var slash_img;

var enemy_knight;
var enemy_knight_img;

//Arrays
var grounds = [];
var boxes = [];
var slashes = [];
var enemies = [];

//New Arrays
var yValues = [];

//Key/Movement booleans
var isLeft = false;
var isRight = false;
var isJumping = false;
var isFalling = false;

//Forces
var Gravity = .3;
var jumpValue = -5;

var score = 0;
function preload(){

    warrior_img = loadImage('sprites/char_sprite.png');
    ground_img = loadImage('sprites/ground_sprite.png');
    box_img = loadImage('sprites/box_sprite.png');
    slash_img = loadImage('sprites/slash_sprite.png');
    enemy_knight_img = loadImage('sprites/enemy_knight.png')

}

function setup()
{
    createCanvas(1200, 800);

//    Gamestart();
    new Ground
}


function draw()
{
    //    clear();
    background(255)

//    Collision();

//    //GameScore text
//    text('Game score: ' + score, warrior.position.x-200, 100);
//    text('Press X to attack!', warrior.position.x-200, 150);

//    screenScroll();
    
    amplitude = random(10, 30)
    Ground(amplitude)

//    //Drawing all sprites
//    drawSprites();
//    charAttacks();
//    moving();
}


function Ground(y){

    this.y = y;

    this.calcWave = function(){

        for (var i = 0; i < yvalues.length; i++) {
            yvalues[i] = y;
        }

        this.draw = function(){
            for(var x = 0; x < yValues.length; x++){
                fill(0);
                ellipse(x, height/4+yValues[x], 10, 10)
            }
        }




    }
}

    function Gamestart(){

        //Creating sprites
        warrior = createSprite(width/2, height/2);
        warrior.addImage(warrior_img);

        //Looping the ground to draw multiple sprites
        for(var x = 100; x < 1100; x+= 120)
        { 
            //Ground sprites

            //Prob can be mapped to sound
            var groundY = random(500, 800)
            ground = createSprite(x, groundY);
            ground.addImage(ground_img);
            grounds.push(ground)

            //Box sprites
            box = createSprite(x-random(25,0), groundY -28, 200);
            box.addImage(box_img)
            boxes.push(box);

            enemy_knight = createSprite(box.position.x+45, groundY-28);
            enemy_knight.addImage(enemy_knight_img);
            enemies.push(enemy_knight);
        }



    }


    function Collision(){
        //Looping through 'grounds' for collision, otherwise it only collides with last sprite.
        for(var i = 0; i < grounds.length; i++)
        {
            warrior.collide(grounds[i]);
        }
        for(var i = 0; i < boxes.length; i++)
        {
            var collect = warrior.collide(boxes[i]);
            if(collect)
            {

                boxes[i].remove();
                boxes.splice(i, 1);

                score += 10;
            }
        }

    }

    function screenScroll(){

        //Creates new ground and boxes as character moves.
        if(isRight){
            //Framerate should be 60, but it creates them too frequently on my laptop!
            if(frameCount%120 === 0){
                var groundY = random(500, 800)
                ground = createSprite(warrior.position.x+width/2, groundY);
                ground.addImage(ground_img);
                grounds.push(ground)

                box = createSprite((warrior.position.x+width/2)+random(-20,20), groundY -28);
                box.addImage(box_img)
                boxes.push(box);

            }
        }

        //Centers the camera on the character.
        camera.position.x = warrior.position.x;


        //Removes grounds and boxes from respective arrays as the out of screen on left side.
        for(var i = 0; i<grounds.length; i++)
            if(grounds[i].position.x < warrior.position.x-width/2)
                grounds[i].remove();
        for(var i = 0; i<boxes.length; i++)
            if(boxes[i].position.x < warrior.position.x-width/2)
                boxes[i].remove();

    }

    function charAttacks(){
        //Creating attack sprite on X key pressed
        if(keyWentDown("x"))
        {
            slash = createSprite(warrior.position.x+15, warrior.position.y);
            slash.addImage(slash_img);
            slash.setSpeed(10);
            slash.life = 30;
            slashes.push(slash);
        }

    }


    function keyPressed(){
        if(key == 'D')
        {
            isRight = true;
            //            warrior.position.x += 1;
        }
        if(key == 'A')
        {
            isLeft = true;
        }
        if(key == 'W')
        {
            isJumping = true;
        }
    }

    function keyReleased(){
        if(key == 'D')
        {
            isRight = false;
        }
        if(key == 'A')
        {
            isLeft = false;
        }
        if(key == 'W')
        {
            isJumping = false;
            isFalling = true;

        }

    }

    function moving(){
        //Moving logics and mirroring warrior sprite so we only use 1 sprite for now.
        if(isRight)
        {
            warrior.mirrorX(1);
            warrior.position.x += 2;
        }
        if(isLeft)
        {
            warrior.mirrorX(-1);
            warrior.position.x -= 2;
        }
        if(isJumping)
        {
            warrior.velocity.y = jumpValue;
        }
        else if(isFalling)
        {

            warrior.velocity.y += Gravity;
        }

    }
