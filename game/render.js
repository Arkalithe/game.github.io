import { renderIfInView } from "./helpers.js";

export function render(
  ctx,
  canvas,
  player,
  enemies,
  laserEnemies,
  portal,
  greenCrosses,
  walls,
  projectiles,
  messages,
  scrollOffset,
  boss,
  isBossFight
) {
  const viewport = { width: canvas.width, height: canvas.height };

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  if (!isBossFight) {
    ctx.translate(-scrollOffset, 0);
  }

  enemies.forEach((enemy) =>
    renderIfInView(enemy, ctx, viewport, isBossFight ? 0 : scrollOffset)
  );
  laserEnemies.forEach((laserEnemy) => laserEnemy.render(ctx, player));
  portal.render(ctx);
  greenCrosses.forEach((greenCross) =>
    renderIfInView(greenCross, ctx, viewport, isBossFight ? 0 : scrollOffset)
  );
  walls.forEach((wall) =>
    renderIfInView(wall, ctx, viewport, isBossFight ? 0 : scrollOffset)
  );
  projectiles.forEach((projectile) =>
    renderIfInView(projectile, ctx, viewport, isBossFight ? 0 : scrollOffset)
  );

  messages.forEach((message) =>
    renderIfInView(message, ctx, viewport, isBossFight ? 0 : scrollOffset)
  );

  if (isBossFight && boss) {
    boss.render(ctx);
  }

  player.render(ctx);

  ctx.restore(); // Restore the context before rendering fixed messages

  player.renderHP(ctx, canvas.width);

  if (player.isNear(portal) && !isBossFight) {
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
    "Appuyez sur 'E' pour commencer le combat de boss",
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
