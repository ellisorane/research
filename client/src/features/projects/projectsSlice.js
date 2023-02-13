import { createSlice } from '@reduxjs/toolkit';

export const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
        data: [],
        loading: true,
        currentProject: {}
    },
    reducers: {
        setProjects: ( state, action ) => {
            state.data = [ action.payload ];
            state.loading = false
        },
        setCurrentProject: ( state, action ) => {
            state.currentProject = action.payload
        }       
    }
})

export const { setProjects, setCurrentProject, setUserAvatars } = projectsSlice.actions;
export default projectsSlice.reducer;