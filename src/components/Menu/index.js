import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencil,
  faEraser,
  faRotateLeft,
  faRotateRight,
  faFileArrowDown,
} from '@fortawesome/free-solid-svg-icons';
/* styles */
import styles from './index.module.css';

const Menu = () => {
  return (
    <div
      className={styles.menuContainer}
    >
      {/* pencil */}
      <div
        className={styles.iconWrapper}
      >
        <FontAwesomeIcon 
          icon={faPencil}
          className={styles.icon}
        />
      </div>
      {/* eraser */}
      <div
        className={styles.iconWrapper}
      >
        <FontAwesomeIcon 
          icon={faEraser}
          className={styles.icon}
        />
      </div>
      {/* rotate left */}
      <div
        className={styles.iconWrapper}
      >
        <FontAwesomeIcon 
          icon={faRotateLeft}
          className={styles.icon}
        />
      </div>
      {/* rotate right */}
      <div
        className={styles.iconWrapper}
      >
        <FontAwesomeIcon 
          icon={faRotateRight}
          className={styles.icon}
        />
      </div>
      {/* download */}
      <div
        className={styles.iconWrapper}
      >
        <FontAwesomeIcon 
          icon={faFileArrowDown}
          className={styles.icon}
        />
      </div>
    </div>
  )
}

export default Menu;