const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let score = document.querySelector(".score");
let level = document.querySelector(".level");

const box = {
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
  length: 40,
  speed: 200,
  direction: "right",
  step: 10,
  score: 0,
  level: 1
};
// Create a food object
let food = {
  x: this.x,
  y: this.y
};
let game_switch = true;

function init() {
  game();
}

function game() {
  snake.setDirection();
  refreshCanvas();
  youWin();
  playGame(game_switch);
  eatenFood();
  window.setTimeout(game, snake.speed);
}

function drawBody() {
  //draw food
  ctx.fillRect(food.x, food.y, snake.step * 0.85, snake.step * 0.85);
  //draw the head of the snake
  ctx.fillRect(
    snake.head.x,
    snake.head.y,
    snake.step * 0.85,
    snake.step * 0.85
  );
  ctx.save();
  ctx.fillStyle = "red";
  ctx.fillRect(
    snake.head.x * 1.02,
    snake.head.y,
    snake.step * 0.25,
    snake.step * 0.25
  );
  ctx.restore();
  // draw the rest of the body
  for (let i = 0; i < snake.body.length; i++) {
    ctx.fillRect(
      snake.body[i].x,
      snake.body[i].y,
      snake.step * 0.85,
      snake.step * 0.85
    );
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
      drawBody();
      if (snake.head.y === 0) {
        snake.head.y = box.height;
      }
      snake.head.y -= snake.step;
      break;
    case "down":
      drawBody();
      if (snake.head.y === box.height - snake.step) {
        snake.head.y = -snake.step;
      }
      snake.head.y += snake.step;
      break;
    case "left":
      drawBody();
      if (snake.head.x === 0) {
        snake.head.x = box.width;
      }
      snake.head.x -= snake.step;
      break;
    case "right":
      drawBody();
      if (snake.head.x === box.width - snake.step) {
        snake.head.x = -snake.step;
      }
      snake.head.x += snake.step;
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

food.setFood = function() {
  this.x = Math.floor((Math.random() * box.width) / 10) * 10;
  this.y = Math.floor((Math.random() * box.width) / 10) * 10;
};

food.setFood();

function eatenFood() {
  if (snake.head.x === food.x && snake.head.y === food.y) {
    snake.score++;
    setNextLevel();
    score.innerText = "Score: " + snake.score;
    snake.body.push({
      x: snake.body[snake.body.length - 1].x,
      y: snake.body[snake.body.length - 1].y
    });
    food.setFood();
  }
}

// if score more than 10 go to next level and increase the speed
function setNextLevel() {
  if (snake.score === 10) {
    snake.level++;
    snake.speed -= 25;
    snake.score = 0;
    level.innerText = "Level: " + snake.level;
    snake.body = snake.body.slice(0, 2);
  }
}

// after level 10 gamer win
function youWin() {
  if (snake.level === 10) {
    refreshCanvas();
    game_switch = false;
    ctx.fillStyle = "black";
    ctx.font = "48px VT323";
    ctx.fillText("You WIN!", 120, 200);
  }
}

function playGame(game_switch) {
  if (game_switch) {
    draw();
  }
}

function refreshCanvas() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, box.width, box.height);
}

init();
