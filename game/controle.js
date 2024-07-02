let keys = {};

// Gestionnaire d'événements pour les touches pressées
document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
  if (e.key === " " && (player.isJumping === false || player.canDoubleJump)) {
    player.vy = -player.jumpPower;
    player.isJumping = true;
    if (player.canDoubleJump && player.y < canvas.height - player.height - 10) {
      player.canDoubleJump = false;
    }
  }
});

// Gestionnaire d'événements pour les touches relâchées
document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});
