//Sprite variabless
var warrior;
var warrior_img;

var ground;
var ground_img;

var box;
var box_img;

var slash;
var slash_img;

//Arrays
var grounds = [];
var boxes = [];
var slashes = [];


//Key/Movement booleans
var isLeft = false;
var isRight = false;
var isJumping = false;
var isFalling = false;

//Forces
var Gravity = 0.2;

var score = 0;
function preload(){

    warrior_img = loadImage('sprites/char_sprite.png');
    ground_img = loadImage('sprites/ground_sprite.png');
    box_img = loadImage('sprites/box_sprite.png');
    slash_img = loadImage('sprites/slash_sprite.png');

}

function setup()
{
    createCanvas(1200, 800);


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
        box = createSprite(x+random(-20,20), groundY -28);
        box.addImage(box_img)
        boxes.push(box);
    }


    console.log(grounds)
//    console.log(tile_frames)

    //    ground.addToGroup(grounds);

}



function draw()
{
    //    clear();
    background(125)

    
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
    
    text('Game score: ' + score, warrior.position.x-200, 100);
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
    
    
//    if(warrior.position.y <= 200)
//        {
//            warrior.velocity.y += Gravity;
//        }
    //Drawing all sprites
    drawSprites();

    
    
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
        warrior.position.y -= 2;
    }
    else if(isFalling)
    {

        warrior.position.y += 2;
    }

   if(keyWentDown("x"))
    {
    slash = createSprite(warrior.position.x+15, warrior.position.y);
    slash.addImage(slash_img);
    slash.setSpeed(10);
    slash.life = 30;
    slashes.push(slash);
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

