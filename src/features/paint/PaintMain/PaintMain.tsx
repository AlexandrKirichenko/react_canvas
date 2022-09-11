import { FC, useEffect, useRef, useState } from 'react';
import { TOOL_TYPE, ToolInstanceType, ToolTypeName } from '../types';
import { ToolBar } from '../ToolBar';
import { TOOLS_WITH_CLASSIC_PROPERTIES } from '../config';
import styles from './PaintMain.module.scss';

export const PaintMain: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<ToolInstanceType | null>(null);

  const [fillStyle, setFillStyle] =
    useState<CanvasRenderingContext2D['fillStyle']>('#000000');

  const [strokeStyle, setStrokeStyle] =
    useState<CanvasRenderingContext2D['strokeStyle']>('#000000');

  const [lineWidth, setLineWidth] = useState<number>(3);

  useEffect(() => {
    if (tool) {
      tool.strokeColor = strokeStyle;
      tool.fillColor = fillStyle;
      tool.lineWidth = lineWidth;
    }
  }, [fillStyle, strokeStyle, lineWidth]);

  useEffect(() => {
    if (canvasRef.current) {
      createTool('brush');
    }
  }, []);

  const createTool = (toolType: ToolTypeName) => {
    if (!canvasRef.current) {
      return;
    }
    const tool = new TOOL_TYPE[toolType](canvasRef.current);

    if (TOOLS_WITH_CLASSIC_PROPERTIES.includes(toolType)) {
      tool.strokeColor = strokeStyle;
      tool.fillColor = fillStyle;
      tool.lineWidth = lineWidth;
    } else if (toolType === 'eraser') {
      tool.strokeColor = '#FFFFFF';
      tool.fillColor = '#FFFFFFF';
      tool.lineWidth = lineWidth;
    }

    setTool(tool);
  };

  const handleSetTool = (toolType: ToolTypeName) => {
    if (!canvasRef.current) {
      return;
    }
    createTool(toolType);
  };

  return (
    <div className={styles.wrap}>
      <div>
        <ToolBar
          setTool={handleSetTool}
          setFillStyle={setFillStyle}
          setStrokeStyle={setStrokeStyle}
          lineWidth={lineWidth}
          setLineWidth={setLineWidth}
        />
      </div>
      <div>
        <canvas
          className={styles.canvas}
          ref={canvasRef}
          width={800}
          height={600}
          style={{ backgroundColor: 'white' }}
        />
      </div>
    </div>
  );
};
