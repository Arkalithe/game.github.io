import { GameObject } from "./gameObject.js";

export class Portal extends GameObject {
  constructor(x, y, width = 100, height = 100, color = "purple") {
    super(x, y, width, height, color);
  }

  checkCollision(player) {
    return super.checkCollision(player);
  }
}