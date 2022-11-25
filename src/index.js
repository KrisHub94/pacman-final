const PACMAN_EL = document.querySelector("#pacman");
const gameField = document.querySelector("#game").getClientRects()[0];

const WIN_SCORE = 465;
const img = document.getElementById("imgPac");
let velocityX = 1;
let velocityY = 0;
let positionX = 100;
let positionY = 100;
let enterRight;
let enterLeft;
let imageCount = 0;
let score = 0;
let highscore = localStorage.getItem("highscore");
const SCOREFIELD = document.createElement("span");
SCOREFIELD.innerText = `Score: ${score}`;
SCOREFIELD.classList.add("score");
document.body.appendChild(SCOREFIELD);

const BLINKY_PICS = [
  "../assets/images/ghosts/ghost-blinky-right.png",
  "../assets/images/ghosts/ghost-blinky-down.png",
  "../assets/images/ghosts/ghost-blinky-left.png",
  "../assets/images/ghosts/ghost-blinky-up.png",
];
const CLYDE_PICS = [
  "../assets/images/ghosts/ghost-clyde-right.png",
  "../assets/images/ghosts/ghost-clyde-down.png",
  "../assets/images/ghosts/ghost-clyde-left.png",
  "../assets/images/ghosts/ghost-clyde-up.png",
];
const INKY_PICS = [
  "../assets/images/ghosts/ghost-inky-right.png",
  "../assets/images/ghosts/ghost-inky-down.png",
  "../assets/images/ghosts/ghost-inky-left.png",
  "../assets/images/ghosts/ghost-inky-up.png",
];

const highscoreField = document.createElement("span");
highscoreField.innerText = `Highscore: ${localStorage.getItem("highscore")}`;
highscoreField.classList.add("highscore");
document.body.appendChild(highscoreField);

class Ghost {
  constructor(element, x, y, directionX, directionY) {
    this.element = element;
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
  }

  followPacMan() {
    const xDifference =
      this.element.getClientRects()[0].x - PACMAN_EL.getClientRects()[0].x;
    const yDifference =
      this.element.getClientRects()[0].y - PACMAN_EL.getClientRects()[0].y;
    if (Math.abs(xDifference) > Math.abs(yDifference)) {
      this.directionY = 0;
      if (xDifference > 0) {
        this.directionX = -2;
      } else if (xDifference < 0) {
        this.directionX = 2;
      }
    } else if (Math.abs(xDifference) < Math.abs(yDifference)) {
      this.directionX = 0;
      if (yDifference > 0) {
        this.directionY = -2;
      } else if (yDifference < 0) {
        this.directionY = 2;
      }
    }
  }
  changeImage(images) {
    let i;
    for (i in images) {
      this.element.style.backgroundImage = `url("${images[i]}")`;
      console.log(images.length);
    }
    if (i === images.length) {
      i = 0;
      console.log("yoo");
    }
  }
  randomMove() {
    let randomNumber = Math.floor(Math.random() * 4);
    switch (randomNumber) {
      case 0:
        this.directionX = 0;
        this.directionY = -1;
        break;
      case 1:
        this.directionX = -1;
        this.directionY = 0;
        break;
      case 2:
        this.directionX = 0;
        this.directionY = 1;
        break;
      case 3:
        this.directionX = 1;
        this.directionY = 0;
        break;
    }
  }

  moveGhost() {
    this.x += this.directionX;
    this.y += this.y;
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
  }
}

let clyde = new Ghost(document.getElementById("clyde"), 400, 200, 40, 0);
let inky = new Ghost(document.getElementById("inky"), 400, 200, 50, 0);
let blinky = new Ghost(document.querySelector("#blinky"), 400, 200, 60, 0);
blinky.moveGhost();
blinky.randomMove();
blinky.changeImage(BLINKY_PICS);
clyde.moveGhost();
clyde.randomMove();
clyde.changeImage(CLYDE_PICS);
inky.moveGhost();
inky.randomMove();
inky.changeImage(INKY_PICS);
let pacmanImages = [
  "./assets/images/pacman/pacman-0.png",
  "./assets/images/pacman/pacman-1.png",
  "./assets/images/pacman/pacman-2.png",
];

document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowDown":
      velocityY = 4;
      velocityX = 0;
      PACMAN_EL.style.transform = "rotate(90deg)";
      break;
    case "ArrowUp":
      velocityY = -4;
      velocityX = 0;
      PACMAN_EL.style.transform = "rotate(-90deg)";
      break;
    case "ArrowLeft":
      velocityX = -4;
      velocityY = 0;
      PACMAN_EL.style.transform = "rotate(180deg)";
      break;
    case "ArrowRight":
      velocityX = 4;
      velocityY = 0;
      PACMAN_EL.style.transform = "rotate(0deg)";
      break;
  }
});

