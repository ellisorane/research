import { createSlice } from '@reduxjs/toolkit'

const initState =  {
    message: '',
    showStatus: false 
}

export const statusSlice = createSlice({
  name: 'status',
  initialState: initState,
  reducers: {
    setStatus(state, action) {
        state.message = action.payload
        state.showStatus = true
    },
    removeStatus(state) {
        state.message = ''
        state.showStatus = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { setStatus, removeStatus } = statusSlice.actions

export default statusSlice.reducer