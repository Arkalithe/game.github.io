const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player;

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;
    if (!player) {
        player = new Player(canvas.width, canvas.height);
    } else {
        player.x = canvas.width / 2 - player.width / 2;
        player.y = canvas.height - player.height - 10;
    }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function update() {
    player.updatePosition(keys, canvas.width, canvas.height);
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.render(ctx);
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();