function checkWallCollision(wall) {
  if (
    PACMAN_EL.getClientRects()[0].x <
      wall.getClientRects()[0].x + wall.getClientRects()[0].width &&
    PACMAN_EL.getClientRects()[0].x + PACMAN_EL.getClientRects()[0].width >
      wall.getClientRects()[0].x &&
    PACMAN_EL.getClientRects()[0].y <
      wall.getClientRects()[0].y + wall.getClientRects()[0].height &&
    PACMAN_EL.getClientRects()[0].y + PACMAN_EL.getClientRects()[0].height >
      wall.getClientRects()[0].y
  ) {
    if (velocityX > 0) {
      positionX -= 4;
      PACMAN_EL.style.left = positionX + "px";
    } else if (velocityX < 0) {
      positionX += 4;
      PACMAN_EL.style.left = positionX + "px";
    }
    if (velocityY > 0) {
      positionY -= 4;
      PACMAN_EL.style.top = positionY + "px";
    } else if (velocityY < 0) {
      positionY += 4;
      PACMAN_EL.style.top = positionY + "px";
    }
  }
}
function checkExitColl(exit) {
  if (
    PACMAN_EL.getClientRects()[0].x <
      exit.getClientRects()[0].x + exit.getClientRects()[0].width &&
    PACMAN_EL.getClientRects()[0].x + PACMAN_EL.getClientRects()[0].width >
      exit.getClientRects()[0].x &&
    PACMAN_EL.getClientRects()[0].y <
      exit.getClientRects()[0].y + exit.getClientRects()[0].height &&
    PACMAN_EL.getClientRects()[0].y + PACMAN_EL.getClientRects()[0].height >
      exit.getClientRects()[0].y
  ) {
    if (exit.classList.contains("left-exit")) {
      positionX = enterRight.getClientRects()[0].x - 550;
    }
    if (exit.classList.contains("right-exit")) {
      positionX = enterLeft.getClientRects()[0].x - 480;
    }
  }
}

function checkDots() {
  for (i in squares) {
    const pacDot = squares[i].querySelector("img.pac-dot");

    if (pacDot) {
      if (
        PACMAN_EL.getClientRects()[0].x <
          pacDot.getClientRects()[0].x + pacDot.getClientRects()[0].width &&
        PACMAN_EL.getClientRects()[0].x + PACMAN_EL.getClientRects()[0].width >
          pacDot.getClientRects()[0].x &&
        PACMAN_EL.getClientRects()[0].y <
          pacDot.getClientRects()[0].y + pacDot.getClientRects()[0].height &&
        PACMAN_EL.getClientRects()[0].y + PACMAN_EL.getClientRects()[0].height >
          pacDot.getClientRects()[0].y
      ) {
        pacDot.classList.remove("pac-dot");
        score++;
        SCOREFIELD.innerText = `Score: ${score}`;
      }
    }
  }
}
function checkPowerDots(pacPowerDot) {
  if (
    PACMAN_EL.getClientRects()[0].x <
      pacPowerDot.getClientRects()[0].x +
        pacPowerDot.getClientRects()[0].width &&
    PACMAN_EL.getClientRects()[0].x + PACMAN_EL.getClientRects()[0].width >
      pacPowerDot.getClientRects()[0].x &&
    PACMAN_EL.getClientRects()[0].y <
      pacPowerDot.getClientRects()[0].y +
        pacPowerDot.getClientRects()[0].height &&
    PACMAN_EL.getClientRects()[0].y + PACMAN_EL.getClientRects()[0].height >
      pacPowerDot.getClientRects()[0].y
  ) {
    pacPowerDot.classList.remove("power-pellet");
    score += 10;
    SCOREFIELD.innerText = `Score: ${score}`;
  }
}

function checkWin() {
  if (score === WIN_SCORE) {
    alert("You Won");
    velocityX = 0;
    velocityY = 0;
    document.removeEventListener("keydown");
  }
  if (score > highscore) {
    localStorage.setItem("highscore", score);
  }
}

function movePacMan() {
  positionX += velocityX;
  PACMAN_EL.style.left = positionX + "px";
  positionY += velocityY;
  PACMAN_EL.style.top = positionY + "px";
}
function animate() {
  PACMAN_EL.style.backgroundImage = `url("${pacmanImages[imageCount]}")`;

  imageCount++;
  if (pacmanImages.length === imageCount) {
    imageCount = 0;
  }
  return imageCount;
}

function update() {
  movePacMan();
  for (i in squares) {
    if (squares[i].classList.contains("wall")) {
      checkWallCollision(squares[i]);
    } else if (
      squares[i].classList.contains("left-exit") ||
      squares[i].classList.contains("right-exit")
    ) {
      checkExitColl(squares[i]);
    } else if (squares[i].classList.contains("right-enter")) {
      enterRight = squares[i];
    } else if (squares[i].classList.contains("left-enter")) {
      enterLeft = squares[i];
    } else if (squares[i].classList.contains("power-pellet")) {
      checkPowerDots(squares[i]);
    }
  }
  checkDots();
}

setInterval(checkWin, 100);
setInterval(animate, 100);
setInterval(update, 16.666);
