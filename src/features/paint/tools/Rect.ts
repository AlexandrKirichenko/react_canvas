import Tool from './Tool';

export default class Rect extends Tool {
  private select = false;
  private selected = false;
  private savedCtx = {};
  private isDrawing = false;
  private imageData = {};
  private paste = false;
  private mouseDown = false;
  private startX = 0;
  private startY = 0;
  private saved = '';
  private width = 0;
  private height = 0;
  private imData: any = null;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.canvas.tabIndex = 1000;
    this.listen();
  }

  listen(): void {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onkeydown = this.keyDownHandler.bind(this);
  }

  keyDownHandler(e: any) {
    // if (!e.target) {
    //   return;
    // }
    // const target = e.target as HTMLElement;
    e.preventDefault();
    const char = String.fromCharCode(e.which).toLowerCase();

    if ((e.ctrlKey || e.metaKey) && char === 'c') {
      console.log('ctrl+c');
      this.copyFragment();
      // this.ctx.putImageData(this.imData, 0, 0);
      console.log('paste', this.paste);
    }

    // ctrl+v
    if ((e.ctrlKey || e.metaKey) && char === 'v') {
      console.log('ctrl+v');
      this.paste = true;
      console.log('paste', this.paste);
      this.ctx.putImageData(this.imData, 0, 0);
    }

    // ctrl+x
    if ((e.ctrlKey || e.metaKey) && char === 'x') {
      console.log('ctrl+x');
      this.copyFragment();
      if (this.height) {
        // this.ctx.current.clearRect(
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); my vers
        this.ctx.clearRect(
          this.startX,
          this.startY,
          this.canvas.width,
          this.canvas.height,
        );
      }
      this.saved = this.canvas.toDataURL();
    }
  }

  copyFragment = () => {
    if (this.height) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.imageData =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.ctx.getImageData(
          this.startX,
          this.startY,
          this.canvas.width,
          this.canvas.height,
        );
      console.log(this.imageData);
    }
  };

  mouseUpHandler(): void {
    this.mouseDown = false;

    if (this.paste) {
      this.paste = false;
    }
    this.saved = this.canvas.toDataURL();
  }
  mouseDownHandler(e: MouseEvent): void {
    if (!e.target) {
      return;
    }
    if (this.imData) {
      this.ctx.putImageData(this.imData, 0, 0);
    }

    const target = e.target as HTMLElement;
    this.mouseDown = true;
    this.ctx.beginPath();
    this.select = true;
    // setIsDrawing(false);????
    this.imData = this.ctx.getImageData(0, 0, 800, 600);
    // this.ctx.clearRect(0, 0, 800, 600);
    this.startX = e.pageX - target.offsetLeft;
    this.startY = e.pageY - target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }
  mouseMoveHandler(e: MouseEvent): void {
    if (!e.target) {
      return;
    }
    // if (!this.isDrawing) {
    //   this.ctx.beginPath();
    //   this.ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    //   this.isDrawing = true;
    // }
    const target = e.target as HTMLElement;
    if (this.mouseDown) {
      const currentX = e.pageX - target.offsetLeft;
      const currentY = e.pageY - target.offsetTop;
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;
      this.draw(this.startX, this.startY, this.width, this.height, e);
    }
  }

  // startDrawing = (e: any) => {
  //   if (!this.isDrawing) {
  //     this.ctx.beginPath();
  //     this.ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  //     this.isDrawing = true;
  //   }
  //   if (this.select) {
  //     this.select = true;
  //     this.isDrawing = false;
  //     this.savedCtx = this.ctx.getImageData(0, 0, 1280, 660);
  //     this.saved = this.canvas.toDataURL();
  //     this.startX = e.nativeEvent.offsetX;
  //     this.startY = e.nativeEvent.offsetY;
  //   }
  // };

  draw(x: number, y: number, w: number, h: number, e: any): void {
    if (this.select) {
      // const img = new Image();
      const img = new Image();
      // const imgData = this.ctx.getImageData(0, 0, 800, 600);

      img.src = this.saved;
      img.onload = () => {
        this.ctx.clearRect(0, 0, 800, 600);
        // this.ctx.putImageData(imgData, 0, 0);
        this.ctx.drawImage(img, 0, 0, 800, 600);
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'blue';
        this.ctx.setLineDash([10, 10]);
        this.ctx.rect(x, y, w, h);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        this.ctx.fillStyle = 'transparent';
        // this.ctx.strokeStyle = strokeStyle;???
        // this.ctx.strokeStyle = lineWidth;???
      };
    }
    if (this.paste) {
      if (this.height) {
        const img = new Image();
        img.src = this.saved;
        console.log('saved', this.saved);
        // console.log("img in paste data", img);
        this.ctx.clearRect(0, 0, 800, 600);
        this.ctx.drawImage(img, 0, 0, 800, 600);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        console.log('IMGGGGGGGGGGGGGGGGGGGDATA', this.imageData);
        this.ctx.putImageData(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.imageData,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          e.nativeEvent.offsetX - this.imageData.width / 2,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          e.nativeEvent.offsetY - this.imageData.height / 2,
        );
      }
    }
  }
}
// }

