var CVS, CTX
const GAME_WIDTH = 720,
  GAME_HEIGHT = 480;

const CENTER_X = GAME_WIDTH / 2,
  CENTER_Y = GAME_HEIGHT / 2;


const racket = {
  x: CENTER_X,
  y: GAME_HEIGHT - 30,
  width: 50,
  height: 10,
  vx: 0,
  speed: 4,
}

const ball = {
  x: CENTER_X,
  y: GAME_HEIGHT - 40,
  radius: 5,
  vx: 0.5,
  vy: -0.5,
  speed: 4,
}

let bricks = []

function start() {
  CVS = document.getElementById('canvas')
  console.log('canvas is', CVS)

  CTX = CVS.getContext('2d')
  console.log('context is', CTX)

  generateBricks()

  requestAnimationFrame(gameLoop)
  // ou alors: setInterval(gameLoop, 16)

  window.addEventListener('keydown', ((event) => {
    console.log(event.keyCode)
    // 37 = " ← " (left arrow key)
    switch (event.keyCode) {
      case 37: // left
        racket.vx = -1
        break
      case 39: // right
        racket.vx = 1
        break
    }

    window.addEventListener('keyup', ((event) => {
      switch (event.keyCode) {
        case 37:
        case 39:
          racket.vx = 0
          break

      }
    }))
    // 39 = " → " (right arrow key)
  }))

}

window.onload = start

function gameLoop() {
  requestAnimationFrame(gameLoop)
  CTX.fillStyle = 'teal'
  CTX.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

  // moving the ball around the game screen
  ball.x += ball.vx * ball.speed
  ball.y += ball.vy * ball.speed

  // drawing the ball
  CTX.fillStyle = 'goldenrod'
  CTX.strokeStyle = 'red'
  CTX.beginPath();
  CTX.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  CTX.fill();
  CTX.stroke();

  // drawing the racket
  CTX.fillStyle = 'white'
  // CTX.strokeStyle = 'red'
  CTX.fillRect(racket.x, racket.y, racket.width, racket.height)

  // moving the racket based on the inputs
  // racket.x += racket.vx * racket.speed
  const nextRacketX = racket.x + racket.vx * racket.speed
  if (nextRacketX + racket.width < GAME_WIDTH && nextRacketX > 0) {
    racket.x = nextRacketX
  }

  // drawing the bricks
  CTX.fillStyle = 'brown';
  for (var i = 0; i < bricks.length; ++i) {
    let brick = bricks[i]
    CTX.fillRect(brick.x, brick.y, BRICK_WIDTH, BRICK_HEIGHT);

    // calculating the collision between ball and brick
    if (ball.x + ball.radius > brick.x &&
      ball.x - ball.radius < brick.x + BRICK_WIDTH &&
      ball.y + ball.radius > brick.y &&
      ball.y - ball.radius < brick.y + BRICK_HEIGHT) {
      bricks.splice(i, 1)

      // calculating the bounce
      var hasBounced = false;
      if (ball.y > brick.y && ball.y < brick.y + BRICK_HEIGHT) {
        if (ball.x < brick.x) {
          ball.vx = -1;
          hasBounced = true;
        } else if (ball.x > brick.x) {
          ball.vx = 1;
          hasBounced = true;
        }
      }
      if (ball.x > brick.x && ball.x < brick.x + BRICK_WIDTH) {
        if (ball.y < brick.y) {
          ball.vy = -1;
          hasBounced = true;
        } else if (ball.y > brick.y) {
          ball.vy = 1;
          hasBounced = true;
        }
      }

      if (!hasBounced) {
        console.log('Bug is a feature');
        ball.vy = -ball.vy;
        ball.vx = -ball.vx;
      }


    }
  }

  // calculating the collision with the ball
  switch (true) {
    case ball.x + ball.radius >= GAME_WIDTH || ball.x - ball.radius <= 0:
      return ball.vx = -ball.vx
    case ball.y - ball.radius <= 0 || ball.y + ball.radius >= GAME_HEIGHT:
      return ball.vy = -ball.vy
  }

  // if (ball.x + ball.radius >= GAME_WIDTH || ball.x - ball.radius <= 0) {
  //   ball.vx = -ball.vx
  // }
  // if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= GAME_HEIGHT) {
  //   ball.vy = -ball.vy
  // }

  // calculating the collision with the racket
  if (ball.x > racket.x &&
    ball.x < racket.x + racket.width &&
    ball.y + ball.radius > racket.y &&
    ball.y - ball.radius < racket.y) {
    ball.vy = -ball.vy
  }

}

const BRICK_WIDTH = 60,
  BRICK_HEIGHT = 20;

const START_BRICKS_X = 10,
  START_BRICKS_Y = 20
BRICKS_PADDING = 5;

const N_ROWS = 2
const N_BRICKS = (GAME_WIDTH - START_BRICKS_X * 2) / (BRICK_WIDTH + BRICKS_PADDING * 2)

function generateBricks() {
  // for (let i = 0; i < N_BRICKS; ++i) {
  //   let brick = {
  //     x: START_BRICKS_X + BRICKS_PADDING + (i * (BRICK_WIDTH + BRICKS_PADDING * 2)),
  //     y: START_BRICKS_Y
  //   }
  //   bricks.push(brick)
  // }


  for (var y = 0; y < LEVEL.length; ++y) {
    for (var x = 0; x < LEVEL[y].length; ++x) {
      if (LEVEL[y][x] === 0) {
        continue;
      }
      var brick = {
        x: START_BRICKS_X + BRICKS_PADDING + (x * (BRICK_WIDTH + BRICKS_PADDING * 2)),
        y: START_BRICKS_Y + BRICKS_PADDING + (y * (BRICK_HEIGHT + BRICKS_PADDING * 2)),
      };
      bricks.push(brick);
    }
  }
}



const LEVEL = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
];


// bonus dans les briques
// raquette plus longue
// multiball
// raquette plus courtes
// raquette plus rapide

// gameover 
// systeme de vie(quand vie = 0 = gameover)
// scoring (+100pts par dégat sur une brique, +200 quand on casse une brique,
// et combo sur un enchainemenet de brique)