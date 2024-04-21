import { configureStore } from '@reduxjs/toolkit';
import MenuReducer from '@/core/slices/Menu.slice';
import ToolboxReducer from '@/core/slices/Toolbox.slice';

const store = configureStore({
  reducer: {
    menu: MenuReducer,
    toolbox: ToolboxReducer,
  },
});

export {
  store
}