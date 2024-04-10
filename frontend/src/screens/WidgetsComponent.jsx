import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import GainerLoser from '../components/dashboard/GainerLoser/GainerLoser';
import FiftyTwoWeeklyStats from '../components/dashboard/FiftyTwoWeeklyStats/FiftyTwoWeeklyStats';
import SingleStockChart from '../components/dashboard/SingleStockChart/SingleStockChart';
import ActiveStocks from '../components/dashboard/ActiveStocks/ActiveStocks';
import MarketChart from '../components/dashboard/MarketChart/MarketChart';
import HeatmapContainer from '../components/dashboard/HeatmapContainer/HeatmapContainer';
import FinancialTableFull from '../components/dashboard/FinancialTable/FinancialTableFull';
import SingleStockStackedChart from '../components/dashboard/SingleStockStackedChart/SingleStockStackedChart';
import { addWidget, deleteWidget, setWidgets, selectWidgetsByScreen } from '../redux/slices/widgetSlice';
import Welcome from '../components/dashboard/welcome/Welcome';
import { selectModalState } from '../redux/slices/modalSlice';
import { openModal, closeModal } from '../redux/slices/modalSlice';
import ClipLoader from 'react-spinners/ClipLoader';
import { selectIsDarkMode } from '../redux/slices/themeSlice';
import { MdAdd } from 'react-icons/md';
import StockDetailModal from '../components/dashboard/StockDetailModal/StockDetailModal';
import { selectStockModalState } from '../redux/slices/stockDetailModalSlice';

