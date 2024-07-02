class Wall extends GameObject {
  constructor(canvasWidth, canvasHeight) {
    // Initialisation du mur
    super(canvasWidth / 1.5 - 25, canvasHeight - 100, 50, 100, "blue");
  }

}
