// game.js

import { Player } from './player.js';
import { Enemy } from './enemy.js';
import { initializeWalls } from './wall.js';
import { Portal } from './portal.js';
import { Projectile } from './projectile.js';
import { Controle } from './controle.js';

export let keys = {}; // Définir la variable keys directement dans game.js

export let player;
export let isGameOver = false;
export let portal;

let enemy;
let walls = [];
let projectiles = [];
let scrollOffset = 0; // Offset de défilement horizontal

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Redimensionne le canvas et initialise les objets du jeu
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.9;
  if (!player) {
    player = new Player(canvas.width, canvas.height);
    enemy = new Enemy(canvas.width, canvas.height);
    portal = new Portal(canvas.width * 2, canvas.height - 100);
    initializeWalls(walls, canvas);
  }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Met à jour l'état du jeu
function update() {
  if (!isGameOver) {
    // Retirer le portail de la liste des objets à vérifier pour les collisions
    player.updatePosition(keys, canvas.width, canvas.height, [...walls, enemy]);
    projectiles.forEach((projectile, index) => {
      projectile.update();
      if (projectile.x > canvas.width || walls.some(wall => wall.checkCollision(projectile))) {
        projectiles.splice(index, 1);
      }
    });
    detectCollisions();
    handleScrolling();
  }
}

// Gère le défilement horizontal du jeu
function handleScrolling() {
  if (player.x > canvas.width * 0.7 + scrollOffset) {
    scrollOffset = player.x - canvas.width * 0.7;
  } else if (player.x < canvas.width * 0.3 + scrollOffset && scrollOffset > 0) {
    scrollOffset = player.x - canvas.width * 0.3;
  }
}

// Affiche les éléments du jeu
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(-scrollOffset, 0);
  enemy.render(ctx);
  portal.render(ctx);
  walls.forEach(wall => wall.render(ctx));
  projectiles.forEach(projectile => projectile.render(ctx));
  player.render(ctx);
  player.renderHP(ctx);
  ctx.restore();
  if (player.isNear(portal)) {
    renderPortalMessage();
  }
  if (isGameOver) {
    renderGameOver();
  }
}

// Affiche le message lorsque le joueur est proche du portail
function renderPortalMessage() {
  ctx.fillStyle = "black";
  ctx.font = "24px serif";
  ctx.fillText("Appuyez sur 'E' pour terminer le niveau", canvas.width / 2 - 150, canvas.height / 2 - 50);
}

// Détecte les collisions entre les projectiles et le joueur
function detectCollisions() {
  projectiles.forEach((projectile, index) => {
    if (projectile.checkCollision(player)) {
      projectiles.splice(index, 1);
      player.hp -= 1;
      if (player.hp <= 0) {
        gameOver();
      }
    }
  });
}

// Termine le jeu en cas de game over
function gameOver() {
  isGameOver = true;
  cancelAnimationFrame(animationFrameId);
}

// Affiche le message de game over et l'instruction de redémarrage
function renderGameOver() {
  ctx.fillStyle = "black";
  ctx.font = "48px serif";
  ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
  ctx.font = "24px serif";
  ctx.fillText("Appuyez sur 'R' pour redémarrer", canvas.width / 2 - 150, canvas.height / 2 + 40);
}

// Terminer le niveau et afficher le message de fin de niveau
export function endLevel() {
  isGameOver = true;
  cancelAnimationFrame(animationFrameId);
  ctx.fillStyle = "black";
  ctx.font = "48px serif";
  ctx.fillText("Niveau Terminé!", canvas.width / 2 - 150, canvas.height / 2);
}

// Attache endLevel à l'objet window
window.endLevel = endLevel;

// Redémarre le jeu
export function restartGame() {
  isGameOver = false;
  scrollOffset = 0;
  player = new Player(canvas.width, canvas.height);
  enemy = new Enemy(canvas.width, canvas.height);
  portal = new Portal(canvas.width * 2, canvas.height - 100);
  walls = [];
  initializeWalls(walls, canvas);
  projectiles = [];
  gameLoop();
}

let animationFrameId;

// Boucle principale du jeu
function gameLoop() {
  update();
  render();
  if (!isGameOver) {
    animationFrameId = requestAnimationFrame(gameLoop);
  }
}

// Tir des projectiles par l'ennemi toutes les 2 secondes
setInterval(() => {
  if (!isGameOver) {
    const projectile = new Projectile(enemy.x + enemy.width, enemy.y + enemy.height / 2 - 5, 5);
    projectiles.push(projectile);
  }
}, 2000);

gameLoop();
new Controle(keys, player, portal);
