class Enemy {
  constructor(canvasWidth, canvasHeight) {
    this.width = 50;
    this.height = 50;
    this.color = "green";
    this.x = canvasWidth / 4 - this.width / 2;
    this.y = canvasHeight - this.height - 10;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
