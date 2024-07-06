import { detectCollisions } from './collision.js';
import { handleScrolling } from './scrolling.js';
import { isInView } from './helpers.js';

export function update(player, enemies, laserEnemy, projectiles, walls, keys, canvas, greenCross) {
  if (!window.isGameOver) {
    const viewport = { width: canvas.width, height: canvas.height };

    player.updatePosition(keys, canvas.width, canvas.height, [
      ...walls,
      ...enemies,
      laserEnemy,
    ]);

    enemies.forEach((enemy) => {
      enemy.update(projectiles); // Mettre à jour chaque ennemi indépendamment de leur visibilité
    });

    if (isInView(laserEnemy, viewport, player.scrollOffset)) {
      laserEnemy.update(player, projectiles);
    }

    projectiles.forEach((projectile, index) => {
      projectile.update(); // Mettre à jour tous les projectiles indépendamment de leur visibilité
      if (
        projectile.x > canvas.width + player.scrollOffset ||  // Correction des limites de l'écran
        projectile.y > canvas.height ||
        projectile.x < player.scrollOffset ||  // Correction des limites de l'écran
        projectile.y < 0 ||
        walls.some((wall) => wall.checkCollision(projectile))
      ) {
        projectiles.splice(index, 1);
      }
    });

    detectCollisions(player, projectiles, greenCross);
    player.scrollOffset = handleScrolling(player, canvas, player.scrollOffset);
  }
}
