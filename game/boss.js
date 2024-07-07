import { GameObject } from "./gameObject.js";
import { LaserProjectile, BouncingProjectile } from "./projectile.js"; // Assurez-vous que BouncingProjectile est importé

export class Boss extends GameObject {
  constructor(canvasWidth, canvasHeight) {
    super(canvasWidth / 2 - 50, canvasHeight - 650, 200, 150, "transparent");
    this.speed = 5; // Vitesse de déplacement du boss
    this.shootingInterval = 2000; // Intervalle de tir en millisecondes
    this.lastShotTime = Date.now();
    this.specialAttackCounter = 0; // Compteur pour les tirs aléatoires
    this.hp = 20; // Points de vie du boss
    this.isSpecialAttack = false; // Indicateur pour savoir si une attaque spéciale est en cours
    this.isUltimateAttack = false; // Indicateur pour l'attaque ultime
    this.crystal = { x: canvasWidth / 2 - 25, y: canvasHeight - 100, width: 50, height: 50, color: "cyan", active: false };

    // Définir les parties du boss
    this.parts = [
      { x: canvasWidth / 2 - 50, y: canvasHeight - 600, width: 100, height: 50, color: "indigo", lastShotTime: Date.now(), shootingInterval: 2500 },
      { x: canvasWidth / 2 - 50, y: canvasHeight - 550, width: 100, height: 50, color: "red", lastShotTime: Date.now(), shootingInterval: 3000 },
      { x: canvasWidth / 2 - 50, y: canvasHeight - 500, width: 100, height: 50, color: "yellow", lastShotTime: Date.now(), shootingInterval: 3500 },
      { x: canvasWidth / 2 - 100, y: canvasHeight - 650, width: 50, height: 100, color: "purple", lastShotTime: Date.now(), shootingInterval: 4000 },
      { x: canvasWidth / 2 + 50, y: canvasHeight - 650, width: 50, height: 100, color: "purple", lastShotTime: Date.now(), shootingInterval: 4000 },
      { x: canvasWidth / 2 + 50, y: canvasHeight - 550, width: 50, height: 50, color: "blue", lastShotTime: Date.now(), shootingInterval: 4500 },
      { x: canvasWidth / 2 - 100, y: canvasHeight - 550, width: 50, height: 50, color: "blue", lastShotTime: Date.now(), shootingInterval: 4500 },
      { x: canvasWidth / 2 + 100, y: canvasHeight - 500, width: 50, height: 50, color: "green", lastShotTime: Date.now(), shootingInterval: 5000 },
      { x: canvasWidth / 2 - 150, y: canvasHeight - 500, width: 50, height: 50, color: "green", lastShotTime: Date.now(), shootingInterval: 5000 },
      { x: canvasWidth / 2 + 50, y: canvasHeight - 500, width: 50, height: 100, color: "orange", lastShotTime: Date.now(), shootingInterval: 5500 },
      { x: canvasWidth / 2 - 100, y: canvasHeight - 500, width: 50, height: 100, color: "orange", lastShotTime: Date.now(), shootingInterval: 5500 }
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
    if (now - this.lastShotTime > this.shootingInterval && !this.isSpecialAttack && !this.isUltimateAttack) {
      this.lastShotTime = now;
      this.specialAttackCounter++;
      if (this.specialAttackCounter >= 5) {
        this.specialAttackCounter = 0;
        this.startSpecialAttack(player, projectiles);
      } else {
        this.selectAndShoot(player, projectiles);
      }
    }

    // Si l'attaque ultime est en cours
    if (this.isUltimateAttack) {
      this.shootUltimateLaser(player, canvasWidth, canvasHeight);
    }

    if (this.hp <= 0) {
      window.isGameWon = true; 
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

  startSpecialAttack(player, projectiles) {
    this.isSpecialAttack = true;
    setTimeout(() => {
      this.shootSpecialLaser(player, projectiles);
    }, 3000); // Attendre 3 secondes avant de tirer le gros laser
  }

  shootSpecialLaser(player, projectiles) {
    this.parts.forEach(part => {
      this.shootLaser(part, player, projectiles);
    });
    this.isSpecialAttack = false;
    this.startUltimateAttack(); // Déclenche l'attaque ultime après l'attaque spéciale
  }

  startUltimateAttack() {
    this.isUltimateAttack = true;
    this.crystal.active = true; // Active le cristal pendant l'attaque ultime
    setTimeout(() => {
      this.isUltimateAttack = false;
      this.crystal.active = false;
    }, 3000); // La durée de l'attaque ultime
  }

  shootUltimateLaser(player, canvasWidth, canvasHeight) {
    const startX = this.x + this.width / 2;
    const startY = this.y + this.height;
    const targetX = player.x + player.width / 2;
    const targetY = player.y + player.height / 2;

    // Définir le laser continu
    this.ultimateLaser = {
      startX,
      startY,
      endX: targetX,
      endY: targetY,
      color: "red",
      width: 10
    };

    // Vérifiez si le joueur dirige le laser vers le cristal
    if (this.crystal.active && this.checkCollisionWithCrystal(this.ultimateLaser)) {
      this.hp -= 5; // Infliger des dégâts au boss
      this.isUltimateAttack = false; // Arrêter l'attaque ultime
      this.crystal.active = false; // Désactiver le cristal
    }
  }

  shootLaser(part, player, projectiles) {
    const startX = part.x + part.width / 2;
    const startY = part.y + part.height / 2;
    const targetX = player.x + player.width / 2;
    const targetY = player.y + player.height / 2;

    if (part.color === "indigo") {
      this.shootArcProjectiles(startX, startY, projectiles, part.color);
    } else if (part.color === "red") {
      this.shootAlignedProjectiles(startX, startY, targetX, targetY, projectiles, part.color);
    } else if (part.color === "yellow") {
      this.shootBouncingProjectiles(startX, startY, targetX, targetY, projectiles, part.color);
    } else {
      const laser = new LaserProjectile(startX, startY, targetX, targetY, part.color);
      projectiles.push(laser);
    }
  }

  shootArcProjectiles(startX, startY, projectiles, color) {
    const numberOfProjectiles = 5;
    const spreadAngle = Math.PI / 4; // 45 degrees spread

    for (let i = 0; i < numberOfProjectiles; i++) {
      const angle = -spreadAngle / 2 + (spreadAngle / (numberOfProjectiles - 1)) * i;
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);
      const projectile = new LaserProjectile(startX, startY, startX + dx * 100, startY + dy * 100, color);
      projectiles.push(projectile);
    }
  }

  shootAlignedProjectiles(startX, startY, targetX, targetY, projectiles, color) {
    const numberOfProjectiles = 3;
    const spacing = 20; // Spacing between projectiles

    for (let i = 0; i < numberOfProjectiles; i++) {
      const offset = (i - Math.floor(numberOfProjectiles / 2)) * spacing;
      const projectile = new LaserProjectile(startX + offset, startY, targetX + offset, targetY, color);
      projectiles.push(projectile);
    }
  }

  shootBouncingProjectiles(startX, startY, targetX, targetY, projectiles, color) {
    const numberOfProjectiles = 3;

    for (let i = 0; i < numberOfProjectiles; i++) {
      const bouncingProjectile = new BouncingProjectile(startX, startY, targetX, targetY, color);
      projectiles.push(bouncingProjectile);
    }
  }

  render(ctx) {
    this.parts.forEach(part => {
      ctx.fillStyle = part.color;
      ctx.fillRect(part.x, part.y, part.width, part.height);
    });

    if (this.isUltimateAttack && this.ultimateLaser) {
      ctx.strokeStyle = this.ultimateLaser.color;
      ctx.lineWidth = this.ultimateLaser.width;
      ctx.beginPath();
      ctx.moveTo(this.ultimateLaser.startX, this.ultimateLaser.startY);
      ctx.lineTo(this.ultimateLaser.endX, this.ultimateLaser.endY);
      ctx.stroke();
    }

    if (this.crystal.active) {
      ctx.fillStyle = this.crystal.color;
      ctx.fillRect(this.crystal.x, this.crystal.y, this.crystal.width, this.crystal.height);
    }
  }

  checkCollisionWithCrystal(laser) {
    return (
      laser.endX >= this.crystal.x &&
      laser.endX <= this.crystal.x + this.crystal.width &&
      laser.endY >= this.crystal.y &&
      laser.endY <= this.crystal.y + this.crystal.height
    );
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