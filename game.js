// select canvas element from index.html
const cvs = document.getElementById("breakout");

// to draw on the canvas
const ctx = cvs.getContext("2d");

// add canvas border
 // ctx.style.border = "1px solid #0ff";

// game variables and constants
// make width more visible
ctx.lineWidth = 3;
const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;

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
    ctx.fillStyle = "2e3548";
    // know what to fill in
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    // color surrounding paddle
    ctx.strokeStyle = "#ffcd05";
    // know what to fill in
    ctx.strokeRect(paddle.x,paddle.y,paddle.width,paddle.height);
}

// draw function
function draw(){
    drawPaddle();
}

// update game function
function update(){

}

function loop(){

    draw();

    update();

    requestAnimationFrame(loop);
}

loop();
