//Sprite variabless
var warrior;
var warrior_img;

var ground;
var ground_img;

//Arrays
var grounds = [];


//Key/Movement booleans
var isLeft = false;
var isRight = false;
var isJumping = false;
var isFalling = false;


function preload(){

    warrior_img = loadImage('sprites/char_sprite.png');
    ground_img = loadImage('sprites/ground_sprite.png');

}

function setup()
{
    createCanvas(900, 500);


    //Creating sprites
    warrior = createSprite(width/2, height/2);
    warrior.addImage(warrior_img);

    //Looping the ground to draw multiple sprites
    for(var x = 0; x < 800; x+= 120)
    {
        //Prob can be mapped to sound
        var groundY = random(300, 500)
        ground = createSprite(x, groundY);
        ground.addImage(ground_img);
        grounds.push(ground)
    }


    console.log(grounds)
    console.log(tile_frames)

    //    ground.addToGroup(grounds);

}



function draw()
{
    //    clear();
    background(144,144,144)

    
    //Looping through 'grounds' for collision, otherwise it only collides with last sprite.
    for(var i = 0; i < grounds.length; i++)
    {
        warrior.collide(grounds[i]);
    }
    //Drawing all sprites
    drawSprites();

    
    
    //Moving logics and mirroring warrior sprite so we only use 1 sprite for now.
    if(isRight)
    {
        warrior.mirrorX(1);
        warrior.position.x += 1;
    }
    if(isLeft)
    {
        warrior.mirrorX(-1);
        warrior.position.x -= 1;
    }
    if(isJumping)
    {
        warrior.position.y -= 1;
    }
    else if(isFalling)
    {

        warrior.position.y += 2;
    }

}


function Character(){

    //Front Standing


    //Left Standing


    //Right standing



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