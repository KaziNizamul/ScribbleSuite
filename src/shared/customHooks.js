import { useEffect } from 'react';

export const useCanvasContext = (
  canvasRef,
  selectedColor,
  size,
) => {
  /* init */
  let canvas = null;
  let context = null;

  /* rename canvas and getContext */
  if (canvasRef.current) {
    canvas = canvasRef.current;
    context = canvas.getContext('2d');
  }

  useEffect(() => {
    /* if you dont have canvasRef, then dont proceed */
    if (!canvas) {
      return;
    }
    /* now, we can stroke it, in given size */
    const changeConfig = () => {
      context.strokeStyle = selectedColor;
      context.lineWidth = size;
    }

    changeConfig();
  }, [canvas, context, selectedColor, size]);

  /*  we are dealing with just canvas, and context,
      so we might need just it later.
  */
  return { 
    canvas,
    context,
  }
};