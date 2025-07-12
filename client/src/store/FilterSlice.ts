import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  [key: string]: string | number | null;
}

const initialState: FilterState = {};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<{ key: string; value: string | number | null }>) => {
            state[action.payload.key] = action.payload.value;
        },
        clearFilters: () => initialState,
    },
});

export const { setFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
