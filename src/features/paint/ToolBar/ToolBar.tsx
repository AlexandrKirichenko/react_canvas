import { Dispatch, FC } from 'react';
import { ToolTypeName } from '../types';
import styles from './ToolBar.module.scss';

interface ToolBarProps {
  setTool: (toolType: ToolTypeName) => void;
  setFillStyle: Dispatch<CanvasRenderingContext2D['fillStyle']>;
  setStrokeStyle: Dispatch<CanvasRenderingContext2D['strokeStyle']>;
  lineWidth: number;
  setLineWidth: Dispatch<number>;
}

export const ToolBar: FC<ToolBarProps> = ({
  setTool,
  setStrokeStyle,
  setFillStyle,
  lineWidth,
  setLineWidth,
}) => {
  return (
    <div className={styles.wrap}>
      <button className={styles.toolButton} onClick={() => setTool('brush')}>
        brush
      </button>

      <button className={styles.toolButton} onClick={() => setTool('eraser')}>
        eraser
      </button>

      <button className={styles.toolButton} onClick={() => setTool('circle')}>
        circle
      </button>

      <button className={styles.toolButton} onClick={() => setTool('line')}>
        line
      </button>

      <button className={styles.toolButton} onClick={() => setTool('rect')}>
        rect
      </button>

      <span className={styles.toolColor}>
        <label>fill</label>
        <input type="color" onChange={(e) => setFillStyle(e.target.value)} />
      </span>

      <span className={styles.toolColor}>
        <label>stroke</label>
        <input type="color" onChange={(e) => setStrokeStyle(e.target.value)} />
      </span>

      <span className={styles.toolLineWidth}>
        <label>lineWidth</label>
        <input
          type="number"
          onChange={(e) => setLineWidth(Number.parseInt(e.target.value))}
          value={lineWidth}
          max={20}
          min={1}
        />
      </span>
    </div>
  );
};
