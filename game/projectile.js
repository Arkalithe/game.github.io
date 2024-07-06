// projectile.js
import { GameObject } from "./gameObject.js";

export class Projectile extends GameObject {
  constructor(x, y, dx, dy, speed, color = "red") {
    super(x, y, 10, 10, color);
    this.dx = dx;
    this.dy = dy;
    this.speed = speed; // Vitesse du projectile
  }

  // Met à jour la position du projectile
  update() {
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class LaserProjectile extends GameObject {
  constructor(x, y, targetX, targetY, color = "red") {
    super(x, y, 10, 10, color);
    this.targetX = targetX;
    this.targetY = targetY;
    this.speed = 10;
    const distance = Math.sqrt((targetX - x) ** 2 + (targetY - y) ** 2);
    this.dx = ((targetX - x) / distance) * this.speed;
    this.dy = ((targetY - y) / distance) * this.speed;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.dx * 10, this.y - this.dy * 10); // Dessiner une ligne plus longue pour représenter le laser
    ctx.stroke();
  }
}
