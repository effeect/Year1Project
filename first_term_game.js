/*

The Game Project 5 - Making a complete level

Week 7

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var realPos;

var isLeft;
var isRight;
var isJumping;
var isFalling;

var clouds;
var mountains;
var trees;
var houses;
var cloudY;
var candies;

var score = 0;
var isWon;
var lives;
var isLost;
var isScore;

var enemies;
var platforms;
var x_1;
var x_2;
var _speed;

var isOnPlatform;
//var houseX = 100;
//var houseY = floorPos_y -95;

var candy = [{x_pos: 100, y_pos: 340, size: 50, isFound: false,},
             {x_pos: 300, y_pos: 240, size: 50, isFound: false,},
             {x_pos: 550, y_pos: 150, size: 50, isFound: false,},
             {x_pos: 920, y_pos: 200, size: 50, isFound: false,},
             {x_pos: 800, y_pos: 340, size: 50, isFound: false,}];
var canyon = [{x_pos: 300, width: 80},
              {x_pos: 700, width: 100},
              {x_pos: 900, width: 120},
              {x_pos: 1200, width: 100}];
function setup()
{
    createCanvas(1024, 576);
    floorPos_y = height * 3/4;


    // Variable to control the background scrolling.
    scrollPos = 0;

    // Variable to store the real position of the gameChar in the game
    // world. Needed for collision detection.
    realPos = gameChar_x - scrollPos;

    lives = 3;
    isScore = true;
    startGame();
}

function draw()
{
    background(255,0,0); //fill the sky red
    fill(200, 0, 0);
    rect(0, 0, width, 200);
    fill(220, 0, 0);
    rect(0, 200, width, 100);
    fill(240, 0, 0);
    rect(0, 300, width, 50);

    noStroke();
    fill(0,0,0);
    rect(0, floorPos_y, width, height/4); //draw some black ground
    fill(255, 255, 255, 30);
    rect(0, floorPos_y, width, height/4);

    ////////////////////
    // Draw clouds.

    push();
    translate(scrollPos *1.5, 0);
    for(var i = 0; i < clouds.length; i++)
    {

        clouds[i].show();
    }
    pop();


    //////////////////
    // Draw mountains.
    push();
    translate(scrollPos*1, 0);
    for(var i = 0; i < mountains.length; i++)
    {
        mountains[i].show();
    }
    pop();


    //////////////////////
    // Draw trees.
    push();
    translate(scrollPos*1.5, 0);
    for(var i = 0; i < trees.length; i++)
    {
        trees[i].show(r, g, b);
    }
    pop();


    //Draw houses/NEW//////////////////
    push();
    translate(scrollPos*1.6, 0);
    for(var i = 0; i < houses.length; i++)
    {
        houses[i].show();
    }
    pop();


    ///////////Draw canyons.///////////////////


    for(var i = 0; i < canyon.length; i++)
    {
        push();
        translate(scrollPos*1.2, 0);
        drawCanyon(canyon[i]);
        pop();
        checkCanyon(canyon[i]);
    }


    //////////////Draw pickup items.//////////////


    for(var i = 0; i < candy.length; i++)
    {
        push();
        translate(scrollPos*0.8, 0);
        candyDraw(candy[i]);
        pop();
        pickup(candy[i]);

    }


    /////ENEMIES/////////


    push();
    translate(scrollPos, 0);
    for(var i = 0; i < enemies.length; i++)
    {
        enemies[i].display();
        enemies[i].move();
        enemies[i].checkCharCollision();
    }
    pop();


    /////PLATFORMS/////
    push();
    translate(scrollPos, 0);
    isOnPlatform = false;
    for(var i = 0; i < platforms.length; i++)
    {
        platforms[i].display();
        platforms[i].checkCharOn();
    }
    pop();



    // Draw game character.
    drawGameChar();

    checkPlayerDie();
    checkPlayerWon();

    textSize(25);;
    fill(0);
    text("Your score: "+score, 100, 200);
    text("Lives: "+lives, 100, 250);



    if(isLost == true)
    {
        text("Game is lost! Press space to continue", 200, 50)
        return;
    }
    if(isWon == true)
    {
        text("Game is won! Press space to continue", 200, 50)
        return;
    }

    // Logic to make the game character move or the background scroll.
    if(isLeft)
    {
        if(gameChar_x > width * 0.2)
        {
            gameChar_x -= 5;
        }
        else
        {
            scrollPos += 5;
        }
    }

    if(isRight)
    {
        if(gameChar_x < width * 0.8)
        {
            gameChar_x  += 5;
        }
        else
        {
            scrollPos -= 5; // negative for moving against the background
        }
    }

    // Logic to make the game character rise and fall.
    if(gameChar_y < floorPos_y)
    {
        gameChar_y += 2;
        isJumping = true;
    }
    else
    {
        isJumping = false;
    }

    if(isFalling)
    {
        if(isOnPlatform == false)
            gameChar_y += 5;
    }

    // Update real position of gameChar for collision detection.
    realPos = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

    // console.log(keyCode);
    // console.log(key);
    if(isLost || isWon)
    {
        if(key == ' ')
        {
            nextLevel();
        }
        return;
    }

    if(key == 'A' || keyCode == 37)
    {
        isLeft = true;
    }

    if(key == 'D' || keyCode == 39)
    {
        isRight = true;
    }

    if(key == ' ' || key == 'W')
    {
        if(!isJumping)
        {
            gameChar_y -= 100;
        }
    }
}

function keyReleased(){

    if(key == 'A' || keyCode == 37)
    {
        isLeft = false;
    }

    if(key == 'D' || keyCode == 39)
    {
        isRight = false;
    }

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
    // draw game character

    ////////JUMP LEFT///////////
    if(isLeft == true && isJumping == true)
    {
        if(isLeft == true && isJumping == true)
        {
            gameChar_x -= 2;
            gameChar_y -= 2;
        }



        //        //legs
        noStroke();
        fill(0, 102, 0);
        quad(gameChar_x-4, gameChar_y-29, gameChar_x, gameChar_y-28, gameChar_x-12, gameChar_y-17, gameChar_x-19, gameChar_y-15);
        quad(gameChar_x-1, gameChar_y-28, gameChar_x+6, gameChar_y-29, gameChar_x-6, gameChar_y-7, gameChar_x-10, gameChar_y-7);
        //
        //torso
        //
        fill(51, 51, 255);
        stroke(0, 0, 255);
        ellipse(gameChar_x, gameChar_y-29, 15, 28);
        //
        //feet
        stroke(0);
        ellipse(gameChar_x-19, gameChar_y-18, 8, 5);
        ellipse(gameChar_x-9,gameChar_y-9, 8, 5);
        fill(51, 25, 0)
        //    noStroke();
        rect(gameChar_x-22, gameChar_y-17, 8, 3);
        rect(gameChar_x-12, gameChar_y-7, 8, 3);
        //
        //head
        stroke(255, 0, 0);
        fill(255, 51, 51);
        rect(gameChar_x-8, gameChar_y-57, 10, 15);
        //hat
        fill(0);
        noStroke();
        rect(gameChar_x-9, gameChar_y-64, 13, 4);
        stroke(255);
        rect(gameChar_x-16, gameChar_y-59, 26, 3);
        //eyes
        fill(255);
        ellipse(gameChar_x-4, gameChar_y-52, 4, 4);

        //arms
        fill(28, 228, 255);
        noStroke();
        rect(gameChar_x-6, gameChar_y-41, -12, 3);
        rect(gameChar_x+6, gameChar_y-41, 12, 3);
        //lower arms
        triangle(gameChar_x-18, gameChar_y-38, gameChar_x-14, gameChar_y-38, gameChar_x-17, gameChar_y-57);
        triangle(gameChar_x+14, gameChar_y-38, gameChar_x+18, gameChar_y-38, gameChar_x+16, gameChar_y-17);
        //hands
        fill(255, 51, 51);
        ellipse(gameChar_x-16, gameChar_y-55, 10, 7);
        ellipse(gameChar_x+16, gameChar_y-22, 10, 7);

    }
    ////JUMP RIGHT////////////
    else if(isRight == true && isJumping == true)
    {
        if(isRight == true && isJumping == true)
        {
            gameChar_x += 2;
            gameChar_y -= 2;
        }



        //legs
        noStroke();
        fill(0, 102, 0);
        quad(gameChar_x-6, gameChar_y-29, gameChar_x+1, gameChar_y-28, gameChar_x+8, gameChar_y-5, gameChar_x+6, gameChar_y-4);
        quad(gameChar_x-1, gameChar_y-28, gameChar_x+6, gameChar_y-29, gameChar_x+15, gameChar_y-15, gameChar_x+10, gameChar_y-14);

        //torso
        //
        fill(51, 51, 255);
        stroke(0, 0, 255);
        ellipse(gameChar_x, gameChar_y-31, 15, 22);

        //feet
        fill(102, 51, 0);
        stroke(0);
        ellipse(gameChar_x+8, gameChar_y-7, 8, 5);
        ellipse(gameChar_x+16, gameChar_y-17, 8, 5);
        fill(51, 25, 0)
        noStroke();
        rect(gameChar_x+4, gameChar_y-5, 8, 3);
        rect(gameChar_x+10, gameChar_y-15, 8, 3);

        //head
        stroke(255, 0, 0);
        fill(255, 51, 51);
        rect(gameChar_x-4, gameChar_y-57, 10, 15);
        //hat
        fill(0);
        noStroke();
        rect(gameChar_x-4, gameChar_y-64, 13, 4);
        stroke(255);
        rect(gameChar_x-11, gameChar_y-59, 26, 3);
        //eyes
        fill(255);
        ellipse(gameChar_x+1, gameChar_y-52, 4, 4);

        //arms
        fill(28, 228, 255);
        noStroke();
        rect(gameChar_x-6, gameChar_y-41, -12, 3);
        rect(gameChar_x+6, gameChar_y-41, 12, 3);
        //lower arms
        triangle(gameChar_x-18, gameChar_y-38, gameChar_x-14, gameChar_y-38, gameChar_x-17, gameChar_y-17);
        triangle(gameChar_x+14, gameChar_y-38, gameChar_x+18, gameChar_y-38, gameChar_x+16, gameChar_y-57);
        //hands
        fill(255, 51, 51);
        ellipse(gameChar_x-16, gameChar_y-22, 10, 7);
        ellipse(gameChar_x+16, gameChar_y-55, 10, 7);

    }
    ////WALK LEFT///////////
    else if(isLeft == true)
    {
        //        gameChar_x -= 1;



        //legs
        noStroke();
        fill(0, 102, 0);
        quad(gameChar_x-4, gameChar_y-29, gameChar_x+3, gameChar_y-28, gameChar_x-9, gameChar_y-8, gameChar_x-16, gameChar_y-9);
        quad(gameChar_x-1, gameChar_y-28, gameChar_x+6, gameChar_y-29, gameChar_x+5, gameChar_y, gameChar_x+1, gameChar_y-2);

        //torso

        fill(51, 51, 255);
        stroke(0, 0, 255);
        ellipse(gameChar_x, gameChar_y-29, 15, 28);

        //feet
        fill(102, 51, 0);
        stroke(0);
        ellipse(gameChar_x-17, gameChar_y-13, 8, 5);
        ellipse(gameChar_x, gameChar_y-2, 8, 5);
        fill(51, 25, 0)
        noStroke();
        rect(gameChar_x-17, gameChar_y-11, 8, 3);
        rect(gameChar_x-2, gameChar_y, 8, 3);

        //head
        stroke(255, 0, 0);
        fill(255, 51, 51);
        rect(gameChar_x-8, gameChar_y-57, 10, 15);
        //hat
        fill(0);
        noStroke();
        rect(gameChar_x-9, gameChar_y-64, 13, 4);
        stroke(255);
        rect(gameChar_x-16, gameChar_y-59, 26, 3);
        //eyes
        fill(255);
        ellipse(gameChar_x-4, gameChar_y-52, 4, 4);

        //arms
        fill(28, 228, 255);
        noStroke();
        rect(gameChar_x-6, gameChar_y-41, -12, 3);
        rect(gameChar_x+6, gameChar_y-41, 12, 3);
        //lower arms
        triangle(gameChar_x-20, gameChar_y-38, gameChar_x-14, gameChar_y-38, gameChar_x-17, gameChar_y-57);
        triangle(gameChar_x+14, gameChar_y-38, gameChar_x+18, gameChar_y-38, gameChar_x+16, gameChar_y-17);
        //hands
        fill(255, 51, 51);
        ellipse(gameChar_x-16, gameChar_y-62, 10, 7);
        ellipse(gameChar_x+16, gameChar_y-22, 10, 7);
    }
    //WALK RIGHT//////////////
    else if(isRight == true)
    {
        //        gameChar_x += 1;
        ///////////////////////////


        //legs
        noStroke();
        fill(0, 102, 0);
        quad(gameChar_x-6, gameChar_y-29, gameChar_x+1, gameChar_y-28, gameChar_x-2, gameChar_y+1, gameChar_x-5, gameChar_y);
        quad(gameChar_x-1, gameChar_y-28, gameChar_x+6, gameChar_y-29, gameChar_x+17, gameChar_y-9, gameChar_x+8, gameChar_y-8);

        //torso

        fill(51, 51, 255);
        stroke(0, 0, 255);
        ellipse(gameChar_x, gameChar_y-29, 15, 28);
        //feet
        fill(102, 51, 0);
        stroke(0);
        ellipse(gameChar_x+2, gameChar_y-3, 8, 5);
        ellipse(gameChar_x+16, gameChar_y-13, 8, 5);

        fill(51, 25, 0)
        noStroke();
        rect(gameChar_x-4, gameChar_y-1, 8, 3);
        rect(gameChar_x+14, gameChar_y-11, 8, 3);

        //head
        stroke(255, 0, 0);
        fill(255, 51, 51);
        rect(gameChar_x-4, gameChar_y-57, 10, 15);
        //hat
        fill(0);
        noStroke();
        rect(gameChar_x-4, gameChar_y-64, 13, 4);
        stroke(255);
        rect(gameChar_x-11, gameChar_y-59, 26, 3);
        //eyes
        fill(255);
        ellipse(gameChar_x+1, gameChar_y-52, 4, 4);


        //arms
        fill(28, 228, 255);
        noStroke();
        rect(gameChar_x-6, gameChar_y-41, -12, 3);
        rect(gameChar_x+6, gameChar_y-41, 12, 3);
        //lower arms
        triangle(gameChar_x-18, gameChar_y-38, gameChar_x-14, gameChar_y-38, gameChar_x-17, gameChar_y-17);
        triangle(gameChar_x+14, gameChar_y-38, gameChar_x+18, gameChar_y-38, gameChar_x+16, gameChar_y-57);
        //hands
        fill(255, 51, 51);
        ellipse(gameChar_x-16, gameChar_y-22, 10, 7);
        ellipse(gameChar_x+16, gameChar_y-55, 10, 7);

    }
    ////////JUMP FORWARD////////////
    else if(isJumping == true || isFalling == true)
    {
        //        if(isJumping == true)
        //            {
        //                gameChar_y -= 2;
        //            }
        //        if(gameChar_y <= 300)
        //            {
        //                isFalling = true;
        //            }
        //        if(isFalling == true)
        //            {
        //                gameChar_y += 2;
        //                isJumping = false;
        //            }
        //        if(gameChar_y == floorPos_y)
        //            {
        //                isFalling = false;
        //            }



        //legs
        noStroke();
        fill(0, 102, 0);
        quad(gameChar_x-8, gameChar_y-29, gameChar_x, gameChar_y-28, gameChar_x-14, gameChar_y-12, gameChar_x-21, gameChar_y-11);
        quad(gameChar_x+1, gameChar_y-28, gameChar_x+9, gameChar_y-29, gameChar_x+22, gameChar_y-11, gameChar_x+13, gameChar_y-12);
        //torso
        //
        fill(51, 51, 255);
        stroke(0, 0, 255);
        ellipse(gameChar_x, gameChar_y-31, 20, 23);
        //feet
        fill(102, 51, 0);
        stroke(0);
        ellipse(gameChar_x-18, gameChar_y-12, 8, 5);
        ellipse(gameChar_x+17, gameChar_y-12, 8, 5);
        fill(51, 25, 0)
        noStroke();
        rect(gameChar_x-22, gameChar_y-10, 8, 3);
        rect(gameChar_x+14, gameChar_y-10, 8, 3);

        //head
        stroke(255, 0, 0);
        fill(255, 51, 51);
        rect(gameChar_x-8, gameChar_y-57, 15, 15);
        //hat
        fill(0);
        noStroke();
        rect(gameChar_x-9, gameChar_y-64, 18, 4);
        stroke(255);
        rect(gameChar_x-16, gameChar_y-59, 31, 3);
        //eyes
        fill(255);
        ellipse(gameChar_x-4, gameChar_y-52, 4, 4);

        //arms
        fill(28, 228, 255);
        noStroke();
        rect(gameChar_x-6, gameChar_y-41, -12, 3);
        rect(gameChar_x+6, gameChar_y-41, 12, 3)
        //lower arms
        triangle(gameChar_x-18, gameChar_y-38, gameChar_x-14, gameChar_y-38, gameChar_x-19, gameChar_y-59);
        triangle(gameChar_x+14, gameChar_y-38, gameChar_x+18, gameChar_y-38, gameChar_x+19, gameChar_y-59)
        //hands
        fill(255, 51, 51);
        ellipse(gameChar_x-19, gameChar_y-58, 10, 7);
        ellipse(gameChar_x+19, gameChar_y-58, 10, 7);

    }
    else //Standing front face
    {


        //legs
        noStroke();
        fill(0, 102, 0);
        rect(gameChar_x-8, gameChar_y-30, 8, 30);
        rect(gameChar_x+1, gameChar_y-30, 8, 30);

        //torso

        fill(51, 51, 255);
        stroke(0, 0, 255);
        ellipse(gameChar_x, gameChar_y-30, 20, 28);

        //feet
        fill(102, 51, 0);
        stroke(0);
        ellipse(gameChar_x-4, gameChar_y-2, 8, 5);
        ellipse(gameChar_x+5, gameChar_y-2, 8, 5);
        fill(51, 25, 0)
        noStroke();
        rect(gameChar_x-8, gameChar_y, 8, 3);
        rect(gameChar_x+1, gameChar_y, 8, 3);

        //head
        stroke(255, 0, 0);
        fill(255, 51, 51);
        rect(gameChar_x-8, gameChar_y-57, 15, 15);
        //hat
        fill(0);
        noStroke();
        rect(gameChar_x-9, gameChar_y-64, 18, 4);
        stroke(255);
        rect(gameChar_x-16, gameChar_y-59, 31, 3);
        //eyes
        fill(255);
        ellipse(gameChar_x-4, gameChar_y-52, 4, 4);


        //arms
        fill(28, 228, 255);
        noStroke();
        rect(gameChar_x-6, gameChar_y-41, -12, 3);
        rect(gameChar_x+6, gameChar_y-41, 12, 3);
        //lower arms
        triangle(gameChar_x-18, gameChar_y-38, gameChar_x-14, gameChar_y-38, gameChar_x-16, gameChar_y-17);
        triangle(gameChar_x+14, gameChar_y-38, gameChar_x+18, gameChar_y-38, gameChar_x+16, gameChar_y-17);
        //hands
        fill(255, 51, 51);
        ellipse(gameChar_x-16, gameChar_y-22, 10, 7);
        ellipse(gameChar_x+16, gameChar_y-22, 10, 7);
    }
}

/////////
//Enemies
//////

//class enemy{
//    constructor(X, Y, S){
//        this.x_pos = X; //10;
//        this.y_pos = Y; //floorPos_y;
//        this.size = S; //30;
//
//    }
//
//    display()
//    {
//        // Draw enemy.
//            fill([255, 0, 0]);
//            ellipse(this.x_pos, this.y_pos, this.size);
//    }
//
//    move(X, Y, S)
//    {
//        this.x1 = X;
//        this.x2 = Y;
//        this.speed = S;
//
//        this.x_pos += this.speed;
//        if(this.x_pos < this.x1 || this.x_pos > this.x2)
//            {
//                this.speed *= -1;
//            }
//    }
//}

// ---------------------------
// Background render functions
// ---------------------------

class cloud{
    constructor(posX, posY){
        this.x = posX;
        this.y = posY;
    }

    show() {
        noStroke();
        fill(128, 128, 128);
        ellipse(this.x+100, this.y, 80, 50);
        fill(128, 128, 128);
        ellipse(this.x-30, this.y+5, 80, 40);
        ellipse(this.x-70, this.y+10, 70, 20);
        ellipse(this.x+50, this.y+15, 110, 35);
        ellipse(this.x+62, this.y+8, 100, 40);
        ellipse(this.x+110, this.y+10, 100, 15);
    }

}

class mountain{
    constructor(posX, posY, large_peak, med_peak, small_peak){
        this.x = posX;
        this.y = posY;

        this.l = large_peak;
        this.m = med_peak;
        this.s = small_peak;
    }

    show() {

        noStroke();
        //large mountain
        fill(64, 64, 64);
        triangle(this.x-50, this.l-300 , this.x +180, this.y, this.x- 200, this.y);
        //big mountain
        fill(128, 128, 128);
        triangle(this.x-25, this.m-150, this.x+ 150, this.y, this.x-150, this.y);
        //smaller mountain
        fill(255);
        triangle(this.x + 80, this.s-200, this.x+200, this.y, this.x-20, this.y);
    }
}

class tree{

    constructor(posX, posY, posH)
    {
        this.x = posX;
        this.y = posY;
        this.h = posH;
    }

    show(R, G, B){
        this.r = R;
        this.g = G;
        this.b = B;
        noStroke();
        //tree trunk
        fill(this.r, this.g, this.b);
        quad(this.x -5, this.h -10, this.x +5, this.h +10, this.x +25, this.y, this.x -25, this.y);
        //branches
        //left side
        triangle(this.x -25, this.h +20, this.x -6, this.y -125, this.x -11, this.y -100);
        triangle(this.x -35, this.h +70, this.x -11, this.y -75, this.x -17, this.y -25);
        //    //right side
        triangle(this.x +25, this.h +20, this.x +6, this.y -120, this.x +11, this.y -100);
        triangle(this.x +35, this.h +70, this.x+11, this.y -65, this.x +17, this.y -15);
    }

}

class house{

    constructor(posX, posY, w_scale, h_scale)
    {
        this.x = posX;
        this.y = posY;
        this.h = h_scale;
        this.w = w_scale;
    }

    show ()
    {
        //pumpkin
        fill(153, 76, 0);
        ellipse(this.x, this.y, 200, 200);
        //windows
        fill(255, 255, 0);
        rect(this.x - 60, this.y -40, 40, 30);
        rect(this.x + 30, this.y - 40, 40, 30);
        //door
        fill(255, 255, 0);
        rect(this.x - 25, this.y + 20, 50, 80);
        //door shade
        fill(153, 76, 0);
        //    quad(this.x -5, this.y +80, this.x +5, this.y +80, this.x +25, this.y +100, this.x -25, this.y + 100);
        //chimney
        fill(0, 102, 0);
        rect(this.x +30, this.y -120, 25, 40);
        //light on ground, door
        //    fill(255, 255, 0, 50);
        //    quad(this.x - 25, this.y + 100, this.x +25, this.y +100, this.x +40, this.y + 160, this.x - 40, this.y + 160);

        //light on the ground, windows
        //    fill(255, 255, 0, 50);
        //    quad(this.x - 75, this.y +100, this.x -40, this.y +100, this.x -45, this.y + 115, this.x -85, this.y + 115);
        //    quad(this.x + 40, this.y+ 100, this.x + 80, this.y +100, this.x +90, this.y +115, this.x +45, this.y +115);

    }
}


// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{

    fill(50,50,0);
    rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height - floorPos_y);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{

    if(realPos < (t_canyon.x_pos+100) && gameChar_y > (floorPos_y -15) && realPos > t_canyon.x_pos )
    {
        if(isOnPlatform == false)
            isFalling = true;
    }
}

// ----------------------------------
// Pick-up render and check functions
// ----------------------------------

// Function to draw pick-up objects.
function candyDraw(t_candy)
{
    if(t_candy.isFound == false)
    {
        fill(255);
        triangle(t_candy.x_pos, t_candy.y_pos, t_candy.x_pos+40, t_candy.y_pos, t_candy.x_pos+20, t_candy.y_pos+25);
        triangle(t_candy.x_pos+20, t_candy.y_pos+65, t_candy.x_pos+40, t_candy.y_pos+90, t_candy.x_pos, t_candy.y_pos+90);
        line(420, 330, 430, 330);
        fill(153, 0, 76);
        ellipse(t_candy.x_pos+20,t_candy.y_pos+45, t_candy.size-20, t_candy.size);
        stroke(255, 255, 0);
        strokeWeight(3);
        line(t_candy.x_pos+11, t_candy.y_pos+27, t_candy.x_pos+32, t_candy.y_pos+35);
        line(t_candy.x_pos+7, t_candy.y_pos+35, t_candy.x_pos+34, t_candy.y_pos+45);
        line(t_candy.x_pos+5, t_candy.y_pos+45, t_candy.x_pos+32, t_candy.y_pos+55);
        line(t_candy.x_pos+7, t_candy.y_pos+55, t_candy.x_pos+27, t_candy.y_pos+63);
        noStroke();
        strokeWeight(1);
    }
}




// Function to check character has picked up an item.
function pickup(t_candy)
{
    //        for(var i = 0; i < t_candy.length; i++)
    //            {
    if(realPos > t_candy.x_pos && realPos < t_candy.x_pos+20 && gameChar_y > t_candy.y_pos)
    {

        //            t_candy.isScore = false;
        if(t_candy.isFound == false)
        {
            t_candy.isFound = true;
            score += 1;
            console.log(score);
        }
    }

}
function checkPlayerWon()
{
    if(score == 3)
    {
        isWon = true;
    }
}

function checkPlayerDie()
{
    if (gameChar_y > height)
    {
        playerDied();
    }
}

function playerDied()
{
    console.log('player died!');
    lives--;
    if (lives > 0)
    {
        // Restart game.
        startGame();
    }
    else
    {
        // Game over, player lost.
        isLost = true;
    }
}


function startGame()
{
    gameChar_x = width/2;
    gameChar_y = floorPos_y;
    // Boolean variables to control the movement of the game character.
    isLeft = false;
    isRight = false;
    isJumping = false;
    isFalling = false;
    isWon = false;
    isLost = false;
    isOnPlatform = false;

    // Initialise arrays of scenery objects.
    //House
    houses = [];
    for(var i = 0; i < 15; i++)
    {


        let x = random(300, 400)*i;
        let y = floorPos_y -95;

        houses[i] = new house(x, y);
    }

    //clouds
    clouds = [];
    for(var i = 0; i < 20; i++)
    {
        let x = 100 + 165 *i;
        let y = random(30, 130);
        clouds[i] = new cloud(x, y);
    }

    //Mountains
    mountains = [];
    for(var i = 0; i < 14; i++)
    {
        let x = 30 + random(300, 400) *i;
        let y = floorPos_y;
        let l = floorPos_y - 20*random(2,3);
        let m = random(450, 500);
        let s = random(550, 600);
        mountains[i] = new mountain(x, y, l, m, s);
    }

    //Trees
    trees = [];
    for(var i = 0; i < 50; i++)
    {
        let x = 135 + random(140, 160) *i;
        let y = floorPos_y;
        let h = floorPos_y - random(80, 200);
        trees[i] = new tree(x, y, h);
    }

    //Enemies
    enemies = [];
    enemies.push(
        {
            x_pos: 10,
            y_pos: floorPos_y,
            size: 30,
            x1: 10,
            x2: 100,
            speed: 1,
            display: function()
            {
                // Draw enemy.
                fill(0, 0, 255);
                ellipse(this.x_pos-10, this.y_pos-7, this.size/2);
                ellipse(this.x_pos+10, this.y_pos-7, this.size/2);
                fill([125, 200, 0]);
                ellipse(this.x_pos, this.y_pos, this.size);
            },
            move: function()
            {
                this.x_pos += this.speed;
                if(this.x_pos < this.x1 || this.x_pos > this.x2)
                {
                    this.speed *= -1;
                }
            },
            checkCharCollision: function()
            {
                if(realPos > this.x_pos - this.size/2 && realPos < this.x_pos + this.size/2)
                {
                    if(gameChar_y > this.y_pos - this.size/2)
                    {
                        playerDied();
                    }
                }
            }
        }
    );

    enemies.push(
        {
            x_pos: 200,
            y_pos: floorPos_y-115,
            size: 30,
            x1: 200,
            x2: 300,
            speed: 1,
            display: function()
            {
                // Draw enemy.
                fill(0);
                ellipse(this.x_pos-10, this.y_pos-7, this.size/2);
                ellipse(this.x_pos+10, this.y_pos-7, this.size/2);
                fill([255, 0, 200]);
                ellipse(this.x_pos, this.y_pos, this.size);
            },
            move: function()
            {
                this.x_pos += this.speed;
                if(this.x_pos < this.x1 || this.x_pos > this.x2)
                {
                    this.speed *= -1;
                }
            },
            checkCharCollision: function()
            {
                if(realPos > this.x_pos - this.size/2 && realPos < this.x_pos + this.size/2)
                {
                    if(gameChar_y > this.y_pos - this.size/2 && gameChar_y < this.y_pos  + this.size/2)
                    {
                        playerDied();
                    }
                }
            }
        }
    );

    enemies.push(
        {
            x_pos: 800,
            y_pos: floorPos_y-165,
            size: 30,
            x1: 800,
            x2: 900,
            speed: 1,
            display: function()
            {
                // Draw enemy.
                fill(0);
                ellipse(this.x_pos-10, this.y_pos-7, this.size/2);
                ellipse(this.x_pos+10, this.y_pos-7, this.size/2);
                fill([185, 180, 200]);
                ellipse(this.x_pos, this.y_pos, this.size);
            },
            move: function()
            {
                this.x_pos += this.speed;
                if(this.x_pos < this.x1 || this.x_pos > this.x2)
                {
                    this.speed *= -1;
                }
            },
            checkCharCollision: function()
            {
                if(realPos > this.x_pos - this.size/2 && realPos < this.x_pos + this.size/2)
                {
                    if(gameChar_y > this.y_pos - this.size/2 && gameChar_y < this.y_pos  + this.size/2)
                    {
                        playerDied();
                    }
                }
            }
        }
    );
    platforms = [];
    platforms.push(
        {
            x_pos: 200,
            y_pos: floorPos_y - 100,
            width: 200,
            height: 15,
            display: function()
            {
                // Draw platform.
                fill([255, 200, 0]);
                rect(this.x_pos, this.y_pos, this.width, this.height);
                line(this.x_pos,
                     this.y_pos + this.height / 2,
                     this.x_pos + this.width,
                     this.y_pos + this.height / 2);


            },
            checkCharOn: function()
            {
                if(realPos < this.width && realPos > this.width)
                {
                    if(gameChar_y < height && gameChar_y >this.y_pos)
                    {
                        isOnPlatform = true;
                    }
                }
            }
        }
    );
    platforms.push(
        {
            x_pos: 400,
            y_pos: floorPos_y - 200,
            width: 200,
            height: 15,
            display: function()
            {
                // Draw platform.
                fill([255, 200, 0]);
                rect(this.x_pos, this.y_pos, this.width, this.height);
                line(this.x_pos,
                     this.y_pos + this.height / 2,
                     this.x_pos + this.width,
                     this.y_pos + this.height / 2);


            },
            checkCharOn: function()
            {
                if(realPos < this.width && realPos > this.width)
                {
                    if(gameChar_y < height && gameChar_y >this.y_pos)
                    {
                        isOnPlatform = true;
                    }
                }
            }
        }
    );
    platforms.push(
        {
            x_pos: 800,
            y_pos: floorPos_y - 150,
            width: 200,
            height: 15,
            display: function()
            {
                // Draw platform.
                fill([255, 200, 0]);
                rect(this.x_pos, this.y_pos, this.width, this.height);
                line(this.x_pos,
                     this.y_pos + this.height / 2,
                     this.x_pos + this.width,
                     this.y_pos + this.height / 2);


            },
            checkCharOn: function()
            {
                if(realPos < this.width && realPos > this.width)
                {
                    if(gameChar_y < height && gameChar_y >this.y_pos)
                    {
                        isOnPlatform = true;
                    }
                }
            }
        }
    );
    //Candies score

    //   if(pickup(candy.isFound) == true)
    //        {
    //            score +=1;
    //            console.log(score);
    //        }
    //

    //Colors
    for(var i = 0; i < 255; i++)
    {
        r = random(i);
    }
    for(var i = 0; i < 255; i++)
    {
        g = random(i);
    }
    for(var i = 0; i < 255; i++)
    {
        b = random(i);
    }

    //Enemy movement vars
    //    x_1 = 9;
    //    x_2 = x1+10;
    //    _speed = 1;
}

function nextLevel()
{
    // DO NOT CHANGE THIS FUNCTION!
    console.log('next level');
}
