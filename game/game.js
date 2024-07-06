import { Player } from "./player.js";
import { Enemy, initializeEnemies } from "./enemy.js";
import { LaserEnemy } from "./laserEnemy.js";
import { initializeWalls } from "./wall.js";
import { Portal } from "./portal.js";
import { Projectile } from "./projectile.js";
import { Controle } from "./controle.js";
import { GreenCross } from "./greenCross.js";
import { update } from "./update.js";
import { render } from "./render.js";

export let keys = {}; // Définir la variable keys

export let player;
export let portal;
export let greenCross;

let enemies = [];
let laserEnemy;
let walls = [];
let projectiles = [];

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

window.isGameOver = false; // Définir isGameOver
window.isLevelCompleted = false; // Définir isLevelCompleted

let controle;

window.endLevel = function () {
  window.isGameOver = true;
  // Ajoutez ici le code pour terminer le niveau
};

function resizeCanvas() {
  canvas.width = 1400;
  canvas.height = 700;
  if (!player) {
    player = new Player(canvas.width, canvas.height);
    player.scrollOffset = 0; // Initialiser scrollOffset
    laserEnemy = new LaserEnemy(canvas.width, canvas.height);
    portal = new Portal(canvas.width * 2, canvas.height - 100);
    greenCross = new GreenCross(canvas.width / 2 + 100, canvas.height - 50);
    initializeWalls(walls, canvas);
    initializeEnemies(enemies, canvas);
  }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

export function restartGame() {
  window.isGameOver = false;
  player = new Player(canvas.width, canvas.height);
  player.scrollOffset = 0; // Réinitialiser scrollOffset
  laserEnemy = new LaserEnemy(canvas.width, canvas.height);
  portal = new Portal(canvas.width * 2, canvas.height - 100);
  greenCross = new GreenCross(canvas.width / 2 + 100, canvas.height - 50);
  walls = [];
  enemies = [];
  initializeWalls(walls, canvas);
  initializeEnemies(enemies, canvas);
  projectiles = [];
  player.jumpCount = 0; // Réinitialiser le compteur de sauts
  controle.updatePlayerAndPortal(player, portal); // Mettre à jour le joueur et le portail dans la classe Controle
  gameLoop();
}

window.restartGame = restartGame;

function gameLoop() {
  update(
    player,
    enemies,
    laserEnemy,
    projectiles,
    walls,
    keys,
    canvas,
    greenCross
  );
  render(
    ctx,
    canvas,
    player,
    enemies,
    laserEnemy,
    portal,
    greenCross,
    walls,
    projectiles,
    player.scrollOffset
  );
  if (!window.isGameOver) {
    window.animationFrameId = requestAnimationFrame(gameLoop);
  }
}

gameLoop();
controle = new Controle(keys, player, portal);
