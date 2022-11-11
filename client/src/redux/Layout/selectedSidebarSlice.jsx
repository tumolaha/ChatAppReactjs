import { createSlice } from '@reduxjs/toolkit';

const SelectedSidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        currentItem: {
            selected: 2,
        },
    },
    reducers: {
        setCurrentItem: (state,action) => {
            state.currentItem.selected = action.payload;
        },
    },
});

export const { setCurrentItem } = SelectedSidebarSlice.actions;

export default SelectedSidebarSlice.reducer;