// home.js

// Home screen buttons
let tutorialBtn = { x: 0, y: 0, w: 220, h: 55 };
let levelsBtn   = { x: 0, y: 0, w: 220, h: 55 };

// Level select buttons (9 levels)
let levelBtns = [];
for (let i = 0; i < 9; i++) {
  levelBtns.push({ x: 0, y: 0, w: 116, h: 100 });
}

// Back button
let backBtn = { x: 0, y: 0, w: 110, h: 36 };

function drawHome() {
  if (homeBG) {
    image(homeBG, 0, 0, width, height);
  } else {
    background(0);
  }

  let centerX = width / 2;
  let startY  = height * 0.5;

  tutorialBtn.x = centerX - tutorialBtn.w / 2;
  tutorialBtn.y = startY;

  levelsBtn.x = centerX - levelsBtn.w / 2;
  levelsBtn.y = startY + tutorialBtn.h + 24;

  textAlign(CENTER, CENTER);
  drawButton(tutorialBtn, "TUTORIAL", 20);
  drawButton(levelsBtn,   "LEVELS",   20);
}

function drawLevelSelect() {
  // Background
  if (homeBG) {
    image(homeBG, 0, 0, width, height);
  } else {
    background(0);
  }

  // Warm semi-transparent overlay
  noStroke();
  fill(30, 18, 5, 170);
  rect(0, 0, width, height);

  // Panel
  let panelW = 420;
  let panelH = height * 0.80;
  let panelX = (width - panelW) / 2;
  let panelY = height * 0.08;
  fill(45, 26, 8, 220);
  stroke(210, 145, 60);
  strokeWeight(2.5);
  rect(panelX, panelY, panelW, panelH, 18);
  noStroke();

  // Back button — centred at top of panel
  backBtn.x = width / 2 - backBtn.w / 2;
  backBtn.y = panelY + 18;
  drawBackButton(backBtn, "← BACK");

  // Title — clear breathing room below back button
  let titleY = backBtn.y + backBtn.h + 36;
  fill(255, 220, 120);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  stroke(180, 100, 20);
  strokeWeight(4);
  textSize(28);
  text("SELECT A LEVEL", width / 2, titleY);
  noStroke();
  textStyle(NORMAL);

  // Thin divider under title
  stroke(210, 145, 60, 120);
  strokeWeight(1);
  line(panelX + 24, titleY + 22, panelX + panelW - 24, titleY + 22);
  noStroke();

  // 3x3 grid — evenly fills remaining panel space
  let cols  = 3;
  let btnW  = 116;
  let btnH  = 100;
  let padX  = 16;
  let gridW = cols * btnW + (cols - 1) * padX;
  let startX        = (width - gridW) / 2;
  let topOfGrid     = titleY + 44;
  let bottomOfPanel = panelY + panelH - 24;
  let available     = bottomOfPanel - topOfGrid;
  let padY          = (available - 3 * btnH) / 4;
  let startY        = topOfGrid + padY;

  // Plain "Level N" labels — clear and self-explanatory
  let levelLabels = [
    "Level 1",
    "Level 2",
    "Level 3",
    "Level 4",
    "Level 5",
    "Level 6",
    "Level 7",
    "Level 8",
    "Level 9",
  ];

  for (let i = 0; i < 9; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    let bx  = startX + col * (btnW + padX);
    let by  = startY + row * (btnH + padY);

    levelBtns[i].x = bx;
    levelBtns[i].y = by;
    levelBtns[i].w = btnW;
    levelBtns[i].h = btnH;

    drawLevelButton(levelBtns[i], levelLabels[i]);
  }
}

function drawLevelButton(btn, label) {
  let hovering =
    mouseX > btn.x && mouseX < btn.x + btn.w &&
    mouseY > btn.y && mouseY < btn.y + btn.h;

  stroke(210, 145, 60);
  strokeWeight(hovering ? 2.5 : 1.5);
  fill(hovering ? color(160, 90, 20, 240) : color(80, 45, 12, 210));
  rect(btn.x, btn.y, btn.w, btn.h, 12);

  noStroke();
  fill(255, 235, 180);
  textSize(15);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(label, btn.x + btn.w / 2, btn.y + btn.h / 2);
  textStyle(NORMAL);
}

function drawBackButton(btn, label) {
  let hovering =
    mouseX > btn.x && mouseX < btn.x + btn.w &&
    mouseY > btn.y && mouseY < btn.y + btn.h;

  stroke(210, 145, 60);
  strokeWeight(1.5);
  fill(hovering ? color(160, 90, 20, 240) : color(80, 45, 12, 210));
  rect(btn.x, btn.y, btn.w, btn.h, 8);

  noStroke();
  fill(255, 235, 180);
  textSize(13);
  textAlign(CENTER, CENTER);
  text(label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

function drawButton(btn, label, tSize) {
  let hovering =
    mouseX > btn.x && mouseX < btn.x + btn.w &&
    mouseY > btn.y && mouseY < btn.y + btn.h;

  stroke(255);
  strokeWeight(2);
  fill(hovering ? 80 : 40);
  rect(btn.x, btn.y, btn.w, btn.h, 10);

  noStroke();
  fill(255);
  textSize(tSize);
  textAlign(CENTER, CENTER);
  text(label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

function isClicked(btn) {
  return (
    mouseX > btn.x && mouseX < btn.x + btn.w &&
    mouseY > btn.y && mouseY < btn.y + btn.h
  );
}