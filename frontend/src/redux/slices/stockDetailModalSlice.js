import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isModalOpen: false,
	stock: '',
};

const stockDetailModalSlice = createSlice({
	name: 'stockModal',
	initialState,
	reducers: {
		openStockModal: (state, action) => {
			const { stock } = action.payload;
			state.stock = stock;
			state.isModalOpen = true;
		},
		closeStockModal: (state) => {
			state.isModalOpen = false;
			state.stock = '';
		},
	},
});

export const { openStockModal, closeStockModal } = stockDetailModalSlice.actions;
export const selectStockModalState = (state) => state.stockModal.isModalOpen;
export const selectStockModalStock = (state) => state.stockModal.stock;
export default stockDetailModalSlice.reducer;
