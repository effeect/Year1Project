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

var ground;
var obstacle = [];
function setup() {
    createCanvas(710, 400);
    w = width+16;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w/xspacing));

    //Creating new Character and the ground
    char = new Char();
    ground = new Ground();
    
    //Creating 10 starting obstacles. Width and height made to be maped.
    for(var i = 0; i < 10; i++){
        var x = 30 + random(30, 80) * 10;
        var d_x = random(15, 25);
        var d_y = random(-20, -30);
        obstacle.push(new Obstacle(x, d_x, d_y));
    }
    

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

    
    //Drawing and moving Character
    char.draw();
    char.move();
    

    //Drawing ground
    ground.draw();
    
    //Looping through obstacle array to draw obstacles.
    for(var i = 0; i < obstacle.length; i++)
        {
    obstacle[i].draw();
            if(obstacle[i].x < char.x-10)
                {
                    obstacle.splice(obstacle[i],0,1);
                }
        }
    
    
}

function Char(){

    this.x = 20
    this.draw = function(){

        ellipse(this.x, 280, 20, 20);
    }  
    
    this.move = function(){
        if(this.x < width * 0.1)
    {
        this.x  += 1;
    }
    else
    {
        scrollPos -= 1;
        // negative for moving against the background
    }
    }
}

function Ground(){
    this.start_x = 0;
    this.y = 300;
    this.end_x = width;
    
    this.draw = function(){
        push()
    translate(scrollPos * 1.2, 0);
    strokeWeight(2);
    line(this.start_x, this.y, this.end_x, this.y);
    this.end_x += 10;
    pop();
    }
}

function Obstacle(x, delta_x, delta_y){
    
    this.x = x;
    this.y = 300;
    this.delta_x = delta_x;
    this.delta_y = delta_y;
    
    this.draw = function(){
         push()
    translate(scrollPos * 1.2, 0);
        rect(this.x, this.y, this.delta_x, this.delta_y);
        pop();
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