class Player {
  constructor(canvasWidth, canvasHeight, color = "blue") {
    this.width = 50;
    this.height = 50;
    this.color = color;
    this.speed = 5;
    this.jumpPower = 6;
    this.gravity = 0.3;
    this.x = canvasWidth / 2 - this.width / 2;
    this.y = canvasHeight - this.height - 10;
    this.vy = 0;
    this.isJumping = false;
    this.canDoubleJump = true;
    this.rotation = 0;
    this.hp = 3;
  }

  updatePosition(keys, canvasWidth, canvasHeight) {
    if (keys["q"] && this.x > 0) {
      this.x -= this.speed;
    }
    if (keys["d"] && this.x < canvasWidth - this.width) {
      this.x += this.speed;
    }

    this.vy += this.gravity;
    this.y += this.vy;

    if (this.y + this.height > canvasHeight) {
      this.y = canvasHeight - this.height;
      this.vy = 0;
      this.isJumping = false;
      this.canDoubleJump = true;
      this.rotation = 0;
    } else {
      this.rotation += 0.1;
    }
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotation);
    ctx.translate(-this.width / 2, -this.height / 2);
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
  }

  renderHP(ctx) {
    const hpBarWidth = 100;
    const hpBarHeight = 20;
    const hpBarX = 10;
    const hpbarY = 10;
    ctx.fillStyle = "red";
    ctx.fillRect(hpBarX, hpbarY, hpBarWidth, hpBarHeight);
    ctx.fillStyle = "green";
    ctx.fillRect(hpBarX, hpbarY, (this.hp / 3) * hpBarWidth, hpBarHeight);
  }
  
}
