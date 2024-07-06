import { GameObject } from "./gameObject.js";

export class Player extends GameObject {
  constructor(canvasWidth, canvasHeight, color = "blue") {
    const startX = Math.min(canvasWidth / 2 - 800, canvasWidth - 50); // le joueur commence à l'intérieur de la largeur du canvas
    const startY = canvasHeight - 60;
    super(startX, startY, 50, 50, color);
    this.speed = 5; // Vitesse de déplacement du joueur
    this.jumpPower = 6; // Puissance du saut
    this.gravity = 0.25; // Gravité appliquée au joueur
    this.vy = 0; // Vitesse verticale
    this.isJumping = false; // Indique si le joueur est en train de sauter
    this.maxJumps = 2; // Autorise le double saut
    this.jumpCount = 0; // Compteur pour les sauts
    this.rotation = 0; // Rotation pour l'animation
    this.hp = 3; // Points de vie du joueur
  }

  // Met à jour la position du joueur
  updatePosition(keys, canvasWidth, canvasHeight, walls) {
    // Sauvegarde la position précédente
    let prevX = this.x;
    let prevY = this.y;

    // Gestion des déplacements horizontaux
    if (keys["q"]) {
      this.x -= this.speed;
    }
    if (keys["d"]) {
      this.x += this.speed;
    }

    // Empêche le joueur de sortir par la gauche du canvas
    if (this.x < 0) {
      this.x = 0;
    }

    // Application de la gravité
    this.vy += this.gravity;
    this.y += this.vy;

    let isOnGround = false; // Variable pour vérifier si le joueur est au sol
    let hitCeiling = false; // Variable pour vérifier si le joueur touche le plafond

    // Vérification des collisions avec les murs
    walls.forEach((wall) => {
      if (this.checkCollision(wall)) {
        // Vérification des collisions verticales
        if (prevY + this.height <= wall.y && this.vy > 0) {
          // Collision par le bas (atterrissage sur le mur)
          this.y = wall.y - this.height;
          this.vy = 0;
          this.isJumping = false;
          this.jumpCount = 0; // Réinitialise le compteur de sauts
          isOnGround = true;
        } else if (prevY >= wall.y + wall.height && this.vy < 0) {
          // Collision par le haut
          this.y = wall.y + wall.height;
          this.vy = 0;
          hitCeiling = true;
        }
      }
    });

    // Re-vérification des collisions pour ajuster la position horizontale
    walls.forEach((wall) => {
      if (this.checkCollision(wall)) {
        // Vérification des collisions latérales
        if (prevX + this.width <= wall.x && this.x + this.width > wall.x) {
          // Collision par la gauche
          this.x = wall.x - this.width;
        } else if (
          prevX >= wall.x + wall.width &&
          this.x < wall.x + wall.width
        ) {
          // Collision par la droite
          this.x = wall.x + wall.width;
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
    } else if (this.y < 0) {
      // Empêche le joueur de sortir par le haut du canvas
      this.y = 0;
      this.vy = 0;
      hitCeiling = true;
    }

    // Ajuster la rotation pour l'animation lors du saut
    if (!isOnGround && !hitCeiling) {
      this.isJumping = true;
      this.rotation += 0.1; // Ajout de la rotation pour l'animation
    } else {
      this.rotation = 0; // Réinitialisation de la rotation quand le joueur est au sol ou touche le plafond
    }
  }

  // Affiche le joueur sur le canvas
  render(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotation);
    ctx.translate(-this.width / 2, -this.height / 2);
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
  }

  // Affiche la barre de vie du joueur en haut à droite de l'écran
  renderHP(ctx, canvasWidth) {
    const hpBarWidth = 100; // Largeur de la barre de vie
    const hpBarHeight = 20; // Hauteur de la barre de vie
    const hpBarX = canvasWidth - hpBarWidth - 1250; // Position X de la barre de vie en haut à droite
    const hpBarY = 20; // Position Y de la barre de vie
    ctx.fillStyle = "red";
    ctx.fillRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);
    ctx.fillStyle = "green";
    ctx.fillRect(hpBarX, hpBarY, (this.hp / 3) * hpBarWidth, hpBarHeight);
  }
}
