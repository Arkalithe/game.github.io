export class GameObject {
  constructor(x, y, width, height, color) {
    this.x = x; // Position X de l'objet
    this.y = y; // Position Y de l'objet
    this.width = width; // Largeur de l'objet
    this.height = height; // Hauteur de l'objet
    this.color = color; // Couleur de l'objet
  }

  // Affiche l'objet sur le canvas
  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  // Vérifie la collision avec un autre objet
  checkCollision(other) {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }

  // Vérifie la proximité avec un autre objet
  isNear(other, proximity = 50) {
    return (
      this.x < other.x + other.width + proximity &&
      this.x + this.width > other.x - proximity &&
      this.y < other.y + other.height + proximity &&
      this.y + this.height > other.y - proximity
    );
  }

  // Vérifie si cet objet est à l'intérieur d'un autre objet
  isInside(other) {
    return (
      this.x >= other.x &&
      this.x + this.width <= other.x + other.width &&
      this.y >= other.y &&
      this.y + this.height <= other.y + other.height
    );
  }
}
