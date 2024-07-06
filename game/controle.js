export class Controle {
  constructor(keys, player, portal) {
    this.keys = keys;
    this.player = player;
    this.portal = portal;

    // Écouteur d'événement pour les touches pressées
    document.addEventListener("keydown", (e) => this.keyDownHandler(e));
    // Écouteur d'événement pour les touches relâchées
    document.addEventListener("keyup", (e) => this.keyUpHandler(e));
  }

  updatePlayerAndPortal(player, portal) {
    this.player = player;
    this.portal = portal;
  }

  // Gestion des touches pressées
  keyDownHandler(e) {
    this.keys[e.key.toLowerCase()] = true;
  
    // Gestion du saut et du double saut
    if (e.key === " " && this.player && this.player.jumpCount < this.player.maxJumps) {
      this.player.vy = -this.player.jumpPower;
      this.player.jumpCount++;
      this.player.isJumping = true;
    }
  
    // Gestion du redémarrage du jeu en appuyant sur 'R'
    if (e.key.toLowerCase() === "r" && window.isGameOver) {
      window.restartGame();
    }
  
    // Gestion de la fin du niveau en appuyant sur 'E' si le joueur est à l'intérieur du portail
    if (e.key.toLowerCase() === "e") {
      if (this.player && this.portal) {

        if (this.player.isInside(this.portal)) {

          window.endLevel();
        } else {

        }
      }
    }
  }

  // Gestion des touches relâchées
  keyUpHandler(e) {
    this.keys[e.key.toLowerCase()] = false;
  }
}