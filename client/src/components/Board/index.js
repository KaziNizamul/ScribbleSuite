"use client";
import { useEffect, useRef } from "react";
import useLayoutEffect from "@/shared/useIsomorphicLayoutHook";
/* external imports */
import { useDispatch, useSelector } from "react-redux";
import { socket } from "@/shared/socket";
/* utility */
import BoardUtils from "./Board.utils";
/* constants */
import { MENU_ITEM_ICON } from "../Menu/constant/Menu.constant";
import { actionableMenuItemClick } from "@/core/slices/Menu.slice";

const Board = () => {
  const canvasRef = useRef(null);
  const shouldDrawRef = useRef(null);
  const drawingHistory = useRef([]);
  const historyPtr = useRef(0);

  const dispatch = useDispatch();

  const { activeMenuItem, actionableMenuItem } = useSelector((state) => state.menu);
  const {
    color: selectedColor,
    size,
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
    });
    socket.emit("beginDraw", { x: evt.clientX, y: evt.clientY });
  };

  const onMouseMove = (evt) => {
    const { canvas } = BoardUtils.getCanvasAndContext(canvasRef);
    if (!canvas || !shouldDrawRef.current) {
      return;
    }

    BoardUtils.endDrawing({
      canvasRef,
      x: evt.clientX,
      y: evt.clientY,
    });
    socket.emit("endDraw", { x: evt.clientX, y: evt.clientY });
  };

  const onMouseUp = () => {
    shouldDrawRef.current = false;
    /* 
      @hint:
        get the image snapshot
        save it in history
        update ptr to current img
    */
    const { canvas, context } = BoardUtils.getCanvasAndContext(canvasRef);
    const imgSnapshot = context.getImageData(0, 0, canvas.width, canvas.height);
    drawingHistory.current.push(imgSnapshot);
    historyPtr.current = drawingHistory.current.length - 1;
  };

  const handleBeginDraw = (path) => {
    BoardUtils.beginDrawing({
      canvasRef,
      x: path.x,
      y: path.y,
    });
  };

  const handleEndDraw = (path) => {
    BoardUtils.endDrawing({
      canvasRef,
      x: path.x,
      y: path.y,
    });
  };

  /* UPDATE CANVAS WITH NEW COLOR OR BRUSH SIZE */
  useEffect(() => {
    const { context } = BoardUtils.getCanvasAndContext(canvasRef);

    const changeConfig = (color, size) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };

    const handleChangeConfig = (config) => {
      changeConfig(config.color, config.size);
    };

    changeConfig(selectedColor, size);

    socket.on('changeConfig', handleChangeConfig)
    return () => {
      socket.off('changeConfig', handleChangeConfig)
    }
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
      onMouseUp,
    });

    socket.on("connect", () => {
      console.log("socket client connected.");
    });

    socket.on("beginDraw", handleBeginDraw);
    socket.on("endDraw", handleEndDraw);

    return () => {
      BoardUtils.removeEventListeners({
        canvas,
        onMouseDown,
        onMouseMove,
        onMouseUp,
      });
      socket.off("beginDraw", handleBeginDraw);
      socket.off("endDraw", handleEndDraw);
    };
  }, []);

  /* actionable useEffect */
  useEffect(() => {
    const { canvas } = BoardUtils.getCanvasAndContext(canvasRef);

    if (!canvas) {
      return;
    }

    switch (actionableMenuItem) {
      case MENU_ITEM_ICON.DOWNLOAD: {
        BoardUtils.downloadCanvas(canvasRef);
        break;
      }
      case MENU_ITEM_ICON.UNDO: {
        /* 
          @hint:
            come one step back
            get the img from here in history
            put this to display
        */
        if (historyPtr.current > 0) {
          historyPtr.current = historyPtr.current - 1;
        }
        BoardUtils.retrieveAndDisplayImg(canvasRef, drawingHistory, historyPtr);
        break;
      }
      case MENU_ITEM_ICON.REDO: {
        if (historyPtr.current < drawingHistory.current.length - 1) {
          historyPtr.current = historyPtr.current + 1;
        }
        BoardUtils.retrieveAndDisplayImg(canvasRef, drawingHistory, historyPtr);
        break;
      }
      default: {
        break;
      }
    }
    dispatch(actionableMenuItemClick(null));
  }, [actionableMenuItem, dispatch]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
