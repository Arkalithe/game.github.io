import { GameObject } from "./gameObject.js";

export class Projectile extends GameObject {
  constructor(x, y, speed) {
    super(x, y, 10, 10, "red");
    this.speed = speed; // Vitesse du projectile
  }

  // Met à jour la position du projectile
  update() {
    this.x += this.speed;
  }
}

export class LaserProjectile extends GameObject {
  constructor(x, y, targetX, targetY) {
    super(x, y, 10, 10, "red");
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
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.dx, this.y - this.dy); // Dessiner une ligne plus longue pour représenter le laser
    ctx.stroke();
  }
}
