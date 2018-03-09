//This example uses the p5JS function

var level;
var waveform;

//THE frequency of the file is being measured and shown through the wave, the ampltitude volume levels are represented in the console.

//File input related functions :
var input;
var mp3File;
var sound;

// function preload()
// {
//   soundFormats('ogg','mp3')
//   sound = loadSound("sound.mp3") //This will need to be replaced by the choice of the user
// }

function setup()
{

  createCanvas(500,400);
  amplitude = new p5.Amplitude(); //Creates a new ampltitude function in the p5.sound file
  frequency = new p5.FFT() //This one measures the frequency of the sound
  amplitude.setInput(sound) //Entering in the variable
  frequency.setInput(sound) //Entering in the variable into


  input = createFileInput(handleFile) //Handle File refers to a function, the createFileInput function is a p5js Dom function

}

function handleFile(file)
{
  if (file.type === 'audio')
    {
        mp3File = createAudio(file);
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
  console.log(level)
  console.log(spectrum)

  //Example used from https://p5js.org/reference/#/p5.FFT

  var waveform = frequency.waveform();
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

function mousePressed()
{
  sound.play()
}

// function mouseReleased()
// {
//   console.log("Song Activated")
// }
