class Projectile {
  constructor(x, y, width, height, color, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
  }

  update() {
    this.x += this.speed; // Les projectiles se déplacent horizontalement
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
setInterval(() => {
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