// eslint-disable-next-line react/prop-types
const WidgetsComponent = ({ screen }) => {
	const widgetSelectorData = [
		{
			id: 'widget-1',
			screen: screen,
			content: 'GainerLoser',
			isResizable: true,
			isStockBased: false,
			dimensions: {
				small: { w: 1.7, h: 3.4 },
				medium: { w: 2.2, h: 4.2 },
				large: { w: 2.7, h: 4.5 },
			},
		},

		{
			id: 'widget-3',
			screen: screen,
			content: 'FiftyTwoWeeklyStats',
			isResizable: true,
			isStockBased: false,
			dimensions: {
				small: { w: 1.7, h: 3.7 },
				medium: { w: 2.2, h: 4.6 },
				large: { w: 2.7, h: 4.7 },
			},
		},
		{
			id: 'widget-4',
			screen: screen,
			content: 'SingleStockChart',
			isResizable: true,
			isStockBased: true,
			dimensions: {
				small: { w: 1.6, h: 2.8 },
				medium: { w: 1.9, h: 3.8 },
				large: { w: 2.1, h: 3.8 },
			},
		},
		{
			id: 'widget-5',
			screen: screen,
			content: 'ActiveStocks',
			isResizable: true,
			isStockBased: false,
			dimensions: {
				small: { w: 1.9, h: 2.9 },
				medium: { w: 2.2, h: 3.5 },
				large: { w: 2.4, h: 3.9 },
			},
		},
		{
			id: 'widget-6',
			screen: screen,
			content: 'MarketChart',
			isResizable: false,
			isStockBased: false,
			dimensions: {
				small: { w: 3.1, h: 3.0 },
			},
		},
		{
			id: 'widget-7',
			screen: screen,
			content: 'Heatmap',
			isResizable: true,
			isStockBased: false,
			dimensions: {
				small: { w: 5.1, h: 6.1 },
				medium: { w: 6, h: 4.1 },
				large: { w: 6, h: 4.2 },
			},
		},
		{
			id: 'widget-8',
			screen: screen,
			content: 'FinancialTableFull',
			isResizable: false,
			isStockBased: false,
			dimensions: {
				small: { w: 2.6, h: 4.9 },
			},
		},
		{
			id: 'widget-9',
			screen: screen,
			content: 'SingleStockStackedChart',
			isResizable: true,
			isStockBased: true,
			dimensions: {
				small: { w: 3.1, h: 2.9 },
				medium: { w: 2.6, h: 3.4 },
				large: { w: 2.9, h: 4.0 },
			},
		},
	];

	const dispatch = useDispatch();
	//const selectedWidgets = useSelector(selectSelectedWidgets);
	const isDarkMode = useSelector(selectIsDarkMode);
	const selectedWidgets = useSelector((state) => selectWidgetsByScreen(state, screen));
	const isModalOpen = useSelector(selectModalState);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedWidgetSize, setSelectedWidgetSize] = useState({});
	const [isOverWhiteboard, setIsOverWhiteboard] = useState(false);
	const [selectedStock, setSelectedStock] = useState({});
	const isStockDetail = useSelector(selectStockModalState);

	// Load widgets data from local storage when component mounts
	useEffect(() => {
		const storedWidgets = loadWidgetsFromLocalStorage();
		if (storedWidgets.length > 0) {
			dispatch(setWidgets({ screen, widgets: storedWidgets }));
		}
		setIsLoading(false);
	}, [dispatch, screen]);

	// Save widgets data to local storage whenever it changes
	useEffect(() => {
		saveWidgetsToLocalStorage(selectedWidgets, screen);
	}, [selectedWidgets, screen]);

	// Save widgets data to local storage
	const saveWidgetsToLocalStorage = (widgets, screen) => {
		localStorage.setItem(`selectedWidgets_${screen}`, JSON.stringify(widgets));
	};

	// Load widgets data from local storage
	const loadWidgetsFromLocalStorage = () => {
		const storedWidgets = localStorage.getItem(`selectedWidgets_${screen}`);
		return storedWidgets ? JSON.parse(storedWidgets) : [];
	};

	const handleWhiteboardDrop = (e) => {
		e.preventDefault();
		setIsOverWhiteboard(false);

		const widgetId = e.dataTransfer.getData('widgetId');
		const widget = widgetSelectorData.find((widget) => widget.id === widgetId);

		if (widget && isOverWhiteboard) {
			handleWidgetDragStart(widget);
		}
		setSelectedWidgetSize(() => ({}));
		setSelectedStock(() => ({}));
	};

	const handleWhiteboardDragOver = (e) => {
		e.preventDefault();
		setIsOverWhiteboard(true);
	};

	const handleWhiteboardDragLeave = () => {
		setIsOverWhiteboard(false);
	};

	const handleWidgetDragStart = (widget) => {
		const newWidget = {
			...widget,
			id: `${widget.id}-${Date.now()}`,
			size: selectedWidgetSize[widget.id],
			stock: selectedStock[widget.id],
		};
		dispatch(addWidget({ screen, widget: newWidget }));
		dispatch(closeModal());
	};

	const handleLayoutChange = (newLayout) => {
		dispatch(
			setWidgets({
				screen,
				widgets: selectedWidgets.map((widget) => {
					const layout = newLayout.find((layoutItem) => layoutItem.i === widget.id);
					return { ...widget, x: layout.x, y: layout.y, w: layout.w, h: layout.h };
				}),
			})
		);
	};

	/*
	// Load widgets data from local storage when component mounts
	useEffect(() => {
		const storedWidgets = loadWidgetsFromLocalStorage();
		if (storedWidgets.length > 0) {
			dispatch(setWidgets(storedWidgets));
		}
		setIsLoading(false);
		console.log('storedWidgets', storedWidgets);
	}, [dispatch, screen]);

	// Save widgets data to local storage whenever it changes
	useEffect(() => {
		saveWidgetsToLocalStorage(selectedWidgets);
	}, [selectedWidgets]);

	// Save widgets data to local storage
	const saveWidgetsToLocalStorage = (widgets) => {
		localStorage.setItem('selectedWidgets', JSON.stringify(widgets));
	};

	// Load widgets data from local storage
	const loadWidgetsFromLocalStorage = () => {
		const storedWidgets = localStorage.getItem('selectedWidgets');
		return storedWidgets ? JSON.parse(storedWidgets) : [];
	};

	const handleWhiteboardDrop = (e) => {
		e.preventDefault();
		setIsOverWhiteboard(false);

		const widgetId = e.dataTransfer.getData('widgetId');
		const widget = widgetSelectorData.find((widget) => widget.id === widgetId);

		if (widget && isOverWhiteboard) {
			handleWidgetDragStart(widget);
		}
		setSelectedWidgetSize(() => ({}));
		setSelectedStock(() => ({}));
	};

	const handleWhiteboardDragOver = (e) => {
		e.preventDefault();
		setIsOverWhiteboard(true);
	};

	const handleWhiteboardDragLeave = () => {
		setIsOverWhiteboard(false);
	};

	const handleWidgetDragStart = (widget) => {
		const newWidget = { ...widget, id: `${widget.id}-${Date.now()}`, size: selectedWidgetSize[widget.id], stock: selectedStock[widget.id] };
		dispatch(addWidget(newWidget));
		dispatch(closeModal());
	};

	const handleWidgetDelete = (widgetId) => {
		dispatch(deleteWidget(widgetId));
	};

	const handleLayoutChange = (newLayout) => {
		dispatch(
			setWidgets(
				selectedWidgets.map((widget) => {
					const layout = newLayout.find((layoutItem) => layoutItem.i === widget.id);
					return { ...widget, x: layout.x, y: layout.y, w: layout.w, h: layout.h };
				})
			)
		);
	};
*/
	const override = {
		display: 'block',
		margin: '0 auto',
		borderColor: '#2151C0',
	};

	return (
		<>
			{isLoading ? (
				<div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#1F2023]">
					<ClipLoader color="#fff" loading={isLoading} cssOverride={override} size={50} aria-label="Loading Spinner" data-testid="loader" />
				</div>
			) : selectedWidgets.length === 0 && !isModalOpen ? (
				<Welcome />
			) : (
				<div className={`min-h-screen ${isDarkMode ? 'bg-[#1F2023]' : 'bg-white'} flex flex-col pl-7`}>
					<button
						className="fixed bottom-4 right-5 flex items-center justify-center bg-dashboardBlue w-16 h-16 rounded-full text-3xl text-white font-semibold cursor-pointer shadow-lg z-50"
						onClick={() => dispatch(openModal())}
					>
						<MdAdd />
					</button>
					<div
						className={`min-h-screen p-4 ${isDarkMode ? 'bg-[#1F2023]' : 'bg-white'} `}
						onDrop={handleWhiteboardDrop}
						onDragOver={handleWhiteboardDragOver}
						onDragLeave={handleWhiteboardDragLeave}
					>
						<GridLayout
							className="layout"
							layout={selectedWidgets.map((widget) => ({
								x: widget.x || 0,
								y: widget.y || 0,
								w: widget.dimensions[widget.size]?.w || widget.dimensions.small?.w,
								h: widget.dimensions[widget.size]?.h || widget.dimensions.small?.h,
								i: widget.id,
							}))}
							cols={6}
							isResizable={false}
							rowHeight={100}
							width={1200}
							onLayoutChange={handleLayoutChange}
						>
							{selectedWidgets.map((widget) => (
								<div key={widget.id} className="w-full h-full widget p-1 rounded-md cursor-move relative">
									{widget.content === 'GainerLoser' && <GainerLoser widgetId={widget.id} screen={screen} />}
									{widget.content === 'FiftyTwoWeeklyStats' && <FiftyTwoWeeklyStats widgetId={widget.id} screen={screen} />}
									{widget.content === 'SingleStockChart' && <SingleStockChart widgetId={widget.id} screen={screen} />}
									{widget.content === 'ActiveStocks' && <ActiveStocks widgetId={widget.id} screen={screen} />}
									{widget.content === 'MarketChart' && <MarketChart widgetId={widget.id} screen={screen} />}
									{widget.content === 'Heatmap' && <HeatmapContainer widgetId={widget.id} screen={screen} />}
									{widget.content === 'FinancialTableFull' && <FinancialTableFull widgetId={widget.id} screen={screen} />}
									{widget.content === 'SingleStockStackedChart' && <SingleStockStackedChart widgetId={widget.id} screen={screen} />}
								</div>
							))}
						</GridLayout>
					</div>
				</div>
			)}

			{isModalOpen && (
				<div className="select-none  bg-white dark:bg-gray-400 h-[400px] w-[400px] fixed top-1/2 bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 right-0 overflow-y-scroll p-4 rounded-xl shadow-xl z-50">
					<div className="flex justify-between items-start">
						<div className="font-poppins mb-3">
							<h1 className=" text-xl font-bold">All Widget</h1>
							<span className="text-sm font-medium">Select the size of the widget and drag it to the screen</span>
						</div>
						<button
							className=" bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-sm hover:bg-red-600"
							onClick={() => dispatch(closeModal())}
						>
							x
						</button>
					</div>
					<div className="flex flex-col space-y-3">
						{widgetSelectorData.map((widget) => (
							<div
								key={widget.id}
								className="widget p-4 border border-secondaryGrey rounded-md cursor-move flex  items-center justify-between"
								draggable={true}
								onDragStart={(e) => {
									e.dataTransfer.setData('widgetId', widget.id);
								}}
								onDragEnd={() => dispatch(closeModal())}
							>
								{widget.content}
							</div>
						))}
					</div>
				</div>
			)}
			{isStockDetail && <StockDetailModal />}
		</>
	);
};

export default WidgetsComponent;
