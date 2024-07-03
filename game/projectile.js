import { GameObject } from './gameObject.js';

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
