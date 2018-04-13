var xspacing = 2;    // Distance between each horizontal location
var w;                // Width of entire wave
var theta = 0.0;      // Start angle at 0
var amplitude; // Height of wave
var period = 200.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave

var scrollPos;
var realPos;
var char;
function setup() {
  createCanvas(710, 400);
  w = width+16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w/xspacing));
  
    char = new Char();
    
    // Variable to control the background scrolling.
    scrollPos = 0;

    // Variable to store the real position of the gameChar in the game
    // world. Needed for collision detection.
    realPos = char.x - scrollPos;
}

function draw() {
//  amplitude = bassMapped;
  background(128);
//  calcWave();
//  renderWave();
    
  strokeWeight(2);
  line(0, 300, width, 300);
     push()
     translate(scrollPos*1.2, 0);
  char.draw();
    pop()
    
    
    if(char.x > width * 0.2)
        {
            char.x -= 2;
        }
        else
        {
            scrollPos += 2;
        }
    
    if(char.x < width * 0.8)
        {
            char.x  += 2;
        }
        else
        {
            scrollPos -= 2; // negative for moving against the background
        }
}

function Char(){
    
     this.x = 20
 this.draw = function(){
    
     ellipse(this.x, 280, 20, 20);
    this.x += 1;
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



function calcWave() {
  // Increment theta (try different values for 
  // 'angular velocity' here)
  theta += 0.05;

  // For every x value, calculate a y value with sine function
  var x = theta;
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = cos(x)* amplitude;
    x+=dx;
  }
}

function renderWave() {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (var x = 0; x < yvalues.length; x++) {
    ellipse(x*xspacing, height/2+yvalues[x], 16, 16);
  }
}