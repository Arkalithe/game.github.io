const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player;
let enemy;
let projectiles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;
    if (!player) {
        player = new Player(canvas.width, canvas.height);
        enemy = new Enemy(canvas.width, canvas.height);
    } else {
        player.x = canvas.width / 2 - player.width / 2;
        player.y = canvas.height - player.height - 10;
        enemy.x = canvas.width / 4 - enemy.width / 2;
        enemy.y = canvas.height - enemy.height - 10;
    }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function update() {
    player.updatePosition(keys, canvas.width, canvas.height);

    projectiles.forEach((projectile, index) => {
        projectile.update();
        if (projectile.x > canvas.width) {
            projectiles.splice(index, 1); // Retire le projectile s'il sort de l'écran
        }
    });
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.render(ctx);
    enemy.render(ctx);

    projectiles.forEach(projectile => projectile.render(ctx));
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();

setInterval(() => {
    // Ajoute un projectile tiré par l'ennemi toutes les 2 secondes
    const projectile = new Projectile(
        enemy.x + enemy.width,
        enemy.y + enemy.height / 2 - 5,
        10,
        10,
        'red',
        5
    );
    projectiles.push(projectile);
}, 2000);
