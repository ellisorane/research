import { createSlice } from '@reduxjs/toolkit'

const initState =  {
    token: localStorage.getItem('token'),
    user: null,
    loading: false,
    loggedIn: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    loadUser(state, action) {
        state.loggedIn = true
        state.loading = false
        state.user = action.payload
    },
    login(state, action) {
        localStorage.setItem('token', action.payload.token)
        state.token = localStorage.getItem('token')
        state.loading = true
        state.loggedIn = true
    },
    logout(state) {
        localStorage.removeItem('token');
        state.user = null
        state.token = null
        state.loading = false
        state.loggedIn = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { loadUser, login, logout } = authSlice.actions

export default authSlice.reducer