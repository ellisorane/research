import { createSlice } from '@reduxjs/toolkit';

export const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
        data: [],
        loading: true
    },
    reducers: {
        setProjects: (state, action) => {
            state.data = [action.payload];
            state.loading = false;
        },
        closePayment: state => {
            state.value = false;
        },
    }
})

export const { setProjects } = projectsSlice.actions;
export default projectsSlice.reducer;