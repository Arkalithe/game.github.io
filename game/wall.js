class Wall {
  constructor(canvasWidth, canvasHeight) {
    this.width = 50;
    this.height = 100;
    this.color = "green";
    this.x = canvasWidth / 1.5 - this.width / 1;
    this.y = canvasHeight - this.height;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  checkCollision(entity) {
    return (
      entity.x < this.x + this.width &&
      entity.x + entity.width > this.x &&
      entity.y < this.y + this.height &&
      entity.y + this.height > this.y
    );
  }
}
