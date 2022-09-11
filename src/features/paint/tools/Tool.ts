export default class Tool {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw Error('ОШИБКА ПОУЧЕНИЯ CTX!');
    }

    this.ctx = ctx;
    this.destroyEvents();
  }

  set fillColor(color: CanvasRenderingContext2D['fillStyle']) {
    this.ctx.fillStyle = color;
  }
  set strokeColor(color: CanvasRenderingContext2D['strokeStyle']) {
    this.ctx.strokeStyle = color;
  }

  set lineWidth(width: number) {
    this.ctx.lineWidth = width;
  }

  destroyEvents(): void {
    this.canvas.onmousemove = null;
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
  }
}
