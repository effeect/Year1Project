//SOUND VARIABLES!!!

var level; //Amplitude level of the program, global variable
var waveform; //Frequency values of the song, global variable

//THE frequency of the file is being measured and shown through the wave, the ampltitude volume levels are represented in the console.

//File input related functions :
var input; //Creates a single file input for our program
var sound; //The sound file

//List of possible frequencies that you can get into the song
var bass;
var lowMid;
var mid;
var highMid;
var treble;
//The frequencies mapped between 0 and 100 instead of 0 to 255
var bassMapped;
var lowMidMapped;
var midMapped;
var highMidMapped;
var trebleMapped;

var isPlaying = false;
//-----------------------------------------
//---------------------------------------------






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
var grounds = [];
function setup() {
    createCanvas(710, 400);
    amplitude = new p5.Amplitude(); //Creates a new ampltitude function in the p5.sound file
    frequency = new p5.FFT() //This one measures the frequency of the sound
    amplitude.setInput(sound) //Entering in the variable
    frequency.setInput(sound) //Entering in the variable into


    input = createFileInput(handleFile) //Handle File refers to a function, the createFileInput function is a p5js Dom function

    //Creating new Character and the ground
    char = new Char();
    ground = new Ground();



    // Variable to control the background scrolling.
    scrollPos = 0;

    // Variable to store the real position of the gameChar in the game
    // world. Needed for collision detection.
    realPos = char.x - scrollPos;
}

function handleFile(file) //This function handles the audio transfer from the computer to the program and back to the computer. Note : the nature of this function means that it will take a few seconds for the sound file to become available to play through the mousePressed function
{
    if (file.type === 'audio')
    {
        console.log("it works if this displays")
        sound = loadSound(file.data)
        console.log(file)
    }
}

function mapping(variable)
{
    var stor = map(variable,0,255,0,100)
    return stor;
}

function draw() {

    background(128);
    level = amplitude.getLevel() //gets the level of the ampltitude real time, it's between 1 and 0
    spectrum = frequency.analyze() //This returns an array, this is required at all times

    //List of returned frequencies-------------------------
    bass = frequency.getEnergy("bass")
    lowMid = frequency.getEnergy("lowMid")
    mid = frequency.getEnergy("mid")
    highMid = frequency.getEnergy("highMid")
    treble = frequency.getEnergy("treble")

    //Mapped Values --------------------------------------
    bassMapped = map(bass,0,255,0,100)
    lowMidMapped = map(lowMid,0,255,0,100)
    midMapped = map(mid,0,255,0,100)
    highMidMapped = map(highMid,0,255,0,100)
    trebleMapped = map(treble,0,255,0,100)


    //Drawing and moving Character
    char.draw();
    char.move();


    //Drawing ground
    ground.draw();

    //Looping through obstacle array to draw obstacles.

    if(isPlaying ==  true){
        char.y = bassMapped;
        console.log(char.y)
    }

    //    if(isPlaying ==  true){
    //        for(var i = 0; i < waveform.length; i++){
    //        var d_x = bassMapped;
    //        var d_y = bassMapped;
    //        obstacle.push(new Obstacle(char.x + width/2, d_x, d_y));
    //            console.log(obstacle);
    //        }
    //    }
    //    for(var i = 0; i < obstacle.length; i++)
    //        {
    //          obstacle[i].draw();
    //     
    //        }
}

function mousePressed() //This function handles the play function of the program, this will be modified for the final version of the program.
{
  sound.play()
  isPlaying = true;
}

function Char(){

    this.y = 280;
    this.x = 20
    this.draw = function(){

        ellipse(this.x, this.y, 20, 20);
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