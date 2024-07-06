import { GameObject } from "./gameObject.js";
import { Projectile } from "./projectile.js";

export class Enemy extends GameObject {
  constructor(x, y, width = 50, height = 50, color = "green", shootingInterval = 2000, dx = 1, dy = 0) {
    super(x, y, width, height, color);
    this.shootingInterval = shootingInterval; // Intervalle de tir en millisecondes
    this.lastShotTime = Date.now(); // Temps du dernier tir
    this.dx = dx; // Direction en x
    this.dy = dy; // Direction en y
  }

  shoot(projectiles) {
    const now = Date.now();
    if (now - this.lastShotTime >= this.shootingInterval) {
      const projectile = new Projectile(
        this.x + this.width / 2, // Position de départ du projectile
        this.y + this.height / 2,
        this.dx, // Direction en x
        this.dy, // Direction en y
        5 // Vitesse du projectile
      );
      projectiles.push(projectile);
      this.lastShotTime = now; // Mise à jour du temps du dernier tir
    }
  }

  update(projectiles) {
    this.shoot(projectiles);
  }
}

// Initialiser plusieurs ennemis avec des paramètres spécifiques
export function initializeEnemies(enemies, canvas) {
  const enemyParams = [
    { x: canvas.width / 1.1, y: canvas.height - 150, width: 50, height: 50, shootingInterval: 1000, dx: 1, dy: 0 },
    { x: canvas.width * 1.1, y: canvas.height - 200, width: 50, height: 50, shootingInterval: 1500, dx: -1, dy: 0 },
    { x: canvas.width * 1.1, y: canvas.height - 300, width: 50, height: 50, shootingInterval: 2000, dx: 0, dy: -1 },
    // Ajoutez d'autres ennemis si nécessaire
  ];

  enemyParams.forEach((params) => {
    enemies.push(new Enemy(params.x, params.y, params.width, params.height, params.color, params.shootingInterval, params.dx, params.dy));
  });
}
