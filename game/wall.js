class Wall extends GameObject {
  constructor(canvasWidth, canvasHeight) {
    // Initialisation du mur
    super(canvasWidth / 1.5 - 25, canvasHeight - 100, 50, 100, "yellow");
  }

  // Vérifie la collision avec une entité
  checkCollision(entity) {
    return (
      entity.x < this.x + this.width &&
      entity.x + entity.width > this.x &&
      entity.y < this.y + this.height &&
      entity.y + this.height > this.y
    );
  }
}
