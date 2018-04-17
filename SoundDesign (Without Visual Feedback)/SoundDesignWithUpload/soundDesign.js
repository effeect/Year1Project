//This example uses the p5JS function

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

function mapping(variable)
{
  var stor = map(variable,0,255,0,100)
  return stor;
}

function draw()
{
  background(0)
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

  console.log(bassMapped)


  //Example used from https://p5js.org/reference/#/p5.FFT

  var waveform = frequency.waveform();
  noFill();
  beginShape();
  stroke(255)
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();

  //Example used from https://p5js.org/reference/#/p5.FFT
  noStroke();
  fill(0,255,0); // spectrum is green
  for (var i = 0; i< spectrum.length; i++)
  {
  var x = map(i, 0, spectrum.length, 0, width);
  var h = -height + map(spectrum[i], 0, 255, height, 0);
  rect(x, height, width / spectrum.length, h )
  }


}

function mousePressed() //This function handles the play function of the program, this will be modified for the final version of the program.
{
  sound.play()
}
