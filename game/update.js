import { detectCollisions } from './collision.js';
import { handleScrolling } from './scrolling.js';
import { isInView } from './helpers.js';
import { BouncingProjectile } from './projectile.js'; // Importer BouncingProjectile

export function update(player, enemies, laserEnemies, projectiles, walls, keys, canvas, greenCrosses, portal, boss, isBossFight, startBossFight, setSpecialAttackMessage) {
  if (!window.isGameOver) {
    const viewport = { width: canvas.width, height: canvas.height };

    player.updatePosition(keys, canvas.width, canvas.height, [
      ...walls,
      ...enemies,
      ...laserEnemies,
    ]);

    enemies.forEach((enemy) => {
      enemy.update(projectiles); // Mettre à jour chaque ennemi indépendamment de leur visibilité
    });

    laserEnemies.forEach((laserEnemy) => {
      if (isInView(laserEnemy, viewport, isBossFight ? 0 : player.scrollOffset)) {
        laserEnemy.update(player, projectiles);
      }
    });

    projectiles.forEach((projectile, index) => {
      if (projectile instanceof BouncingProjectile) {
        projectile.update(canvas.width, canvas.height); // Passer les dimensions du canvas
      } else {
        projectile.update();
      }

      if (
        projectile.x > canvas.width + (isBossFight ? 0 : player.scrollOffset) ||  // Correction des limites de l'écran
        projectile.y > canvas.height ||
        projectile.x < (isBossFight ? 0 : player.scrollOffset) ||  // Correction des limites de l'écran
        projectile.y < 0 ||
        walls.some((wall) => wall.checkCollision(projectile))
      ) {
        projectiles.splice(index, 1);
      }
    });

    if (isBossFight && boss) {
      boss.update(player, projectiles, canvas.width, canvas.height);
      if (boss.isSpecialAttack) {
        setSpecialAttackMessage(true);
        setTimeout(() => {
          setSpecialAttackMessage(false);
        }, 3000);
      }
    }

    detectCollisions(player, projectiles, greenCrosses);
    if (!isBossFight) {
      player.scrollOffset = handleScrolling(player, canvas, player.scrollOffset);
    }

    portal.checkCollision(player, startBossFight);
  }
}