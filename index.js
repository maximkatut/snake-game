// (function() {
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let score = document.querySelector(".score");
let level = document.querySelector(".level");
let menu = document.querySelector(".menu");
menu.style.display = "none";

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
    x: this.x,
    y: this.y
  },
  body: this.body,
  length: this.length,
  speed: this.speed,
  direction: this.direction,
  step: this.step,
  score: this.score,
  level: this.level
};

function newGame() {
  snake.head.x = 100;
  snake.head.y = 100;
  snake.length = 40;
  snake.speed = 200;
  snake.direction = "right";
  snake.step = 10;
  snake.score = 0;
  snake.level = 1;
  snake.body = [];
  for (let i = 0; i < 3; i++) {
    snake.body.push({ x: 90 - 10 * i, y: 100 });
  }
}

// Create a food object
let food = {
  x: this.x,
  y: this.y
};

let game_switch = "off";

function init() {
  newGame();
  setFood();
  gameLoop();
}

function gameLoop() {
  setDirection();
  refreshCanvas();
  updateStatusOfGame();
  eatenFood();
  window.setTimeout(gameLoop, snake.speed);
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
  //add new coord in the beginning of array
  snake.body.unshift({ x: snake.head.x, y: snake.head.y });
}

function draw() {
  ctx.fillStyle = "black";
  switch (snake.direction) {
    case "up":
      drawBody();
      if (snake.head.y === 0) {
        snake.head.y = box.height;
        game_switch = "over";
      }
      snake.head.y -= snake.step;
      break;
    case "down":
      drawBody();
      if (snake.head.y === box.height - snake.step) {
        snake.head.y = -snake.step;
        game_switch = "over";
      }
      snake.head.y += snake.step;
      break;
    case "left":
      drawBody();
      if (snake.head.x === 0) {
        snake.head.x = box.width;
        game_switch = "over";
      }
      snake.head.x -= snake.step;
      break;
    case "right":
      drawBody();
      if (snake.head.x === box.width - snake.step) {
        snake.head.x = -snake.step;
        game_switch = "over";
      }
      snake.head.x += snake.step;
      break;
  }
}

function HandlerArrowsToDirection(e) {
  let key = e.keyCode;
  let keysToDirection = {
    38: "up",
    40: "down",
    37: "left",
    39: "right"
  };
  let new_direction = keysToDirection[key];
  if (new_direction) {
    snake.direction = new_direction;
  }
}

function setDirection() {
  window.addEventListener("keydown", HandlerArrowsToDirection);
}

// set new coord to food
function setFood() {
  food.x = Math.floor((Math.random() * box.width) / 10) * 10;
  food.y = Math.floor((Math.random() * box.width) / 10) * 10;
}

// increse score and set new apple if it was eaten
function eatenFood() {
  if (snake.head.x === food.x && snake.head.y === food.y) {
    snake.score++;
    // if score more than 10 go to next level and increase the speed
    if (snake.score === 10) {
      snake.level++;
      snake.speed -= 25;
      snake.score = 0;
      level.innerText = "Level: " + snake.level;
      snake.body = snake.body.slice(0, 2);
    }
    score.innerText = "Score: " + snake.score;
    snake.body.push({
      x: snake.body[snake.body.length - 1].x,
      y: snake.body[snake.body.length - 1].y
    });
    setFood();
  }
}

function resetGameMessage(message, x) {
  refreshCanvas();
  newGame();
  level.innerText = "Level: 1";
  score.innerText = "Score: 0";
  ctx.fillStyle = "black";
  ctx.font = "48px VT323";
  ctx.fillText(message, x, 180);
  ctx.fillText("Press SPACE to begin", 10, 250);
}

function HandlerSpaceToStart(e) {
  if (e.keyCode === 32) {
    game_switch = "on";
  }
}

//handler for settings menu
function HandlerMtoMenu(e) {
  if (menu.style.display === "none") {
    if (e.keyCode === 77) {
      game_switch = "menu";
    }
  } else {
    if (e.keyCode === 77) {
      game_switch = "on";
    }
  }
}

// game screen(start, win, gameover, play), depends on game_switch
function updateStatusOfGame() {
  switch (game_switch) {
    case "off":
      ctx.fillStyle = "black";
      ctx.font = "48px VT323";
      ctx.fillText("Press SPACE to begin", 10, 200);
      window.addEventListener("keydown", HandlerSpaceToStart);
      window.addEventListener("keydown", HandlerMtoMenu);
      break;

    case "on":
      draw();
      window.removeEventListener("keydown", HandlerSpaceToStart);
      if (snake.level === 10) {
        game_switch = "win";
      }
      menu.style.display = "none";
      break;

    case "win":
      resetGameMessage("You WIN!", 120);
      window.addEventListener("keydown", HandlerSpaceToStart);
      break;

    case "over":
      resetGameMessage("GAME OVER", 120);
      window.addEventListener("keydown", HandlerSpaceToStart);
      break;

    case "menu":
      window.removeEventListener("keydown", HandlerSpaceToStart);
      menu.style.display = "block";
      break;
  }
}

function refreshCanvas() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, box.width, box.height);
}

init();
// })();
