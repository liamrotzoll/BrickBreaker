// select canvas element from index.html
const cvs = document.getElementById("breakout");

// to draw on the canvas
const ctx = cvs.getContext("2d");

// add canvas border
cvs.style.border = "1px solid #0ff";

// game variables and constants
// make width more visible
ctx.lineWidth = 3;
const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const BALL_RADIUS = 8;
const PADDLE_HEIGHT = 20;
let LIFE = 3; // 3 lives for the player
let leftArrow = false;
let rightArrow = false;
let score = 0

// paddle is created using the constants
const paddle = {
    // x location of the paddle so the paddle is now centered'
    // this is a object since it is a key value pair
    x : cvs.width/2 - PADDLE_WIDTH/2,
    // y location of the paddle so it is centered
    y: cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    // width of the paddle
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    // how much the paddle moves
    dx: 5
}

// paddle being drawn
function drawPaddle(){
    // color of paddle
    ctx.fillStyle = "#2e3548";
    // know what to fill in
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    // color surrounding paddle
    ctx.strokeStyle = "#ffcd05";
    // know what to fill in
    ctx.strokeRect(paddle.x,paddle.y,paddle.width,paddle.height);
}

// move the paddle, dont understand the bracketing
document.addEventListener("keydown",function(event){
    if(event.keyCode==37){
        leftArrow = true;
    }else if(event.keyCode==39){
        rightArrow = true;
    }
});
document.addEventListener("keyup",function(event){
    if(event.keyCode==37){
        leftArrow = false;
    }else if(event.keyCode==39){
        rightArrow = false;
    }
});

// move paddle function
function movePaddle(){
    if(rightArrow && paddle.x + paddle.width < cvs.width){
        paddle.x += paddle.dx;
    }else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.dx;
    }
}
// create the ball
const ball ={
    x : null,
    y : null,
    radius : BALL_RADIUS,
    speed : 10,
    dx : 0,
    dy : 10
}

resetBall();

// draw the ball
function drawBall(){

    ctx.beginPath();

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#ffcd05";
    ctx.fill();

    ctx.strokeStyle = "2e3548"
    ctx.stroke();

    ctx.closePath();
}

// MOVE THE BALL
function moveBall(){
    ball.x += ball.dx;

    // GRAVITY
    ball.dy = ball.dy + .2;


    ball.y += ball.dy;
}

// BALL AND WALL COLLISION DETECTION

function ballWallCollision(){
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
        ball.dx =- ball.dx;
    }

    if(ball.y - ball.radius < 0){
        ball.dy =- ball.dy;
    }

    if(ball.y + ball.radius > cvs.height){
        LIFE--; // lost a life
        resetBall(); // put ball in old positio
    }
}
// RESET THE BALL
function resetBall(){
    ball.x = cvs.width/2;
    ball.y = paddle.y - BALL_RADIUS - 200;
    ball.dx = 0;
    ball.dy = 0;
}

// BALL AND PADDLE COLLISION
function ballPaddleCollision(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){

        // check where the ball hit the paddle
        let collidePoint = ball.x - (paddle.x + paddle.width/2);
        // normalize the values
        collidePoint = collidePoint / (paddle.width/2);

        // calculate the angle of the ball

        let angle = collidePoint * Math.PI/3;


        ball.dx = ball.speed * Math.sin(angle);
        ball.dy =- ball.speed * Math.cos(angle);
    }
}

// update score
function point (){
   // ball hits paddle, we increment the score
   if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){
        score ++ ;
        document.getElementById('scoresheet').innerHTML = score;
   // ball does not hits the lower bound, we reset the score to zero
   } else if(ball.y + ball.radius > cvs.height){
        score = 0
   }
}

// draw function
function draw(){
    drawPaddle();

    drawBall();
}

// update game function
function update(){
    movePaddle();

    moveBall();

    ballWallCollision();

    ballPaddleCollision();

}
// game loop
function loop(){
    // clear the canvas, start drawing image from (0,0) or the top left corner
    ctx.drawImage(BG_IMG,0,0);
    // code that helps us to draw to canvas
    draw();
    // game logic that helps the image run
    update();
    // renders the next frame
    requestAnimationFrame(loop);
}

loop();

