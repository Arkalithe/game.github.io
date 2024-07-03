import { GameObject } from "./gameObject.js";

export class Wall extends GameObject {
  constructor(x, y, width = 50, height = 1000, color = "blue") {
    super(x, y, width, height, color);
  }
}

// Initialise les murs avec des paramètres spécifiques
export function initializeWalls(walls, canvas) {
  const wallParams = [
    { x: canvas.width / 2, y: canvas.height - 150, width: 50, height: 100 },
    {
      x: canvas.width * 1.9,
      y: canvas.height - 100,
      width: 80,
      height: 50,
      color: "red",
    },
    {
      x: canvas.width * 1.8,
      y: canvas.height - 200,
      width: 80,
      height: 100,
      color: "red",
    },
    {
      x: canvas.width * 1.9,
      y: canvas.height - 300,
      width: 80,
      height: 50,
      color: "red",
    },
    {
      x: canvas.width * 1.8,
      y: canvas.height - 450,
      width: 50,
      height: 400,
      color: "red",
    },
    {
      x: canvas.width * 1.925,
      y: canvas.height - 400,
      width: 60,
      height: 100,
      color: "red",
    },
    {
      x: canvas.width * 1.95,
      y: canvas.height - 450,
      width: 50,
      height: 500,
      color: "red",
    },
    {
      x: canvas.width * 1.9 - 3550,
      y: canvas.height - 500,
      width: 3550,
      height: 50,
      color: "red",
    },
    {
      x: canvas.width * 1,
      y: canvas.height - 450,
      width: 50,
      height: 400,
      color: "red",
    },
    {
      x: canvas.width * 1 + 125,
      y: canvas.height - 100,
      width: 900,
      height: 100,
      color: "red",
    },
  ];
  wallParams.forEach((params) =>
    walls.push(
      new Wall(params.x, params.y, params.width, params.height, params.color)
    )
  );
}
