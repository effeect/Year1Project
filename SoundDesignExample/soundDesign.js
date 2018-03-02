function preload()
{
  sound = loadSound("sound.mp3") //This will need to be replaced by the choice of the user
}

function setup()
{
  amplitude = new p5.Amplitude(); //Creates a new ampltitude function in the p5.sound file

  amplitude.setInput(sound) //Entering in the variable
  sound.play()
}

function draw()
{
  level = amplitude.getLevel(); //gets the level of the ampltitude real time, it's between 1 and 0
  console.log(level)
}

function mousePressed()
{
  sound.play()
}

function mouseReleased()
{
  console.log("this is working")
}
