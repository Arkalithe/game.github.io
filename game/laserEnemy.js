import { GameObject } from './gameObject.js';
import { LaserProjectile } from './projectile.js';

export class LaserEnemy extends GameObject {
  constructor(canvasWidth, canvasHeight) {
    super(canvasWidth / 4 - 100, canvasHeight - 100, 50, 50, "purple");
    this.shootingInterval = 3000; // Intervalle de tir en millisecondes
    this.aimingTime = 1000; // Temps de visée avant de tirer
    this.isAiming = false;
    this.targetPlayer = null;
    this.lastShotTime = Date.now();
  }

  aimAndShoot(player, projectiles) {
    this.targetPlayer = { x: player.x, y: player.y };
    setTimeout(() => {
      this.shootLaser(projectiles);
      this.isAiming = false;
      this.lastShotTime = Date.now();
    }, this.aimingTime);
  }

  shootLaser(projectiles) {
    const laser = new LaserProjectile(this.x + this.width / 2, this.y + this.height / 2, this.targetPlayer.x, this.targetPlayer.y);
    projectiles.push(laser);
  }

  update(player, projectiles) {
    const now = Date.now();
    if (!this.isAiming && now - this.lastShotTime > this.shootingInterval) {
      this.isAiming = true;
      this.aimAndShoot(player, projectiles);
    }
  }

  render(ctx, player) {
    super.render(ctx);
    if (this.isAiming && this.targetPlayer) {
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(this.x + this.width / 2, this.y + this.height / 2);
      ctx.lineTo(this.targetPlayer.x + player.width / 2, this.targetPlayer.y + player.height / 2);
      ctx.stroke();
    }
  }
}
