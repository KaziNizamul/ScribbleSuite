import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
/* styles */
import styles from './index.module.css';
/* constants */
import { EMPTY_ARRAY, EMPTY_STRING } from '@/shared/GlobalConstant';
import { ACTIONABLE_MENU_ITEM, MENU_ITEMS } from './constant/Menu.constant';
/* state */
import { useDispatch, useSelector } from 'react-redux';
import { menuItemClick, actionableMenuItemClick } from '@/core/slices/Menu.slice';

const Menu = () => {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem)

  const handleMenuClick = (item) => {
    dispatch(menuItemClick(item));
  }

  const handleActionableMenuClick = (item) => {
    dispatch(actionableMenuItemClick(item));
  }

  return (
    <div
      className={styles.menuContainer}
    >
      {(MENU_ITEMS || EMPTY_ARRAY).map(({
          icon: menuIcon = EMPTY_STRING,
          item = EMPTY_STRING 
        }) => (
          <div
            key={item}
            className={cx(
              styles.iconWrapper,
              {[styles.active]: item === activeMenuItem}
            )}
            onClick={() => ACTIONABLE_MENU_ITEM.includes(item)
              ? handleMenuClick(item)
              : handleActionableMenuClick(item)
            }
          >
            <FontAwesomeIcon
              className={styles.icon}
              icon={menuIcon}
            />
          </div>
      ))}
    </div>
  )
}

export default Menu;