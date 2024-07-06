import { GameObject } from "./gameObject.js";

export class Message extends GameObject {
  constructor(x, y, text) {
    super(x, y, 0, 0, "transparent"); 
    this.text = text;
  }

  render(ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.font = "20px serif";
    ctx.fillText(this.text, this.x, this.y);
  }
}

export function initializeMessages(messages, canvas) {
  const messageParams = [
    { text: "Utilisez les touches 'Q' et 'D' pour vous déplacer.", x: canvas.width / 2 - 650, y: canvas.height / 1.5 },
    { text: "Appuyez sur 'Espace' pour sauter.", x: canvas.width / 2 - 450, y: canvas.height / 1.3  },
    { text: "Vous pouvez faire un double saut avec'Espace' dans les air.", x: canvas.width / 2, y: canvas.height / 2 + 50 },
    { text: "Les croix vertes vous rendent toute votre vie.", x: canvas.width / 1.4, y: canvas.height / 1 - 50 }
  ];

  messageParams.forEach((params) => {
    messages.push(new Message(params.x, params.y, params.text));
  });
}