/* external component */
import { createSlice } from '@reduxjs/toolkit';
/* constants */
import { MENU_ITEMS } from '@/components/Menu/constant/Menu.constant';

const initialState = {
  activeMenuItem: MENU_ITEMS.find(({ item }) => item === 'pencil' )?.item,
  actionableMenuItem: null,
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    menuItemClick: (state = initialState, { payload }) => {
      state.activeMenuItem = payload;
    },
    actionableMenuItemClick: (state = initialState, { payload }) => {
      state.actionableMenuItem = payload;
    }
  }
});

export const {
  menuItemClick,
  actionableMenuItemClick,
} = menuSlice.actions;

export default menuSlice.reducer;