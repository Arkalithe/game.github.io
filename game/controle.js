let keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
  // Gestion du saut et du double saut
  if (e.key === " " && (player.isJumping === false || player.canDoubleJump)) {
    player.vy = -player.jumpPower;
    player.isJumping = true;
    if (player.canDoubleJump && player.y < canvas.height - player.height - 10) {
      player.canDoubleJump = false;
    }
  }
  // Gestion du redémarrage du jeu en appuyant sur 'R'
  if (e.key.toLowerCase() === "r" && isGameOver) {
    restartGame();
  }
  // Gestion de la fin du niveau en appuyant sur 'E' si le joueur est proche du portail
  if (e.key.toLowerCase() === "e" && player.isNear(portal)) {
    endLevel();
  }
});

document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});
