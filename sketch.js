
var warrior;
var warrior_img;

var ground;
var ground_img;

var floorPos_y;
var tile_sheet;
var ground_frames;
var tile_frames;

var grounds = [];


//Key booleans
var isLeft = false;
var isRight = false;
var isJumping = false;
var isFalling = false;


//var tile_frames = [
//  {"name":"ground.png", "frame":{"x":0, "y": 0, "width": 100, "height": 26}},
////  {"name":"ground", "frame":{"x":100, "y": 300, "width": 100, "height": 26}},
////  {"name":"ground", "frame":{"x":200, "y": 300, "width": 100, "height": 26}},
////  {"name":"ground", "frame":{"x":300, "y": 300, "width": 100, "height": 26}},
//];

function preload(){
    //tile_frames = loadJSON('tiles.json');
    warrior_img = loadImage('sprites/char_sprite.png');
    ground_img = loadImage('sprites/ground_sprite.png');


    loadJSON('tiles.json', function(tile_frames) {
        // Load tiles sprite sheet from frames array once frames array is ready
        tile_sheet = loadSpriteSheet('sprites/ground_sheet.png', tile_frames);

    });
    //tile_sheet = loadSpriteSheet('sprites/ground_sprite.png', tile_frames);

}

function setup()
{
    createCanvas(800, 500);
    floorPos_y = height * 3/4;


    warrior = createSprite(width/2, height/2);
    warrior.addImage(warrior_img);
    
    for(var x = 0; x < 800; x+= 100)
        {
      ground = createSprite(x, 300);
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

    // tile_sheet.drawFrame('ground.png', 100, 100);
//    for(var x = 0; x < 800; x +=100)
//    {
//        tile_sheet.drawFrame('ground.png', x, 300);
//    }

//    warrior.position.x = mouseX;
//    warrior.position.y = mouseY;
    for(var i = 0; i < grounds.length; i++)
        {
    warrior.collide(grounds[i]);
        }
    drawSprites();
    
    if(isRight)
        {
            warrior.position.x += 1;
        }
    if(isLeft)
        {
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