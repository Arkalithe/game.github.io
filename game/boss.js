import { GameObject } from "./gameObject.js";
import { LaserProjectile } from "./projectile.js";

export class Boss extends GameObject {
  constructor(canvasWidth, canvasHeight) {
    super(canvasWidth / 2 - 50, canvasHeight - 350, 200, 150, "transparent");
    this.speed = 5; // Vitesse de déplacement du boss
    this.shootingInterval = 2000; // Intervalle de tir en millisecondes
    this.lastShotTime = Date.now();
    this.hp = 20; // Points de vie du boss

    // Définir les parties du boss
    this.parts = [
      { x: canvasWidth / 2 - 50, y: canvasHeight - 300, width: 100, height: 50, color: "indigo", lastShotTime: Date.now(), shootingInterval: 2500 },
      { x: canvasWidth / 2 - 50, y: canvasHeight - 250, width: 100, height: 50, color: "red", lastShotTime: Date.now(), shootingInterval: 3000 },
      { x: canvasWidth / 2 - 50, y: canvasHeight - 200, width: 100, height: 50, color: "yellow", lastShotTime: Date.now(), shootingInterval: 3500 },
      { x: canvasWidth / 2 - 100, y: canvasHeight - 350, width: 50, height: 100, color: "purple", lastShotTime: Date.now(), shootingInterval: 4000 },
      { x: canvasWidth / 2 + 50, y: canvasHeight - 350, width: 50, height: 100, color: "purple", lastShotTime: Date.now(), shootingInterval: 4000 },
      { x: canvasWidth / 2 + 50, y: canvasHeight - 250, width: 50, height: 50, color: "blue", lastShotTime: Date.now(), shootingInterval: 4500 },
      { x: canvasWidth / 2 - 100, y: canvasHeight - 250, width: 50, height: 50, color: "blue", lastShotTime: Date.now(), shootingInterval: 4500 },
      { x: canvasWidth / 2 + 100, y: canvasHeight - 200, width: 50, height: 50, color: "green", lastShotTime: Date.now(), shootingInterval: 5000 },
      { x: canvasWidth / 2 - 150, y: canvasHeight - 200, width: 50, height: 50, color: "green", lastShotTime: Date.now(), shootingInterval: 5000 },
      { x: canvasWidth / 2 + 50, y: canvasHeight - 200, width: 50, height: 100, color: "orange", lastShotTime: Date.now(), shootingInterval: 5500 },
      { x: canvasWidth / 2 - 100, y: canvasHeight - 200, width: 50, height: 100, color: "orange", lastShotTime: Date.now(), shootingInterval: 5500 }
    ];
  }

  update(player, projectiles, canvasWidth, canvasHeight) {
    // Déplacement horizontal du boss
    if (this.x < 0) {
      this.x = 0;
      this.speed *= -1;
    } else if (this.x + this.width > canvasWidth) {
      this.x = canvasWidth - this.width;
      this.speed *= -1;
    }
    this.x += this.speed;

    // Mise à jour de la position des parties du boss
    this.parts.forEach(part => {
      part.x += this.speed;
    });

    const now = Date.now();
    if (now - this.lastShotTime > this.shootingInterval) {
      this.lastShotTime = now;
      this.selectAndShoot(player, projectiles);
    }
  }

  selectAndShoot(player, projectiles) {
    // Sélectionner aléatoirement deux parties du boss pour tirer
    const shootingParts = [];
    while (shootingParts.length < 2) {
      const randomIndex = Math.floor(Math.random() * this.parts.length);
      if (!shootingParts.includes(randomIndex)) {
        shootingParts.push(randomIndex);
      }
    }

    shootingParts.forEach(index => {
      const part = this.parts[index];
      this.shootLaser(part, player, projectiles);
      part.lastShotTime = Date.now(); // Mettre à jour le temps de tir de la partie
    });
  }

  shootLaser(part, player, projectiles) {
    const startX = part.x + part.width / 2;
    const startY = part.y + part.height / 2;
    const targetX = player.x + player.width / 2;
    const targetY = player.y + player.height / 2;

    const laser = new LaserProjectile(startX, startY, targetX, targetY, part.color);
    projectiles.push(laser);
  }

  render(ctx) {
    this.parts.forEach(part => {
      ctx.fillStyle = part.color;
      ctx.fillRect(part.x, part.y, part.width, part.height);
    });
  }

  checkCollision(other) {
    const collision = this.parts.some(part => {
      return (
        other.x < part.x + part.width &&
        other.x + other.width > part.x &&
        other.y < part.y + part.height &&
        other.y + other.height > part.y
      );
    });

    if (collision && other instanceof LaserProjectile) {
      this.hp -= 1; // Réduire la vie du boss lorsque touché par un projectile
      other.active = false; // Désactiver le projectile
    }
    return collision;
  }
}