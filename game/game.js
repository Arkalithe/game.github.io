const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player;
let enemy;
let wall;
let projectiles = [];
let isGameOver = false;

// Redimensionne le canvas et initialise les objets du jeu
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.9;
  if (!player) {
    player = new Player(canvas.width, canvas.height);
    enemy = new Enemy(canvas.width, canvas.height);
    wall = new Wall(canvas.width, canvas.height);
  } else {
    player.x = canvas.width / 2 - player.width / 2;
    player.y = canvas.height - player.height - 10;
    enemy.x = canvas.width / 4 - enemy.width / 2;
    enemy.y = canvas.height - enemy.height - 10;
  }
}

// Écoute les changements de taille de la fenêtre pour redimensionner le canvas
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Met à jour l'état du jeu
function update() {
  if (!isGameOver) {
    player.updatePosition(keys, canvas.width, canvas.height, [wall, enemy]);
    projectiles.forEach((projectile, index) => {
      projectile.update();
      // Si le projectile sort du canvas ou entre en collision avec un mur, il est supprimé
      if (projectile.x > canvas.width || wall.checkCollision(projectile)) {
        projectiles.splice(index, 1);
      }
    });
    detectCollisions(); // Détecte les collisions entre les projectiles et le joueur
  }
}

// Affiche les éléments du jeu
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas
  player.render(ctx); // Affiche le joueur
  player.renderHP(ctx); // Affiche la barre de vie du joueur
  enemy.render(ctx); // Affiche l'ennemi
  wall.render(ctx); // Affiche le mur
  projectiles.forEach((projectile) => projectile.render(ctx)); // Affiche les projectiles
  if (isGameOver) {
    renderGameOver(); // Affiche le message Game Over si le jeu est terminé
  }
}

// Détecte les collisions entre les projectiles et le joueur
function detectCollisions() {
  projectiles.forEach((projectile, index) => {
    if (projectile.checkCollision(player)) {
      projectiles.splice(index, 1); // Supprime le projectile en collision
      player.hp -= 1; // Réduit les points de vie du joueur
      if (player.hp <= 0) {
        gameOver(); // Termine le jeu si les points de vie sont à zéro
      }
    }
  });
}

// Termine le jeu en cas de game over
function gameOver() {
  isGameOver = true; // Indique que le jeu est terminé
  cancelAnimationFrame(animationFrameId); // Arrête la boucle du jeu
}

// Affiche le message de game over et l'instruction de redémarrage
function renderGameOver() {
  ctx.fillStyle = "black"; // Couleur du texte
  ctx.font = "48px serif"; // Police du texte
  ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2); // Affiche le texte au centre du canvas
  ctx.font = "24px serif"; // Police du texte pour l'instruction de redémarrage
  ctx.fillText("Appuyez sur 'R' pour redémarrer", canvas.width / 2 - 150, canvas.height / 2 + 40); // Affiche le texte en dessous du message Game Over
}

// Redémarre le jeu
function restartGame() {
  isGameOver = false; // Réinitialise l'état du jeu
  player = new Player(canvas.width, canvas.height); // Réinitialise le joueur
  enemy = new Enemy(canvas.width, canvas.height); // Réinitialise l'ennemi
  wall = new Wall(canvas.width, canvas.height); // Réinitialise le mur
  projectiles = []; // Vide la liste des projectiles
  gameLoop(); // Relance la boucle du jeu
}

let animationFrameId;

// Boucle principale du jeu
function gameLoop() {
  update(); // Met à jour l'état du jeu
  render(); // Affiche le jeu
  if (!isGameOver) {
    animationFrameId = requestAnimationFrame(gameLoop); // Continue la boucle du jeu si ce n'est pas terminé
  }
}

// Tir des projectiles par l'ennemi toutes les 2 secondes
setInterval(() => {
  if (!isGameOver) {
    const projectile = new Projectile(
      enemy.x + enemy.width,
      enemy.y + enemy.height / 2 - 5,
      5
    );
    projectiles.push(projectile);
  }
}, 2000);

gameLoop(); // Démarre la boucle du jeu
