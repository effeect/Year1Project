//This example uses the p5JS function

var level; //Amplitude level of the program, global variable
var waveform; //Frequency values of the song, global variable

//THE frequency of the file is being measured and shown through the wave, the ampltitude volume levels are represented in the console.

//09/03/2018 - This version of the program is able to take any song and give results back. Please note that there are some bugs such as clicking the mouse pressed multiple times plays the song multiple times. We will fix this on the next iteration.
//File input related functions :
var input; //Creates a single file input for our program
var sound; //The sound file

function setup()
{

  createCanvas(500,400);
  amplitude = new p5.Amplitude(); //Creates a new ampltitude function in the p5.sound file
  frequency = new p5.FFT() //This one measures the frequency of the sound
  amplitude.setInput(sound) //Entering in the variable
  frequency.setInput(sound) //Entering in the variable into


  input = createFileInput(handleFile) //Handle File refers to a function, the createFileInput function is a p5js Dom function

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

function draw()
{
  background(0)
  level = amplitude.getLevel() //gets the level of the ampltitude real time, it's between 1 and 0
  spectrum = frequency.analyze() //This returns an array, this is required at all times
  console.log("Amp : " +level)
  

  //Example used from https://p5js.org/reference/#/p5.FFT

  var waveform = frequency.waveform();
    console.log("Frequency : " +waveform)
  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
  var x = map(i, 0, waveform.length, 0, width);
  var y = map( waveform[i], -1, 1, 0, height);
  vertex(x,y);
  }
  endShape();
}

function mousePressed() //This function handles the play function of the program, this will be modified for the final version of the program.
{
  sound.play()
}
