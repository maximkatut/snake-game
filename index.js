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
  x: [120],
  y: [200],
  length: 40,
  speed: 300,
  direction: "left"
};
// Create a food object
let food = {
  x: 0,
  y: 0
};

function init() {
  snake.setDirection();
  game();
}

function game() {
  refreshCanvas();
  draw();
  window.setTimeout(game, snake.speed);
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(snake.x, snake.y, 10, 10);
  switch (snake.direction) {
    case "up":
      if (snake.y < 0) {
        snake.y[0] = box.height;
      }
      snake.y[0] -= 10;
      break;
    case "down":
      if (snake.y > box.height) {
        snake.y[0] = 0;
      }
      snake.y[0] += 10;
      break;
    case "left":
      if (snake.x < 0) {
        snake.x[0] = box.width;
      }
      snake.x[0] -= 10;
      break;
    case "right":
      if (snake.x > box.width) {
        snake.x[0] = 0;
      }
      snake.x[0] += 10;
      break;
  }
}

snake.setDirection = function() {
  document.addEventListener("keydown", function(e) {
    let key = e.keyCode;
    let keysToDirection = {
      38: "up",
      40: "down",
      37: "left",
      39: "right"
    };
    let direction = keysToDirection[key];
    if (direction) {
      snake.direction = direction;
      console.log(snake.direction);
    }
  });
};

function refreshCanvas() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, box.width, box.height);
}

init();

// function makeFood() {
//   ctx.fillStyle = "red";
//   let x = Math.floor(Math.random() * box.width);
//   let y = Math.floor(Math.random() * box.height);
//   ctx.fillRect(x, y, 10, 10);
// }
