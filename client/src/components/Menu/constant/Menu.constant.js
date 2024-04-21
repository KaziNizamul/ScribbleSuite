import {
  faPencil,
  faEraser,
  faRotateLeft,
  faRotateRight,
  faFileArrowDown,
} from '@fortawesome/free-solid-svg-icons';

export const MENU_ITEMS = [
  { icon: faPencil, item: 'pencil' },
  { icon: faEraser, item: 'erasor' },
  { icon: faRotateLeft, item: 'undo' },
  { icon: faRotateRight, item: 'redo' },
  { icon: faFileArrowDown, item: 'download' },
]

export const ACTIONABLE_MENU_ITEM = [
  'pencil',
  'erasor',
]

export const MENU_ITEM_ICON = {
  PENCIL: 'pencil',
  ERASOR: 'erasor',
  UNDO: 'undo',
  REDO: 'redo',
  DOWNLOAD: 'download',
}