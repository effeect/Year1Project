//Sprite variabless
var warrior;
var warrior_img;

var ground;
var ground_img;

var box;
var box_img;

//Arrays
var grounds = [];
var boxes = [];


//Key/Movement booleans
var isLeft = false;
var isRight = false;
var isJumping = false;
var isFalling = false;

//Forces
var Gravity = 0.2;


function preload(){

    warrior_img = loadImage('sprites/char_sprite.png');
    ground_img = loadImage('sprites/ground_sprite.png');
    box_img = loadImage('sprites/box_sprite.png');

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
        //Ground sprites
        
        //Prob can be mapped to sound
        var groundY = random(300, 500)
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
    background(255)

    
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
                   
                   console.log(boxes[i])
               }
        }
    
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