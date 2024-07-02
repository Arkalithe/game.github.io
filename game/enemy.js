class Enemy extends GameObject {
  constructor(canvasWidth, canvasHeight) {
    // Initialisation de l'ennemi
    super(canvasWidth / 4 - 25, canvasHeight - 60, 50, 50, "green");
  }
}
