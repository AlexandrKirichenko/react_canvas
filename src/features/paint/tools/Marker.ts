import Tool from './Tool';

export default class Marker extends Tool {
  mouseDown = false;
  paths: any[] = [];

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
    this.ctx.globalAlpha = 0.7;
  }

  listen(): void {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(): void {
    this.mouseDown = false;
  }
  mouseDownHandler(e: MouseEvent): void {
    this.mouseDown = true;
    const pos = this.getCursorPosition(e);

    if (this.paths) {
      this.paths.push([pos]);
    }
  }
  mouseMoveHandler(e: MouseEvent): void {
    if (!this.mouseDown) {
      return;
    }
    const pos = this.getCursorPosition(e);

    this.paths[this.paths.length - 1].push(pos);
    this.refresh();
  }

  getCursorPosition(e: MouseEvent) {
    return {
      x: e.clientX - this.canvasPos.left,
      y: e.clientY - this.canvasPos.top,
    };
  }

  refresh() {
    this.ctx.clearRect(0, 0, 800, 600);

    for (let i = 0; i < this.paths.length; ++i) {
      if (this.paths[i]?.length < 1) {
        continue;
      }
      this.ctx.globalAlpha = 0.7;
      this.ctx.lineWidth = 15;
      this.ctx.beginPath();

      this.ctx.moveTo(this.paths[i]?.[0].x, this.paths[i]?.[0].y);

      for (let j = 1; j < this.paths[i]?.length; ++j) {
        this.ctx.lineTo(this.paths[i]?.[j].x, this.paths[i]?.[j].y);
      }

      this.ctx.stroke();
    }
  }
}
