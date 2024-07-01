let keys = {};

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

document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});
