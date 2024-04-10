import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isDarkMode: true,
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleDarkMode: (state) => {
			state.isDarkMode = !state.isDarkMode;
			localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light');
		},
	},
});

export const { toggleDarkMode } = themeSlice.actions;

export const selectIsDarkMode = (state) => state.theme.isDarkMode;

export default themeSlice.reducer;
