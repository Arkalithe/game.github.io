class Projectile extends GameObject {
  constructor(x, y, speed) {
    // Initialisation du projectile
    super(x, y, 10, 10, "red");
    this.speed = speed; // Vitesse du projectile
  }

  update() {
    this.x += this.speed; // Déplacement horizontal du projectile
  }
}
