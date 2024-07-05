import { detectCollisions } from './collision.js';
import { handleScrolling } from './scrolling.js';
import { isInView } from './helpers.js';

export function update(player, enemy, laserEnemy, projectiles, walls, keys, canvas, greenCross) {
  if (!window.isGameOver) {
    const viewport = { width: canvas.width, height: canvas.height };

    // Toujours mettre à jour le joueur
    player.updatePosition(keys, canvas.width, canvas.height, [
      ...walls,
      enemy,
      laserEnemy,
    ]);

    if (isInView(laserEnemy, viewport, player.scrollOffset)) {
      laserEnemy.update(player, projectiles);
    }

    projectiles.forEach((projectile, index) => {
      if (isInView(projectile, viewport, player.scrollOffset)) {
        projectile.update();
      }

      if (
        projectile.x > canvas.width ||
        projectile.y > canvas.height ||
        projectile.x < 0 ||
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