class Block {
  constructor(x, y, w, h, col, isHorizontal, isTarget) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = col;
    this.isHorizontal = isHorizontal;
    this.isTarget = isTarget;
    this.cooldownUntil = 0;
    this.imgIndex = floor(random(3));

    // smooth visual movement
    this.drawX = x;
    this.drawY = y;
    this.targetDrawX = x;
    this.targetDrawY = y;

    // Track position at drag start for move counting
    this.dragStartX = x;
    this.dragStartY = y;
  }

  // Called when the player starts dragging this block
  beginDrag() {
    this.dragStartX = this.x;
    this.dragStartY = this.y;
  }

  // Called when the player releases this block — returns true if it moved
  endDrag() {
    if (currentLevel === 0) return false; // No counting on tutorial
    const moved = this.x !== this.dragStartX || this.y !== this.dragStartY;
    return moved;
  }

  display() {
    this.drawX = lerp(this.drawX, this.targetDrawX, 0.2);
    this.drawY = lerp(this.drawY, this.targetDrawY, 0.2);

    let imgToDraw = null;

    if (this.isTarget) {
      if (currentLevel >= 0 && currentLevel <= 3) {
        imgToDraw = bedroomBlock;
      } else if (currentLevel >= 4 && currentLevel <= 6) {
        imgToDraw = kitchenBlock;
      } else if (currentLevel >= 7 && currentLevel <= 9) {
        imgToDraw = livingRoomBlock;
      }
    } else {
      if (currentLevel === 0 || currentLevel === 1) {
        imgToDraw = this.isHorizontal ? pillowV2 : pillowV1;
      } else if (currentLevel === 2) {
        let versions = [booksV1, booksV2, booksV3];
        imgToDraw = versions[this.imgIndex];
      } else if (currentLevel === 3) {
        let versions = [clothesV1, clothesV2, clothesV3];
        imgToDraw = versions[this.imgIndex];
      } else if (currentLevel === 4) {
        let versions = [dishesV1, dishesV2, dishesV3];
        imgToDraw = versions[this.imgIndex];
      } else if (currentLevel === 5) {
        let versions = [toasterV1, toasterV2, toasterV3];
        imgToDraw = versions[this.imgIndex];
      } else if (currentLevel === 6) {
        let versions = [potsV1, potsV2, potsV3];
        imgToDraw = versions[this.imgIndex];
      } else if (currentLevel === 7) {
        let versions = [carpetV1, carpetV2, carpetV3];
        imgToDraw = versions[this.imgIndex];
      } else if (currentLevel === 8) {
        let versions = [coffeeTableV1, coffeeTableV2, coffeeTableV3];
        imgToDraw = versions[this.imgIndex];
      } else if (currentLevel === 9) {
        let versions = [couchV1, couchV2, couchV3];
        imgToDraw = versions[this.imgIndex];
      }
    }

    if (imgToDraw) {
      if (!this.isTarget && !this.isHorizontal) {
        push();
        let centerX = this.drawX * blockSize + (this.w * blockSize) / 2;
        let centerY = this.drawY * blockSize + (this.h * blockSize) / 2;
        translate(centerX, centerY);
        rotate(HALF_PI);
        imageMode(CENTER);
        image(
          imgToDraw,
          0,
          0,
          this.h * blockSize - 10,
          this.w * blockSize - 10,
        );
        pop();
        imageMode(CORNER);
      } else {
        image(
          imgToDraw,
          this.drawX * blockSize + 5,
          this.drawY * blockSize + 5,
          this.w * blockSize - 10,
          this.h * blockSize - 10,
        );
      }
    } else {
      fill(this.col);
      noStroke();
      rect(
        this.drawX * blockSize + 5,
        this.drawY * blockSize + 5,
        this.w * blockSize - 10,
        this.h * blockSize - 10,
        5,
      );
    }
  }

  contains(mx, my) {
    return (
      mx > this.x * blockSize &&
      mx < (this.x + this.w) * blockSize &&
      my > this.y * blockSize &&
      my < (this.y + this.h) * blockSize
    );
  }

  moveTo(nx, ny) {
    if (frameCount < this.cooldownUntil) return;

    let hesProb = 0;

    if (currentLevel === 2) hesProb = 0.006;
    else if (currentLevel === 3) hesProb = 0.012;
    else if (currentLevel === 6) hesProb = 0.02;
    else if (currentLevel === 7) hesProb = 0.03;
    else if (currentLevel === 8) hesProb = 0.04;
    else if (currentLevel === 9) hesProb = 0.05;

    if (hesProb > 0 && random(1) < hesProb) {
      this.cooldownUntil = frameCount + 10;
      return;
    }

    let moved = false;

    if (this.isHorizontal) {
      if (nx > this.x && !this.collides(this.x + 1, this.y)) {
        if (this.x + this.w < 5) {
          this.x += 1;
          moved = true;
        }
      } else if (nx < this.x && !this.collides(this.x - 1, this.y)) {
        if (this.x > 0) {
          this.x -= 1;
          moved = true;
        }
      }
    } else {
      if (ny > this.y && !this.collides(this.x, this.y + 1)) {
        if (this.y + this.h < 5) {
          this.y += 1;
          moved = true;
        }
      } else if (ny < this.y && !this.collides(this.x, this.y - 1)) {
        if (this.y > 0) {
          this.y -= 1;
          moved = true;
        }
      }
    }

    if (moved) {
      if (swooshSound && !swooshSound.isPlaying()) {
        swooshSound.play();
      }

      this.targetDrawX = this.x;
      this.targetDrawY = this.y;

      if (currentLevel === 2) this.cooldownUntil = frameCount + 12;
      else if (currentLevel === 3) this.cooldownUntil = frameCount + 18;
      else if (currentLevel === 4) this.cooldownUntil = frameCount + 24;
      else if (currentLevel === 5) this.cooldownUntil = frameCount + 30;
      else if (currentLevel === 6) this.cooldownUntil = frameCount + 36;
      else if (currentLevel === 7) this.cooldownUntil = frameCount + 42;
      else if (currentLevel === 8) this.cooldownUntil = frameCount + 48;
      else if (currentLevel === 9) this.cooldownUntil = frameCount + 54;
    }
  }

  collides(tx, ty) {
    for (let other of blocks) {
      if (other === this) continue;
      if (
        tx < other.x + other.w &&
        tx + this.w > other.x &&
        ty < other.y + other.h &&
        ty + this.h > other.y
      ) {
        return true;
      }
    }
    return false;
  }
}