// const endDrawing = (e) => {
//   if (isDrawing) {
//     contextRef.current.closePath();
//     setIsDrawing(false);
//   }
//   if (selection) {
//     if (isSelection) {
//       setArea({
//         ...area,
//         endX: e.nativeEvent.offsetX,
//         endY: e.nativeEvent.offsetY,
//       });
//       setSelection(false);
//       setIsSelection(false);
//       contextRef.current.putImageData(savedContext, 0, 0);
//       console.log('imageData', imageData)
//     }
//   }
//   console.log('imageData', imageData)
//   if (paste) {
//     setPaste(false);
//   }
//   // save new canvas paintings every time user ends drawing
//   setSaved(canvasRef.current.toDataURL());
// };

// import Tool from './Tool';
//
// export default class Rect extends Tool {
//   private select = false;
//   private selected = false;
//   private imageData = {};
//   private paste = false;
//   private mouseDown = false;
//   private startX = 0;
//   private startY = 0;
//   private saved = '';
//   private width = 0;
//   private height = 0;
//
//   constructor(canvas: HTMLCanvasElement) {
//     super(canvas);
//     this.listen();
//   }
//
//   listen(): void {
//     this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
//     this.canvas.onmousedown = this.mouseDownHandler.bind(this);
//     this.canvas.onmouseup = this.mouseUpHandler.bind(this);
//     this.canvas.onkeydown = this.mouseKeyDownHandler.bind(this);
//   }
//
//   mouseKeyDownHandler(e: any) {
//     // if (!e.target) {
//     //   return;
//     // }
//     // const target = e.target as HTMLElement;
//     e.preDefault();
//     const char = (String as any).fromchar(e.which).toLowerCase();
//
//     if ((e.ctrlKey || e.metaKey) && char === 'c') {
//       console.log('ctrl+c');
//       this.copyFragment();
//     }
//
//     // ctrl+v
//     if ((e.ctrlKey || e.metaKey) && char === 'v') {
//       console.log('ctrl+v');
//       this.paste = true;
//     }
//
//     // ctrl+x
//     if ((e.ctrlKey || e.metaKey) && char === 'x') {
//       console.log('ctrl+x');
//       this.copyFragment();
//       if (this.height) {
//         // this.ctx.current.clearRect(
//         this.ctx.clearRect(0, 0, 800, this.canvas.height);
//       }
//       this.saved = this.canvas.toDataURL();
//     }
//   }
//
//   copyFragment = () => {
//     if (this.height) {
//       // @ts-ignore
//       Object.assign(
//         {},
//         this.itemData(
//           // @ts-ignore
//           this.ctx.current.getImageData(
//             0,
//             0,
//             800,
//             this.canvas.height,
//           ),
//         ),
//       );
//     }
//   };
//
//   mouseUpHandler(): void {
//     this.mouseDown = false;
//   }
//   mouseDownHandler(e: MouseEvent): void {
//     if (!e.target) {
//       return;
//     }
//     const target = e.target as HTMLElement;
//     this.mouseDown = true;
//     this.ctx.beginPath();
//     this.select = true;
//     // setIsDrawing(false);????
//     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     this.startX = e.pageX - target.offsetLeft;
//     this.startY = e.pageY - target.offsetTop;
//     this.saved = this.canvas.toDataURL();
//   }
//   mouseMoveHandler(e: MouseEvent): void {
//     if (!e.target) {
//       return;
//     }
//     const target = e.target as HTMLElement;
//     if (this.mouseDown) {
//       const currentX = e.pageX - target.offsetLeft;
//       const currentY = e.pageY - target.offsetTop;
//       this.width = currentX - this.startX;
//       this.height = currentY - this.startY;
//       this.draw(this.startX, this.startY, this.width, this.height);
//     }
//   }
//
//   draw(x: number, y: number, w: number, h: number): void {
//     if (this.select) {
//       const img = new Image();
//       img.src = this.saved;
//       img.onload = () => {
//         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//         this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
//         this.ctx.lineWidth = 1;
//         this.ctx.strokeStyle = 'blue';
//         this.ctx.setLineDash([10, 10]);
//         this.ctx.beginPath();
//         this.ctx.rect(x, y, w, h);
//         this.ctx.fill();
//         this.ctx.stroke();
//         this.ctx.setLineDash([]);
//         // this.ctx.strokeStyle = strokeStyle;???
//         // this.ctx.strokeStyle = lineWidth;???
//       };
//     }
//     if (this.height) {
//       const img = new Image();
//       img.src = this.saved;
//       // console.log("img in paste data", img);
//       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//       this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
//       // @ts-ignore
//       this.ctx.putImageData(
//         // @ts-ignore
//         ...imageData,
//         e.nativeEvent.offsetX - this.imageData.width / 2,
//         e.nativeEvent.offsetY - this.imageData.height / 2,
//       );
//     }
//   }
// }
// // }
//
// // const endDrawing = (e) => {
// //   if (isDrawing) {
// //     contextRef.current.closePath();
// //     setIsDrawing(false);
// //   }
// //   if (selection) {
// //     if (isSelection) {
// //       setArea({
// //         ...area,
// //         endX: e.nativeEvent.offsetX,
// //         endY: e.nativeEvent.offsetY,
// //       });
// //       setSelection(false);
// //       setIsSelection(false);
// //       contextRef.current.putImageData(savedContext, 0, 0);
// //       console.log('imageData', imageData)
// //     }
// //   }
// //   console.log('imageData', imageData)
// //   if (paste) {
// //     setPaste(false);
// //   }
// //   // save new canvas paintings every time user ends drawing
// //   setSaved(canvasRef.current.toDataURL());
// // };
