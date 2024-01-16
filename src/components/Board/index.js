/* external imports */
import { useSelector } from 'react-redux';
/* styles */
import styles from './index.module.css';

const Board = () => {
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const { color: selectedColor, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  console.log({ 
    activeMenuItem,
    selectedColor,
    size
  });
  return (
    <canvas
      className={styles.canvasContainer}
    >
    </canvas>
  )
}

export default Board;