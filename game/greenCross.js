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

export function initializeGreenCrosses(greenCrosses, canvas) {
  const greenCrossParams = [
    { x: canvas.width / 2 - 150, y: canvas.height -50 },
    { x: canvas.width / 1 + 300, y: canvas.height - 150 },
    // Ajoutez d'autres GreenCross si nécessaire
  ];

  greenCrossParams.forEach((params) => {
    greenCrosses.push(new GreenCross(params.x, params.y));
  });
}