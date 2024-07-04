import { GameObject } from "./gameObject.js";

export class Enemy extends GameObject {
  constructor(canvasWidth, canvasHeight) {
    super(canvasWidth / 4 - 25, canvasHeight - 50, 50, 50, "green");
  }
}
