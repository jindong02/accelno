import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	screens: {
		dashboard: [],
		watchlist: [],
		market: [],
		todaysmovers: [],
		portfolio: [],
	},
};

const widgetsSlice = createSlice({
	name: 'widgets',
	initialState,
	reducers: {
		addWidget: (state, action) => {
			const { screen, widget } = action.payload;
			state.screens[screen].push(widget);
		},
		deleteWidget: (state, action) => {
			const { screen, widgetId } = action.payload;
			state.screens[screen] = state.screens[screen].filter((widget) => widget.id !== widgetId);
		},
		updateWidgetLayout: (state, action) => {
			const { screen, widgetId, layout } = action.payload;
			const widget = state.screens[screen].find((w) => w.id === widgetId);
			if (widget) {
				widget.layout = layout;
			}
		},
		updateWidgetSize: (state, action) => {
			const { screen, widgetId, size } = action.payload;
			const widget = state.screens[screen].find((w) => w.id === widgetId);
			if (widget) {
				widget.size = size;
			}
		},
		setWidgets: (state, action) => {
			const { screen, widgets } = action.payload;
			state.screens[screen] = widgets;
		},
		updateWidgetData: (state, action) => {
			const { screen, widgetId, data } = action.payload;
			const widget = state.screens[screen].find((w) => w.id === widgetId);
			if (widget) {
				widget.data = data;
			}
		},
	},
});

export const { addWidget, deleteWidget, updateWidgetLayout, updateWidgetSize, setWidgets, updateWidgetData } = widgetsSlice.actions;

export const selectWidgetsByScreen = (state, screen) => state.widgets.screens[screen];

export default widgetsSlice.reducer;

/*
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	selectedWidgets: [],
};

const widgetsSlice = createSlice({
	name: 'widgets',
	initialState,
	reducers: {
		addWidget: (state, action) => {
			state.selectedWidgets.push(action.payload);
		},
		deleteWidget: (state, action) => {
			state.selectedWidgets = state.selectedWidgets.filter((widget) => widget.id !== action.payload);
		},
		updateWidgetLayout: (state, action) => {
			const { id, layout } = action.payload;
			const widget = state.selectedWidgets.find((w) => w.id === id);
			if (widget) {
				widget.layout = layout;
			}
		},
		updateWidgetSize: (state, action) => {
			const { id, size } = action.payload;
			const widget = state.selectedWidgets.find((w) => w.id === id);
			if (widget) {
				widget.size = size;
			}
		},
		setWidgets: (state, action) => {
			state.selectedWidgets = action.payload;
		},
		updateWidgetData: (state, action) => {
			const { widgetId, data } = action.payload;
			state.widgetData[widgetId] = data;
		},
	},
});

export const { addWidget, deleteWidget, updateWidgetLayout, updateWidgetSize, setWidgets, updateWidgetData } = widgetsSlice.actions;

export const selectSelectedWidgets = (state) => state.widgets.selectedWidgets;

export default widgetsSlice.reducer;
*/
