import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<DndProvider backend={HTML5Backend}>
				<App />
				<ToastContainer />
			</DndProvider>
		</Provider>
	</React.StrictMode>
);
