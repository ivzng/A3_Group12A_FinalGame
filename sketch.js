let blockSize = 80;
let currentLevel = 0;
let gameState = "home"; // "home" | "levelSelect" | "game"
let blocks = [];
let draggingBlock = null;
let gameCleared = false;
let swooshSound;

// Move limit mechanic
let movesLeft = 0;
let outOfMoves = false;

// Target Block Declaring
let bedroomBlock, kitchenBlock, livingRoomBlock;
// Declaring Items
let level1BG;
let pillowV1, pillowV2;
let booksV1, booksV2, booksV3;
let clothesV1, clothesV2, clothesV3;
let dishesV1, dishesV2, dishesV3;
let toasterV1, toasterV2, toasterV3;
let potsV1, potsV2, potsV3;
let carpetV1, carpetV2, carpetV3;
let coffeeTableV1, coffeeTableV2, coffeeTableV3;
let couchV1, couchV2, couchV3;
let homeBG, level2BG, level3BG;

function preload() {
  bedroomBlock = loadImage("./Assets/Images/Bedroom_start.PNG");
  kitchenBlock = loadImage("./Assets/Images/Kitchen_start.PNG");
  livingRoomBlock = loadImage("./Assets/Images/Living_room_start.PNG");
  level1BG = loadImage("./Assets/Images/Level_1_BG.png");
  level2BG = loadImage("./Assets/Images/Level_2_BG.png");
  level3BG = loadImage("./Assets/Images/Level_3_BG.png");
  homeBG = loadImage("./Assets/Images/Homescreen_BG.png");
  pillowV1 = loadImage("./Assets/Images/level_1_pillow_V1.PNG");
  pillowV2 = loadImage("./Assets/Images/level_1_pillow_V2.PNG");
  booksV1 = loadImage("./Assets/Images/level_2_books_V1.PNG");
  booksV2 = loadImage("./Assets/Images/level_2_books_V2.PNG");
  booksV3 = loadImage("./Assets/Images/level_2_books_V3.PNG");
  clothesV1 = loadImage("./Assets/Images/level_3_clothes_V1.PNG");
  clothesV2 = loadImage("./Assets/Images/level_3_clothes_V2.PNG");
  clothesV3 = loadImage("./Assets/Images/level_3_clothes_V3.PNG");
  dishesV1 = loadImage("./Assets/Images/level_4_dishes_V1.PNG");
  dishesV2 = loadImage("./Assets/Images/level_4_dishes_V2.PNG");
  dishesV3 = loadImage("./Assets/Images/level_4_dishes_V3.PNG");
  toasterV1 = loadImage("./Assets/Images/level_5_toaster_V1.PNG");
  toasterV2 = loadImage("./Assets/Images/level_5_toaster_V2.PNG");
  toasterV3 = loadImage("./Assets/Images/level_5_toaster_V3.PNG");
  potsV1 = loadImage("./Assets/Images/level_6_pots_V1.PNG");
  potsV2 = loadImage("./Assets/Images/level_6_pots_V2.PNG");
  potsV3 = loadImage("./Assets/Images/level_6_pots_V3.PNG");
  carpetV1 = loadImage("./Assets/Images/level_7_carpet_V1.PNG");
  carpetV2 = loadImage("./Assets/Images/level_7_carpet_V2.PNG");
  carpetV3 = loadImage("./Assets/Images/level_7_carpet_V3.PNG");
  coffeeTableV1 = loadImage("./Assets/Images/level_8_coffeetable_V1.PNG");
  coffeeTableV2 = loadImage("./Assets/Images/level_8_coffeetable_V2.PNG");
  coffeeTableV3 = loadImage("./Assets/Images/level_8_coffeetable_V3.PNG");
  couchV1 = loadImage("./Assets/Images/level_9_couch_V1.PNG");
  couchV2 = loadImage("./Assets/Images/level_9_couch_V2.PNG");
  couchV3 = loadImage("./Assets/Images/level_9_couch_V3.PNG");
  swooshSound = loadSound("./Assets/Sound/swoosh.mp3");
  swooshSound.setVolume(0.3);
}

function setup() {
  createCanvas(500, windowHeight);
}

function draw() {
  if (gameState === "home") {
    drawHome();
  } else if (gameState === "levelSelect") {
    drawLevelSelect();
  } else if (gameState === "game") {
    runGame();
  }
}

function loadLevel(idx) {
  blocks = [];
  gameCleared = false;
  outOfMoves = false;
  draggingBlock = null;
  let data = levels[idx].blocks;
  for (let b of data) {
    blocks.push(
      new Block(b.x, b.y, b.w, b.h, color(b.col), b.isHoriz, b.isTarget),
    );
  }
  movesLeft = levels[idx].moveLimit;
}

