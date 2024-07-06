export function detectCollisions(player, projectiles, greenCrosses) {
  projectiles.forEach((projectile, index) => {
    if (projectile.checkCollision(player)) {
      projectiles.splice(index, 1);
      player.hp -= 1;
      if (player.hp <= 0) {
        gameOver();
      }
    }
  });

  // Détecte la collision entre le joueur et les croix vertes
  greenCrosses.forEach((greenCross) => {
    if (greenCross.checkCollision(player)) {
      greenCross.collect(player);
    }
  });
}

function gameOver() {
  window.isGameOver = true;
  console.log("Game Over");
  cancelAnimationFrame(window.animationFrameId);
}