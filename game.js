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
  doubleJump: true, // Etat du double jump
  jumpPower: 10,
  gravity: 0.3,
  rotation: 0,
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
  keys[e.key.toLocaleLowerCase()] = true;
  if (e.key === " " && (player.isJumping === false || player.doubleJump)) {
    player.vy = -player.jumpPower;
    player.isJumping = true;
    if (player.doubleJump && player.y < canvas.height - player.height - 10) {
      player.doubleJump = false;
    }
  }
});

document.addEventListener("keyup", (e) => {
  keys[e.key.toLocaleLowerCase()] = false;
});

//Fonction pour mettre a jour les objet du jeu
function update() {
  if (keys["q"] && player.x > 0) {
    player.x -= player.speed;
  }
  if (keys["d"] && player.x < canvas.width - player.width) {
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
    player.doubleJump = true; //Reinitialise la possibilité du double jump
    player.rotation = 0;
  } else {
    player.rotation += 0.1;
  }
}

//Fonction pour afficher les objet du jeux
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Sauvegarde du context
  ctx.save();

  // deplacement du context joueure pour rotation
  ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
  ctx.rotate(player.rotation);
  ctx.translate(-player.width / 2, -player.height / 2);

  // apparence du joueur
  ctx.fillStyle = player.color;
  ctx.fillRect(0, 0, player.width, player.height);

  //restaurarion du ontext
  ctx.restore();
}

//Fonction Boucle du jeux
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

gameLoop();
