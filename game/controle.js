import { player, isGameOver, restartGame, endLevel, keys, portal } from './game.js';

// Écouteur d'événement pour les touches pressées
document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;

  // Gestion du saut et du double saut
  if (e.key === " " && player && (player.jumpCount < player.maxJumps)) {
    player.vy = -player.jumpPower;
    player.jumpCount++;
    player.isJumping = true;
  }

  // Gestion du redémarrage du jeu en appuyant sur 'R'
  if (e.key.toLowerCase() === "r" && isGameOver) {
    restartGame();
  }

  // Gestion de la fin du niveau en appuyant sur 'E' si le joueur est proche du portail
  if (e.key.toLowerCase() === "e" && player && portal && player.isNear(portal)) {
    endLevel();
  }
});

// Écouteur d'événement pour les touches relâchées
document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});
