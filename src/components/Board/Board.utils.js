class BoardUtils {
  static setupCanvas = (canvasRef) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  }

  static getCanvasAndContext = (canvasRef) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    return {
      canvas,
      context,
    }
  }

  static attachEventListeners = ({
    canvas,
    onMouseDown,
    onMouseMove,
    onMouseUp
  }) => {
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
  }

  static removeEventListeners = ({
    canvas,
    onMouseDown,
    onMouseMove,
    onMouseUp
  }) => {
    canvas.removeEventListener('mousedown', onMouseDown);
    canvas.removeEventListener('mousemove', onMouseMove);
    canvas.removeEventListener('mouseup', onMouseUp);
  }

  static beginDrawing = ({
    canvasRef,
    x, 
    y,
  }) => {
    const { context } = BoardUtils.getCanvasAndContext(canvasRef);
    context.beginPath();
    context.moveTo(x, y);
  }

  static endDrawing = ({
    canvasRef,
    x, 
    y,
  }) => {
    const { context } = BoardUtils.getCanvasAndContext(canvasRef);
    context.lineTo(x, y);
    context.stroke();
  }
}

export default BoardUtils;