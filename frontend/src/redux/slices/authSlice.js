import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.user = action.payload.token;
			localStorage.setItem('user', JSON.stringify(action.payload.token));
		},
		logoutSuccess: (state, action) => {
			state.user = null;
			localStorage.removeItem('user');
		},
	},
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
