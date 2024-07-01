const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player;
let enemy;
let projectiles = [];
let isGameOver = false;

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
            projectiles.splice(index, 1);
        }
    });
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.render(ctx);
    player.renderHP(ctx);
    enemy.render(ctx);

    projectiles.forEach(projectile => projectile.render(ctx));
}

function detectCollisions() {
    projectiles.forEach((projectile, index) => {
        if (projectile.x < player.x + player.width &&
            projectile.x + projectile.width > player.x &&
            projectile.y < player.y + player.height &&
            projectile.y + projectile.height > player.y) {
            projectiles.splice(index, 1);
            player.hp -= 1;
            if (player.hp <= 0) {
                gameOver();
            }
        }
    });
}
function gameOver() {
    isGameOver = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.font = '48px serif';
    ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
    cancelAnimationFrame(animationFrameId);

}

let animationFrameId;

function gameLoop() {
    update();
    render();
    detectCollisions();
    if (!isGameOver) {
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}

gameLoop();

