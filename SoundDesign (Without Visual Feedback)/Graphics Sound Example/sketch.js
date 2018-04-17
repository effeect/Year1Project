var corners =[[-145.5, -250], [315.5, -158],[324.5, 144,],[-153.5, 63.5],[-313.5,-132],[-317.5, 168]];

var activeCorner = 0;
var myString = "";

function preload() {
  img = loadImage("assets/rockets.png");
  sound = loadSound("sound.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pg = createGraphics(640, 480); //size of off-screen buffer (aspect ratio)
    pg2 = createGraphics(640, 480);
  x = 0;
   pg.phase = 0;
    pg2.phase = 3;
    
  amplitude = new p5.Amplitude();
    amplitude.setInput(sound);
    sound.play();
}

function draw() {
  background(0);

    level = amplitude.getLevel();
if (keyIsPressed) moveQuad();
    
  //applying offscreen renderer (DO NOT MOVE!)
  
//  quad(-153.5, 63.5, 324.5, 144, 315.5, -158, -145.5, -250); //Clockwise method seemed to make everything go upside down for some reason. Reflection is cool tho.
     texture(pg);
    animation1()
    quad(corners[0][0], corners[0][1], corners[1][0], corners[1][1], corners[2][0], corners[2][1], corners[3][0], corners[3][1]); //HARD CODE COORDINATES
    texture(pg2)
    animation2()
    quad(corners[4][0], corners[4][1], corners[0][0], corners[0][1], corners[3][0], corners[3][1], corners[5][0], corners[5][1]);
}

function animation1()
{
//    //Copy and pasted code
        pg.push();
    pg.background(0);
        pg.translate(pg.width / 2, pg.height / 2);
        pg.phase += level*50;
        pg.rectMode(CENTER);
        var totalSquares = 20;
        for (var i = totalSquares; i > 0; i--) {
        var tempPhase = pg.phase + (i * 10);
        var sw = pg.map(pg.sin(pg.radians(tempPhase)), -1, 1, 2, 18);
        var tempWidth = (pg.width /totalSquares) * i;
        var tempHeight = (pg.height / totalSquares) * i;
        pg.fill(255, 140, 120);
        pg.rect(0, 0, tempWidth, tempHeight);
        pg.fill(120, 200, 255);
        pg.rect(0, 0, tempWidth - sw, tempHeight - sw);
        }
  pg.pop();
}

function animation2(){
    colorMode(HSB)
            pg2.push();
    pg2.background(0);
        pg2.translate(pg2.width / 2, pg2.height / 2);
        pg2.phase += level*100;
        pg2.rectMode(CENTER);
        var totalSquares = 20;
        for (var i = totalSquares; i > 0; i--) {
        var tempPhase = pg2.phase + (i * 10);
        var sw = pg2.map(pg2.sin(pg2.radians(tempPhase)), -1, 1, 2, 18);
        var tempWidth = (pg2.width /totalSquares) * i;
        var tempHeight = (pg2.height / totalSquares) * i;
        pg2.fill(0,50,100);
        pg2.stroke(360, 100, 100);
        
        pg2.rect(0, 0, tempWidth, tempHeight);
        pg2.fill(180, 100, 100);
        pg2.rect(0, 0, tempWidth - sw, tempHeight - sw);
        }
  pg2.pop();

}


function keyReleased() {
  if (keyCode == 13) {
    activeCorner=int(myString);
    console.log("Active corner: " + activeCorner);
    myString = "";
    } else if (keyCode>=48 && keyCode<=57){
      myString += "" + keyCode - 48;
    }
}

function moveQuad() {
  if (keyCode === RIGHT_ARROW){
    corners[activeCorner][0]++;
  } else if (keyCode === LEFT_ARROW){
    corners[activeCorner][0]--;
  } else if (keyCode === DOWN_ARROW){
    corners[activeCorner][1]--;
  } else if (keyCode === UP_ARROW){
    corners[activeCorner][1]++;
  }
}