/* external component */
import { createSlice } from '@reduxjs/toolkit';
/* constant */
import { MENU_ITEM_ICON } from '@/components/Menu/constant/Menu.constant';
import { COLORS_MAP } from '@/components/constants';

const initialState = {
  [MENU_ITEM_ICON.PENCIL]: {
    color: COLORS_MAP.BLACK,
    size: 3,
  },
  [MENU_ITEM_ICON.ERASOR]: {
    color: 'white',
    size: 10,
  },
  [MENU_ITEM_ICON.UNDO]: {},
  [MENU_ITEM_ICON.REDO]: {},
  [MENU_ITEM_ICON.DOWNLOAD]: {},
}

export const toolboxSlice = createSlice({
  name: 'toolbox',
  initialState,
  reducers: {
    changeColor: (state = initialState, { payload }) => {
      state[payload.item].color = payload.color;
    },
    updateBrushSize: (state = initialState, { payload }) => {
      state[payload.item].size = payload.size;
    },
  }
});

export const { 
  changeColor,
  updateBrushSize,
} = toolboxSlice.actions;
export default toolboxSlice.reducer;