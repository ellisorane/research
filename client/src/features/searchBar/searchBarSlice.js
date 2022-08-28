import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'searchBar',
    initialState: {
        suggested: [],
        searchInput: '',
        timer: null
    },
    reducers: {
        setSuggested: (state, action) => {
            state.suggested = action.payload
        },
        setSearchInput: (state, action) => {
            state.searchInput = action.payload;
        },
        setTimer: (state, action) => {
            state.timer = action.payload
        }
    }
})

export const { setSearchInput, setTimer, setSuggested } = searchSlice.actions;
export default searchSlice.reducer;