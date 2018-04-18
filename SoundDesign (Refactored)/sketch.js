//Welcome to our game.

//available values in soundDesign.js, scale from 0 to 100, can be changed in soundDesign.js if needed.
var bassMapped;
var lowMidMapped;
var midMapped;
var highMidMapped;
var trebleMapped;

function setup()
{
  setupSound() //This is the setup function inside the soundDesign.js function.

  createCanvas(innerWidth,innerHeight) //Sets the canvas to stretch the screen
}

function draw()
{

  soundDraw() //This is the draw function inside the soundDesign.js function.
  background(bassMapped,0,0)
  ellipse(500,500,bassMapped * 4, bassMapped * 4)
}
