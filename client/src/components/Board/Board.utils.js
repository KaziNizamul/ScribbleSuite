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
    const context = canvas.getContext('2d', { willReadFrequently: true });
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

  static downloadCanvas = (canvasRef) => {
    /*
      # step 1: make url from canvas.toDataURL
      # step 2: create a anchor element

      # step 3:
      now anchor is created,
      and i need it to download the canvas, on its click
      that means, i need to attach href, with value url for this href

      # step 4:
      on download, i need to give it some name,

      # step 5:
      click it
    */
    const { canvas } = BoardUtils.getCanvasAndContext(canvasRef);
    // #1
    const URL = canvas.toDataURL();
    // #2
    const anchor = document.createElement('a');
    // #3
    anchor.href = URL;
    // #4
    anchor.download = 'sketch.png'; // naming filename
    // #5
    anchor.click();
  }

  static retrieveAndDisplayImg = (canvasRef, drawingHistory, historyPtr) => {
    const { context } = BoardUtils.getCanvasAndContext(canvasRef);
    const retrievedImg = drawingHistory.current[historyPtr.current];
    context.putImageData(retrievedImg, 0, 0);
  }
}

export default BoardUtils;