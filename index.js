const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const keyUp = 38;
const keyDown = 40;
const keyLeft = 37;
const keyRight = 39;

box = {
  width: 400,
  height: 400
};

canvas.width = box.width;
canvas.height = box.height;
ctx.fillStyle = "green";
ctx.fillRect(0, 0, box.width, box.height);

// Create a snake object
let snake = {
  head: {
    x: 100,
    y: 100
  },
  body: [
    {
      x: 90,
      y: 100
    },
    {
      x: 80,
      y: 100
    },
    {
      x: 70,
      y: 100
    }
  ],
  x: 0,
  y: 100,
  length: 40,
  speed: 300,
  direction: "right"
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

function drawBody() {
  //draw the head of the snake
  ctx.fillRect(snake.head.x, snake.head.y, 8, 8);
  ctx.save();
  ctx.fillStyle = "red";
  ctx.fillRect(snake.head.x, snake.head.y, 4, 4);
  ctx.restore();
  // draw the rest of the body
  for (let i = 0; i < snake.body.length; i++) {
    ctx.fillRect(snake.body[i].x, snake.body[i].y, 8, 8);
  }
  //delete last coord from array
  snake.body.pop();
  //add new coord in start of array
  snake.body.unshift({ x: snake.head.x, y: snake.head.y });
}

function draw() {
  ctx.fillStyle = "black";
  switch (snake.direction) {
    case "up":
      if (snake.head.y < 0) {
        snake.head.y = box.height - 10;
      }
      drawBody();
      snake.head.y -= 10;
      break;
    case "down":
      if (snake.head.y > box.height - 10) {
        snake.head.y = 0;
      }
      drawBody();
      snake.head.y += 10;
      break;
    case "left":
      if (snake.head.x < 0) {
        snake.head.x = box.width - 10;
      }
      drawBody();
      snake.head.x -= 10;
      break;
    case "right":
      if (snake.head.x > box.width - 10) {
        snake.head.x = 0;
      }
      drawBody();
      snake.head.x += 10;
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
