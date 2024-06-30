// recuperation de l'élément canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//Variable du jeu
let player = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  width: 50,
  height: 50,
  color: 'blue',
  speed: 5,
};

let keys = {};

//Event listener pour les impute utilisateur
document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

//Fonction pour mettre a jour les objet du jeu
function update() {
  if (keys["d"] && player.x > 0) {
    player.x -= player.speed;
  }
  if (keys["q"] && player.x > 0) {
    player.x += player.speed;
  }
};

//Fonction pour afficher les objet du jeux
function render() {
  ctx.clearReact(0, 0, canvas.width, canvas, height);
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
};
//Fonction Boucle du jeux
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
};

gameLoop();