import { useEffect, useLayoutEffect, useRef } from 'react';
/* external imports */
import { useSelector } from 'react-redux';
import BoardUtils from './Board.utils';

const Board = () => {
  const canvasRef = useRef(null);
  const shouldDrawRef = useRef(null);

  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const {
    color: selectedColor,
    size
  } = useSelector((state) => state.toolbox[activeMenuItem]);

 
  /*
    @hint: 
      1. beginPath
      2. moveTo
      3. lineTo
      4. stroke
  */
  const onMouseDown = (evt) => {
    const { canvas, context } = BoardUtils.getCanvasAndContext(canvasRef);
    if (!canvas) {
      return;
    }
    shouldDrawRef.current = true;
    BoardUtils.beginDrawing({
      canvasRef,
      x: evt.clientX,
      y: evt.clientY,
    })
  };

  const onMouseMove = (evt) => {
    const { canvas, context } = BoardUtils.getCanvasAndContext(canvasRef);
    if (!canvas || !shouldDrawRef.current) {
      return;
    }

    context.lineTo(evt.clientX, evt.clientY);
    context.stroke();
    BoardUtils.endDrawing({
      canvasRef,
      x: evt.clientX,
      y: evt.clientY,
    })
  };

  const onMouseUp = () => {
    shouldDrawRef.current = false;
  };

  /* UPDATE CANVAS WITH NEW COLOR OR BRUSH SIZE */
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const changeConfig = () => {
      context.strokeStyle = selectedColor;
      context.lineWidth = size;
    }

    changeConfig();
  }, [selectedColor, size]);

  useLayoutEffect(() => {
    BoardUtils.setupCanvas(canvasRef);

    const { canvas } = BoardUtils.getCanvasAndContext(canvasRef);
    if (!canvas) {
      return;
    }

    BoardUtils.attachEventListeners({
      canvas,
      onMouseDown,
      onMouseMove,
      onMouseUp
    });

    return () => {
      BoardUtils.removeEventListeners({
        canvas,
        onMouseDown,
        onMouseMove,
        onMouseUp,
      })
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
    >
    </canvas>
  )
}

export default Board;
