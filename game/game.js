import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { LaserEnemy } from "./laserEnemy.js";
import { initializeWalls } from "./wall.js";
import { Portal } from "./portal.js";
import { Projectile } from "./projectile.js";
import { Controle } from "./controle.js";
import { GreenCross } from "./greenCross.js";
import { update } from "./update.js";
import { render } from "./render.js";

export let keys = {}; // Définir la variable keys directement dans game.js

export let player;
export let portal;
export let greenCross;

let enemy;
let laserEnemy;
let walls = [];
let projectiles = [];

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

window.isGameOver = false; // Définir isGameOver sur l'objet window

// Déclarez cette variable en dehors des fonctions pour une portée globale
let controle;

function resizeCanvas() {
  canvas.width = 1400;
  canvas.height = 700;
  if (!player) {
    player = new Player(canvas.width, canvas.height);
    player.scrollOffset = 0; // Initialiser scrollOffset
    enemy = new Enemy(canvas.width, canvas.height);
    laserEnemy = new LaserEnemy(canvas.width, canvas.height);
    portal = new Portal(canvas.width * 2, canvas.height - 100);
    greenCross = new GreenCross(canvas.width / 2 + 100, canvas.height - 50);
    initializeWalls(walls, canvas);
  }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

export function restartGame() {
  window.isGameOver = false;
  console.log("Game Restarted");
  player = new Player(canvas.width, canvas.height);
  player.scrollOffset = 0; // Réinitialiser scrollOffset
  enemy = new Enemy(canvas.width, canvas.height);
  laserEnemy = new LaserEnemy(canvas.width, canvas.height);
  portal = new Portal(canvas.width * 2, canvas.height - 100);
  greenCross = new GreenCross(canvas.width / 2 + 100, canvas.height - 50); // Ajouter une nouvelle croix verte
  walls = [];
  initializeWalls(walls, canvas);
  projectiles = [];
  player.jumpCount = 0; // Réinitialise le compteur de sauts
  controle.updatePlayerAndPortal(player, portal); // Met à jour le joueur et le portail dans la classe Controle
  gameLoop();
}

// Attache restartGame à l'objet window
window.restartGame = restartGame;

function gameLoop() {
  update(player, enemy, laserEnemy, projectiles, walls, keys, canvas, greenCross);
  render(ctx, canvas, player, enemy, laserEnemy, portal, greenCross, walls, projectiles, player.scrollOffset);
  if (!window.isGameOver) {
    window.animationFrameId = requestAnimationFrame(gameLoop);
  }
}

// Tir des projectiles par l'ennemi toutes les 2 secondes
setInterval(() => {
  if (!window.isGameOver) {
    const projectile = new Projectile(
      enemy.x + enemy.width,
      enemy.y + enemy.height / 2 - 5,
      5
    );
    projectiles.push(projectile);
  }
}, 2000);

gameLoop();
controle = new Controle(keys, player, portal);