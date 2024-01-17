import { useEffect, useLayoutEffect, useRef } from 'react';
/* external imports */
import { useDispatch, useSelector } from 'react-redux';
/* utility */
import BoardUtils from './Board.utils';
/* constants */
import { MENU_ITEM_ICON } from '../Menu/constant/Menu.constant';
import { actionableMenuItemClick } from '@/core/slices/Menu.slice';

const Board = () => {
  const canvasRef = useRef(null);
  const shouldDrawRef = useRef(null);

  const dispatch = useDispatch();

  const { activeMenuItem, actionableMenuItem } = useSelector((state) => state.menu);
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
    const { canvas } = BoardUtils.getCanvasAndContext(canvasRef);
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
    const { context } = BoardUtils.getCanvasAndContext(canvasRef);

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

  /* actionable useEffect */
  useEffect(() => {
    const { canvas } = BoardUtils.getCanvasAndContext(canvasRef);
    
    if (!canvas) {
      return;
    }

    switch(actionableMenuItem) {
      case MENU_ITEM_ICON.DOWNLOAD: {
        BoardUtils.downloadCanvas(canvasRef);
      }
      case MENU_ITEM_ICON.UNDO: {
        
      }
      case MENU_ITEM_ICON.REDO: {

      }
      default: break;
    }
    dispatch(actionableMenuItemClick(null));
  }, [actionableMenuItem, dispatch]);

  return (
    <canvas
      ref={canvasRef}
    >
    </canvas>
  )
}

export default Board;
