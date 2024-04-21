/* external imports */
import cx from 'classnames';
/* styles */
import styles from './index.module.css';
/* constant */
import { 
  COLORS,
  COLORS_MAP,
} from '../constants';
import { ACTIONABLE_MENU_ITEM, MENU_ITEM_ICON } from '../Menu/constant/Menu.constant';
import { EMPTY_ARRAY, EMPTY_STRING } from '@/shared/GlobalConstant';
/* state */
import { useDispatch, useSelector } from 'react-redux';
import { changeColor, updateBrushSize } from '@/core/slices/Toolbox.slice';
/* internal components */
import { socket } from "@/shared/socket";

const ToolBox = () => {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector(state => state.menu.activeMenuItem);
  const {
    color: selectedColor,
    size,
  } = useSelector((state) => state.toolbox[activeMenuItem])
  
  const showToolbox = activeMenuItem === MENU_ITEM_ICON.PENCIL;
  const showBrush = ACTIONABLE_MENU_ITEM.includes(activeMenuItem);

  const onUpdateColor = (color = EMPTY_STRING) => {
    dispatch(changeColor({
      item: activeMenuItem,
      color
    }));
    socket.emit('changeConfig', {
      color,
      size,
    })
  }

  const onUpdateBrushSize = (evt) => {
    dispatch(updateBrushSize({
      item: activeMenuItem,
      size: evt.target.value
    }));
    socket.emit('changeConfig', { 
      color: selectedColor,
      size: evt.target.value,
    })
  };

  return (
    <div
      className={styles.toolboxContainer}
    >
      {/* stroke brush */}
      {showToolbox && (
        <section
          className={styles.toolItem}
        >
          <h4
            className={styles.toolHeading}
          > Stroke Brush
          </h4>
          <div
            className={styles.itemContainer}
          >
            {(COLORS || EMPTY_ARRAY).map((color, index) => (
              <div
                key={index}
                className={cx(
                  styles.colorBox,
                  {[styles.active]: color === selectedColor}
                )}
                style={{ backgroundColor: color }}
                onClick={() => onUpdateColor(color)}
              />
            ))}
          </div>
        </section>
      )}

      {/* brush size range */}
      {showBrush && (
        <section
          className={styles.toolItem}
        >
          <h4
            className={styles.toolHeading}
          > Brush Size
          </h4>
          <div
            className={styles.itemContainer}
          >
            <input
              type="range"
              min={1}
              max={activeMenuItem === MENU_ITEM_ICON.ERASOR 
                ? 100
                : 10
              }
              step={1}
              value={size}
              onChange={onUpdateBrushSize}
            />
          </div>
        </section>
      )}
    </div>
  )
};

export default ToolBox;
