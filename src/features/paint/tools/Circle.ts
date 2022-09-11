import Tool from './Tool';

export default class Circle extends Tool {
  private mouseDown = false;
  private startX = 0;
  private startY = 0;
  private saved = '';

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
  }

  listen(): void {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseDownHandler(e: MouseEvent): void {
    if (!e.target) {
      return;
    }
    const target = e.target as HTMLElement;
    this.mouseDown = true;
    const canvasData = this.canvas.toDataURL();
    this.ctx.beginPath();
    this.startX = e.pageX - target.offsetLeft;
    this.startY = e.pageY - target.offsetTop;
    this.saved = canvasData;
  }

  mouseUpHandler(): void {
    this.mouseDown = false;
  }

  mouseMoveHandler(e: MouseEvent): void {
    if (!e.target) {
      return;
    }
    const target = e.target as HTMLElement;
    if (this.mouseDown) {
      const curentX = e.pageX - target.offsetLeft;
      const curentY = e.pageY - target.offsetTop;
      const width = curentX - this.startX;
      const height = curentY - this.startY;
      const r = Math.sqrt(width ** 2 + height ** 2);
      this.draw(this.startX, this.startY, r);
    }
  }

  draw(x: number, y: number, r: number): void {
    const img = new Image();
    img.src = this.saved;
    img.onload = async () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }
}
