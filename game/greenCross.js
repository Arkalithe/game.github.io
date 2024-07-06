import { GameObject } from "./gameObject.js";

export class GreenCross extends GameObject {
  constructor(x, y) {
    super(x, y, 30, 30, "green");
    this.isCollected = false;
  }

  collect(player) {
    if (!this.isCollected) {
      player.hp = 3; // Restaure la santé complète
      this.isCollected = true;
    }
  }

  render(ctx) {
    if (!this.isCollected) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(this.x + this.width / 3, this.y);
      ctx.lineTo(this.x + (2 * this.width) / 3, this.y);
      ctx.lineTo(this.x + (2 * this.width) / 3, this.y + this.height / 3);
      ctx.lineTo(this.x + this.width, this.y + this.height / 3);
      ctx.lineTo(this.x + this.width, this.y + (2 * this.height) / 3);
      ctx.lineTo(this.x + (2 * this.width) / 3, this.y + (2 * this.height) / 3);
      ctx.lineTo(this.x + (2 * this.width) / 3, this.y + this.height);
      ctx.lineTo(this.x + this.width / 3, this.y + this.height);
      ctx.lineTo(this.x + this.width / 3, this.y + (2 * this.height) / 3);
      ctx.lineTo(this.x, this.y + (2 * this.height) / 3);
      ctx.lineTo(this.x, this.y + this.height / 3);
      ctx.lineTo(this.x + this.width / 3, this.y + this.height / 3);
      ctx.closePath();
      ctx.fill();
    }
  }
}
