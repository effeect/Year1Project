//This example uses the p5JS function

var level; //Amplitude level of the program, global variable
var waveform; //Frequency values of the song, global variable

//THE frequency of the file is being measured and shown through the wave, the amplitude volume levels are represented in the console.

//File input related functions :
var input; //Creates a single file input for our program
var sound; //The sound file

//List of possible frequencies that you can get into the song
var bass;
var lowMid;
var mid;
var highMid;
var treble;

//Global Variables :
var amplitude;
var frequency;

//Booleans
var onOff = true; //On off switch for the program
var soundRecieved = false;
var isPlaying;


function setupSound()
{

  createCanvas(400,400);
  amplitude = new p5.Amplitude(); //Creates a new amplitude function in the p5.sound file
  frequency = new p5.FFT() //This one measures the frequency of the sound
  amplitude.setInput(sound) //Entering in the variable
  frequency.setInput(sound) //Entering in the variable into

  input = createFileInput(handleFile) //Handle File refers to a function, the createFileInput function is a p5js Dom function

    isPlaying = false;
}

function handleFile(file) //This function handles the audio transfer from the computer to the program and back to the computer. Note : the nature of this function means that it will take a few seconds for the sound file to become available to play through the mousePressed function
{
  if (file.type === 'audio')
    {
        
        console.log("File recieved")
        sound = loadSound(file.data)
        soundRecieved = true;
        console.log(file)
    }
}

function mapping(variable)
{
  var stor = map(variable,0,255,0,100)
  return stor;
}

function soundDraw()
{
  level = amplitude.getLevel() //gets the level of the amplitude real time, it's between 1 and 0
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


  if(soundRecieved)
  {
    playMusic()
  }
}

function playMusic()
{
  var soundLoad = sound.isLoaded()
  if(soundLoad)
  {
    sound.play()
    soundRecieved = false;
      isPlaying = true;
  }
}
