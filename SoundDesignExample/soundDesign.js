var level;
var waveform;


function preload()
{
  sound = loadSound("sound.mp3") //This will need to be replaced by the choice of the user
}

function setup()
{
  createCanvas(500,800);
  amplitude = new p5.Amplitude(); //Creates a new ampltitude function in the p5.sound file

  frequency = new p5.FFT() //This one measures the frequency of the sound
  amplitude.setInput(sound) //Entering in the variable
  frequency.setInput(sound) //Entering in the variable into

}

function draw()
{
  level = amplitude.getLevel() //gets the level of the ampltitude real time, it's between 1 and 0
  waveform = frequency.analyze() //This returns an array;
  console.log(level)

  //Test example from P5JS sound reference : https://p5js.org/reference/#/p5.FFT
  noStroke();
  fill(0,255,0); // spectrum is green
  for (var i = 0; i< spectrum.length; i++){
  var x = map(i, 0, spectrum.length, 0, width);
  var h = -height + map(spectrum[i], 0, 255, height, 0);
  rect(x, height, width / spectrum.length, h )
}
}

function mousePressed()
{
  sound.play()
}

function mouseReleased()
{
  console.log("this is working")
}
