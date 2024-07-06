import { Player } from "./player.js";
import { Enemy, initializeEnemies } from "./enemy.js";
import { LaserEnemy, initializeLaserEnemies } from "./laserEnemy.js";
import { initializeWalls, initializeBossArenaWalls } from "./wall.js";
import { Portal } from "./portal.js";
import { Controle } from "./controle.js";
import { GreenCross, initializeGreenCrosses } from "./greenCross.js";
import { update } from "./update.js";
import { render } from "./render.js";
import { initializeMessages } from "./message.js";
import { Boss } from "./boss.js";

export let keys = {}; // Définir la variable keys

export let player;
export let portal;

let enemies = [];
let laserEnemies = [];
let walls = [];
let projectiles = [];
let greenCrosses = []; // Change greenCross to greenCrosses
const messages = [];

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

window.isGameOver = false; // Définir isGameOver
window.isLevelCompleted = false; // Définir isLevelCompleted

let controle;

let boss = null; // Variable pour stocker le boss
let isBossFight = false; // Indicateur pour savoir si le combat contre le boss est en cours

window.endLevel = function () {
  window.isGameOver = true;
  // Ajoutez ici le code pour terminer le niveau
};

function startBossFight() {
  isBossFight = true;
  window.isGameOver = false; // Assurez-vous que le jeu ne se termine pas
  initializeBossArena();
}

function initializeBossArena() {
  walls = [];
  enemies = [];
  laserEnemies = [];
  greenCrosses = [];
  messages.length = 0; // Clear previous messages
  projectiles = [];

  initializeBossArenaWalls(walls, canvas);

  boss = new Boss(canvas.width, canvas.height);
  player.x = canvas.width / 2 - player.width / 2; // Reposition player
  player.y = canvas.height - player.height - 50; // At the bottom of the arena
}

function resizeCanvas() {
  canvas.width = 1400;
  canvas.height = 700;
  if (!player) {
    player = new Player(canvas.width, canvas.height);
    player.scrollOffset = 0;
    portal = new Portal(canvas.width * 2, canvas.height - 100);
    initializeWalls(walls, canvas);
    initializeEnemies(enemies, canvas);
    initializeLaserEnemies(laserEnemies, canvas);
    initializeGreenCrosses(greenCrosses, canvas);
    initializeMessages(messages, canvas);
  }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

export function restartGame() {
  window.isGameOver = false;
  player = new Player(canvas.width, canvas.height);
  player.scrollOffset = 0; // Réinitialiser scrollOffset
  portal = new Portal(canvas.width * 2, canvas.height - 100);
  walls = [];
  enemies = [];
  laserEnemies = [];
  greenCrosses = [];
  initializeWalls(walls, canvas);
  initializeEnemies(enemies, canvas);
  initializeLaserEnemies(laserEnemies, canvas);
  initializeGreenCrosses(greenCrosses, canvas);
  initializeMessages(messages, canvas);
  projectiles = [];
  player.jumpCount = 0; // Réinitialiser le compteur de sauts
  controle.updatePlayerAndPortal(player, portal); // Mettre à jour le joueur et le portail dans la classe Controle
  boss = null; // Réinitialiser le boss
  isBossFight = false; // Réinitialiser l'indicateur de combat contre le boss
  gameLoop();
}

window.restartGame = restartGame;

function gameLoop() {
  update(
    player,
    enemies,
    laserEnemies,
    projectiles,
    walls,
    keys,
    canvas,
    greenCrosses,
    portal,
    boss,
    isBossFight,
    startBossFight
  );
  render(
    ctx,
    canvas,
    player,
    enemies,
    laserEnemies,
    portal,
    greenCrosses,
    walls,
    projectiles,
    messages,
    player.scrollOffset,
    boss,
    isBossFight
  );
  if (!window.isGameOver) {
    window.animationFrameId = requestAnimationFrame(gameLoop);
  }
}

gameLoop();
controle = new Controle(keys, player, portal, startBossFight);
