import { createSlice } from '@reduxjs/toolkit';

const initState = {
    name: '',
    description: '',
    researchers: [],
    fundingGoal: 0,
    daysToFund: 30,
    category: '',
    tags: [],
    image: ''
}

export const startProjectSlice = createSlice({
    name: 'formData',
    initialState: initState,
    reducers: {
        setFormData: (state, action) => {
            state = action.payload;
        }
    }
})

export const { setFormData } = startProjectSlice.actions;
export default startProjectSlice.reducer;