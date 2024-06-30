class Player {
    constructor(canvasWidth, canvasHeight) {
        this.width = 50;
        this.height = 50;
        this.color = 'blue';
        this.speed = 5;
        this.jumpPower = 7;
        this.gravity = 0.3;
        this.x = canvasWidth / 2 - this.width / 2;
        this.y = canvasHeight - this.height - 10;
        this.vy = 0;
        this.isJumping = false;
        this.canDoubleJump = true;
        this.rotation = 0;
    }

    updatePosition(keys, canvasWidth, canvasHeight) {
        if (keys['q'] && this.x > 0) {
            this.x -= this.speed;
        }
        if (keys['d'] && this.x < canvasWidth - this.width) {
            this.x += this.speed;
        }

        // Applique la gravité
        this.vy += this.gravity;
        this.y += this.vy;

        // Vérifie si le joueur touche le sol
        if (this.y + this.height > canvasHeight) {
            this.y = canvasHeight - this.height;
            this.vy = 0;
            this.isJumping = false;
            this.canDoubleJump = true; // Réinitialise la possibilité de double saut lorsque le joueur touche le sol
            this.rotation = 0; // Réinitialise la rotation lorsque le joueur touche le sol
        } else {
            this.rotation += 0.1; // Fait tourner le joueur pendant le saut
        }
    }

    render(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        ctx.translate(-this.width / 2, -this.height / 2);
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore();
    }
}