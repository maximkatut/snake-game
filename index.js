const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const keyUp = 38;
const keyDown = 40;
const keyLeft = 37;
const keyRight = 39;

box = {
  width: 500,
  height: 500
};

canvas.width = box.width;
canvas.height = box.height;
ctx.fillStyle = "green";
ctx.fillRect(0, 0, box.width, box.height);

// Create a snake object
let snake = {
  x: 120,
  y: 200,
  length: 40,
  speed: 3,
  direction: "left",
  goRight: function() {},
  goLeft: function() {},
  goUp: function() {},
  goDown: function() {}
};
// Create a food object
let food = {
  x: 0,
  y: 0
};

snake.goRight = function() {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(snake.x - snake.length, snake.y);
  ctx.lineTo(snake.x, snake.y);
  ctx.stroke();
  if (snake.x > box.width + snake.length) {
    snake.x = 0;
  }
  snake.x += snake.speed;
};

snake.goLeft = function() {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(snake.x - snake.length, snake.y);
  ctx.lineTo(snake.x, snake.y);
  ctx.stroke();
  if (snake.x < 0) {
    snake.x = box.width + snake.length;
  }
  snake.x -= snake.speed;
};

function setDirection() {
  
}

function refreshCanvas() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, box.width, box.height);
}

let goSnake = function() {
  refreshCanvas();
  setDirection();
  window.requestAnimationFrame(goSnake);
};



window.addEventListener("keydown", function(e) {
  if (e.keyCode === keyLeft && snake.direction !== "left") {
    goSnake();
  }
  if (e.keyCode === keyRight && snake.direction !== "right") {
    goSnake();
  }
  if (e.keyCode === keyUp && snake.direction !== "up") {
    goSnake();
  }
});

// function makeFood() {
//   ctx.fillStyle = "red";
//   let x = Math.floor(Math.random() * box.width);
//   let y = Math.floor(Math.random() * box.height);
//   ctx.fillRect(x, y, 10, 10);
// }