function runGame() {
  noStroke();
  background(40);
  if (currentLevel === 0) {
    image(level1BG, 0, 0, width, height);
  } else if (currentLevel >= 1 && currentLevel <= 3) {
    image(level1BG, 0, 0, width, height);
  } else if (currentLevel >= 4 && currentLevel <= 6) {
    image(level2BG, 0, 0, width, height);
  } else if (currentLevel >= 7) {
    image(level3BG, 0, 0, width, height);
  } else {
    fill(30, 100, 200);
    rect(0, 0, width, height);
  }

  fill(255);
  textAlign(CENTER, CENTER);
  if (currentLevel === 0 && !gameCleared) {
    textStyle(BOLD);
    stroke(223, 102, 149);
    strokeWeight(6);
    textSize(50);
    text("TUTORIAL", width / 2, 85);
    textStyle(NORMAL);
    textSize(14);
    text("Slide the blocks to clear a path.", width / 2, 130);
    text("Drag the yellow block to the exit!", width / 2, 150);
    noStroke();
  } else if (!gameCleared && !outOfMoves) {
    stroke(223, 102, 149);
    strokeWeight(6);
    textStyle(BOLD);
    textSize(50);
    text("LEVEL " + currentLevel, width / 2, 130);
    noStroke();
  }

  push();
  let xOffset = (width - 400) / 2;
  let yOffset = (height - 400) / 2;
  translate(xOffset, yOffset);
  fill(255);
  rect(0, 0, 400, 400);
  drawGrid();
  for (let b of blocks) {
    b.display();
  }
  pop();

  // Draw move counter (skip on tutorial)
  if (currentLevel !== 0 && !gameCleared && !outOfMoves) {
    drawMoveCounter();
  }

  // Win Condition
  if (blocks[0].isTarget && blocks[0].x >= 3) {
    gameCleared = true;
    overlayMessage(
      currentLevel === 0
        ? "TUTORIAL CLEARED!"
        : "LEVEL " + currentLevel + " CLEARED!",
    );
  }

  // Out of moves overlay
  if (outOfMoves && !gameCleared) {
    overlayOutOfMoves();
  }
}

function drawMoveCounter() {
  let counterX = width / 2;
  let counterY = (height - 400) / 2 - 28;

  let fillColor;
  if (movesLeft > 5) {
    fillColor = color(255, 255, 255);
  } else if (movesLeft > 2) {
    fillColor = color(255, 200, 50);
  } else {
    fillColor = color(255, 80, 80);
  }

  noStroke();
  fill(0, 120);
  rect(counterX - 85, counterY - 16, 170, 32, 8);

  fill(fillColor);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(16);
  text("MOVES LEFT: " + movesLeft, counterX, counterY);
  textStyle(NORMAL);
}

function overlayOutOfMoves() {
  fill(0, 180);
  rect(0, 0, width, height);
  fill(255, 80, 80);
  textSize(36);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  stroke(180, 0, 0);
  strokeWeight(4);
  text("OUT OF MOVES!", width / 2, height / 2 - 20);
  noStroke();
  fill(255);
  textStyle(NORMAL);
  textSize(16);
  text("Click to restart the level", width / 2, height / 2 + 25);
}

function drawGrid() {
  stroke(223, 102, 149);
  strokeWeight(3);
  for (let i = 0; i <= 400; i += blockSize) {
    line(i, 0, i, 400);
    line(0, i, 400, i);
  }
  noStroke();
  fill(255, 200, 0, 150);
  rect(400 - 14, 2 * blockSize, 15, blockSize);
}

function overlayMessage(msg) {
  fill(0, 150);
  rect(0, 0, width, height);
  fill(255);
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(msg, width / 2, height / 2);
  textStyle(NORMAL);
  textSize(16);
  text("Click to continue", width / 2, height / 2 + 40);
}

// ── Input handling ──────────────────────────────────────────────────────────

function mousePressed() {
  if (gameState === "home") {
    if (isClicked(tutorialBtn)) {
      currentLevel = 0;
      loadLevel(0);
      gameState = "game";
    } else if (isClicked(levelsBtn)) {
      gameState = "levelSelect";
    }
  } else if (gameState === "levelSelect") {
    if (isClicked(backBtn)) {
      gameState = "home";
      return;
    }
    for (let i = 0; i < levelBtns.length; i++) {
      if (isClicked(levelBtns[i])) {
        currentLevel = i + 1; // levels array: 0=tutorial, 1-9=levels
        loadLevel(currentLevel);
        gameState = "game";
        return;
      }
    }
  } else if (gameState === "game") {
    handleGameMousePressed();
  }
}

function handleGameMousePressed() {
  // If out of moves, restart the level
  if (outOfMoves && !gameCleared) {
    loadLevel(currentLevel);
    return;
  }

  if (gameCleared) {
    // After the last level, go back to level select
    if (currentLevel >= levels.length - 1) {
      gameState = "levelSelect";
    } else {
      currentLevel++;
      loadLevel(currentLevel);
    }
    return;
  }

  let xOffset = (width - 400) / 2;
  let yOffset = (height - 400) / 2;
  for (let b of blocks) {
    if (b.contains(mouseX - xOffset, mouseY - yOffset)) {
      draggingBlock = b;
      draggingBlock.beginDrag();
      return;
    }
  }
}

function mouseDragged() {
  if (draggingBlock && !outOfMoves) {
    let xOffset = (width - 400) / 2;
    let yOffset = (height - 400) / 2;
    draggingBlock.moveTo(
      (mouseX - xOffset) / blockSize,
      (mouseY - yOffset) / blockSize,
    );
  }
}

function mouseReleased() {
  if (draggingBlock) {
    if (draggingBlock.endDrag()) {
      movesLeft--;
      if (movesLeft <= 0) {
        movesLeft = 0;
        outOfMoves = true;
      }
    }
    draggingBlock = null;
  }
}

function touchStarted() {
  mousePressed();
  return false;
}
function touchMoved() {
  mouseDragged();
  return false;
}
function touchEnded() {
  mouseReleased();
  return false;
}
