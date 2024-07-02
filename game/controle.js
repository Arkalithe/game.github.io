let keys = {};

// Écoute l'événement de pression d'une touche
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
});

// Écoute l'événement de relâchement d'une touche
document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});
