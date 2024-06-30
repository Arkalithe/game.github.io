// recuperation de l'élément canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//Variable du jeu
let player = {
  width: 50,
  height: 50,
  color: "blue",
  speed: 5,
  x: 0, //position initial
  y: 0, //poition inital
  vy: 0, // Vitesse Verticale
  isJumping: false, // Etat du saut
  jumpPower: 10,
  gravity: 1,
};

//Fonction pour redimensionner le canvas
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.9;
  //centre le joueur sur le canvas
  player.x = canvas.width / 2 - player.width / 2;
  player.y = canvas.height - player.height - 10;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let keys = {};

//Event listener pour les impute utilisateur

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  if (e.key === " " && !player.isJumping) {
    player.vy = -player.jumpPower;
    player.isJumping = true;
  }
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

//Fonction pour mettre a jour les objet du jeu
function update() {
  if (keys["ArrowLeft"] && player.x > 0) {
    player.x -= player.speed;
  }
  if (keys["ArrowRight"] && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }

  //application de la gravité
  player.vy += player.gravity;
  player.y += player.vy;

  //verifi si le joueur touche le sol
  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
    player.vy = 0;
    player.isJumping = false;
  }
}

//Fonction pour afficher les objet du jeux
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

//Fonction Boucle du jeux
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

gameLoop();
