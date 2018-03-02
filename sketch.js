
var char;
var char_img;

var ground;
var ground_img;

var floorPos_y;
var tile_sheet;
var ground_frames;

function preload(){

char_img = loadImage('sprites/char_sprite.png');
ground_img = loadImage('sprites/ground_sprite.jpg');
//tile_sheet = loadSpriteSheet('sprites/ground_sprite.jpg', width, height, 10);
    
}

function setup()
{
  createCanvas(800, 500);
  floorPos_y = height * 3/4;


  char = createSprite(width/2, height/2);
  char.addImage(char_img);
    
    

}



function draw()
{
    clear();
 background(144,144,144)

 
for(var x = 0; x < 800; x +=100)
 {
   tile_sheet.drawSprites(ground_img, x, height/2);
   
 }
 
 char.position.x = mouseX;
 char.position.y = mouseY;
    char.collide(ground);
 drawSprites();

}


function Character(){

//Front Standing


//Left Standing


//Right standing



}
