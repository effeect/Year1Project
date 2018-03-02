
var char;
var char_img;

function preload(){

char_img = loadImage('sprites/char_sprite.png')

}

function setup()
{
  createCanvas(500,500)
  

  char = createSprite(width/2, height/2);
  char.addImage(char_img);

}



function draw()
{
 background(144,144,144)
 
    
    
 char.position.x = width/2;
 char.position.y = height/2;
 drawSprites();

}


function Character(){

//Front Standing


//Left Standing


//Right standing



}
