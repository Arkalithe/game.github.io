class Player extends GameObject {
  constructor(canvasWidth, canvasHeight, color = "blue") {
    super(canvasWidth / 2 - 25, canvasHeight - 60, 50, 50, color);
    this.speed = 5; // Vitesse de déplacement du joueur
    this.jumpPower = 6; // Puissance du saut
    this.gravity = 0.3; // Gravité appliquée au joueur
    this.vy = 0; // Vitesse verticale
    this.isJumping = false; // Indique si le joueur est en train de sauter
    this.maxJumps = 2; // Autorise le double saut
    this.jumpCount = 0; // Compteur pour les sauts
    this.rotation = 0; // Rotation du joueur pour l'animation
    this.hp = 3; // Points de vie du joueur
  }

  updatePosition(keys, canvasWidth, canvasHeight, walls) {
    // Gestion des déplacements horizontaux
    if (keys["q"]) {
      this.x -= this.speed;
    }
    if (keys["d"]) {
      this.x += this.speed;
    }

    // Application de la gravité
    this.vy += this.gravity;
    this.y += this.vy;

    let isOnGround = false; // Variable pour vérifier si le joueur est au sol

    // Vérification des collisions avec les murs
    walls.forEach((wall) => {
      if (this.checkCollision(wall)) {
        if (this.vy > 0 && this.y + this.height - this.vy <= wall.y) {
          // Collision par le bas (atterrissage sur le mur)
          this.y = wall.y - this.height;
          this.vy = 0;
          this.isJumping = false;
          this.jumpCount = 0; // Réinitialise le compteur de sauts
          isOnGround = true;
        } else if (this.vy < 0 && this.y >= wall.y + wall.height) {
          // Collision par le haut
          this.y = wall.y + wall.height;
          this.vy = 0;
        } else if (this.x + this.width > wall.x && this.x < wall.x + wall.width) {
          // Collision par le côté
          if (this.x < wall.x) {
            this.x = wall.x - this.width;
          } else {
            this.x = wall.x + wall.width;
          }
        }
      }
    });

    // Vérification des collisions avec les limites du canvas en hauteur uniquement
    if (this.y + this.height > canvasHeight) {
      this.y = canvasHeight - this.height;
      this.vy = 0;
      this.isJumping = false;
      this.jumpCount = 0; // Réinitialise le compteur de sauts
      this.rotation = 0;
      isOnGround = true;
    } else if (this.y + this.height === canvasHeight) {
      isOnGround = true;
    }

    if (!isOnGround) {
      this.isJumping = true;
      this.rotation += 0.1; // Ajout de la rotation pour l'animation
    } else {
      this.rotation = 0; // Réinitialisation de la rotation quand le joueur est au sol
    }
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotation);
    ctx.translate(-this.width / 2, -this.height / 2);
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
  }

  renderHP(ctx) {
    const hpBarWidth = 100; // Largeur de la barre de vie
    const hpBarHeight = 20; // Hauteur de la barre de vie
    const hpBarX = 10; // Position X de la barre de vie
    const hpBarY = 10; // Position Y de la barre de vie
    ctx.fillStyle = "red";
    ctx.fillRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);
    ctx.fillStyle = "green";
    ctx.fillRect(hpBarX, hpBarY, (this.hp / 3) * hpBarWidth, hpBarHeight);
  }
}
