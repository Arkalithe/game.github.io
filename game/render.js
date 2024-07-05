import { renderIfInView } from './helpers.js';

export function render(ctx, canvas, player, enemy, laserEnemy, portal, greenCross, walls, projectiles, scrollOffset) {
  const viewport = { width: canvas.width, height: canvas.height };

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(-scrollOffset, 0);
  
  renderIfInView(enemy, ctx, viewport, scrollOffset);
  laserEnemy.render(ctx, player); // Toujours rendre le laserEnemy
  portal.render(ctx);
  greenCross.render(ctx); // Toujours rendre la croix verte
  walls.forEach((wall) => renderIfInView(wall, ctx, viewport, scrollOffset));
  projectiles.forEach((projectile) => renderIfInView(projectile, ctx, viewport, scrollOffset));

  // Toujours rendre le joueur
  player.render(ctx);

  ctx.restore();

  // Affiche la barre de vie du joueur en haut à droite de l'écran
  player.renderHP(ctx, canvas.width);

  if (player.isNear(portal)) {
    renderPortalMessage(ctx, canvas);
  }

  if (window.isGameOver) {
    renderGameOver(ctx, canvas);
  }
}

function renderPortalMessage(ctx, canvas) {
  ctx.fillStyle = "black";
  ctx.font = "24px serif";
  ctx.fillText(
    "Appuyez sur 'E' pour terminer le niveau",
    canvas.width / 2 - 150,
    canvas.height / 2 - 50
  );
}

function renderGameOver(ctx, canvas) {
  ctx.fillStyle = "black";
  ctx.font = "48px serif";
  ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
  ctx.font = "24px serif";
  ctx.fillText(
    "Appuyez sur 'R' pour redémarrer",
    canvas.width / 2 - 150,
    canvas.height / 2 + 40
  );
}