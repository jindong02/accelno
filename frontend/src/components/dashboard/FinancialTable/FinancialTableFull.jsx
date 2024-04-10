import { MdInfoOutline } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateWidgetData, updateWidgetSize } from '../../../redux/slices/widgetSlice';
import { useGetFinancialsQuery } from '../../../api/endpoints/widgetDataApi';
import { useSelector } from 'react-redux';
import { selectWidgetsByScreen } from '../../../redux/slices/widgetSlice';
import ClipLoader from 'react-spinners/ClipLoader';
import WidgetConfiguration from '../WidgetConfiguration/WidgetConfiguration';

const FinancialTableFull = ({ widgetId, screen }) => {
	const dispatch = useDispatch();
	// state to toggle between edit and view mode
	const [edit, setEdit] = useState(false);
	// state to toggle between widget sizes
	const [size, setSize] = useState('');
	// state to handle input from user
	const [input, setInput] = useState([]);
	// state to store stock ticker symbols from user input
	const [tickers, setTickers] = useState([]);
	// state to hold stock data from API or redux store
	const [stocks, setStocks] = useState([]);
	// state to check if data needs to be fetched from API
	const [fetch, setFetch] = useState(false);
	// get widget data from redux store
	const selectedWidgets = useSelector((state) => selectWidgetsByScreen(state, screen));
	const activeWidget = selectedWidgets?.find((widget) => widget.id === widgetId);

	const {
		data: financialData,
		isLoading,
		isSuccess,
		isError,
	} = useGetFinancialsQuery(tickers, {
		skip: !fetch, // Always call the hook, but conditionally skip the query
	});

	console.log(activeWidget);

	useEffect(() => {
		// Check if data already exists in the state or local storage
		if (activeWidget?.data) {
			setStocks(activeWidget.data);
		} else if (!activeWidget?.data && !fetch) {
			// If there is no data and fetch is false, display the widget configuration
			setEdit(true);
		}
	}, [activeWidget?.data, fetch]);

	useEffect(() => {
		// This useEffect is responsible for updating the 'stocks' state when data is fetched
		if (isSuccess && financialData) {
			setStocks(financialData);
			dispatch(updateWidgetData({ screen, widgetId, data: financialData })); // Save data to Redux
			setFetch(false); // Reset 'fetch' to false
			setEdit(false); // Close widget configuration
			setInput([]); // Reset input
		}
	}, [isSuccess, financialData, dispatch, setFetch, setEdit, screen, widgetId]);

	useEffect(() => {
		// This useEffect is responsible for updating the size of the widget when the widget is resized
		if (activeWidget?.size) {
			setSize(activeWidget.size);
		} else {
			setSize('small');
		}
	}, [setSize, activeWidget?.size]);

	const handleSaveBtnClick = () => {
		// Set the tickers and initiate data fetching
		setTickers(input);
		setFetch(true); // Set fetch to true to trigger the query
		dispatch(updateWidgetSize({ screen, widgetId, size })); // Save the widget size to Redux
	};

	const override = {
		display: 'block',
		margin: '0 auto',
		borderColor: '#2151C0',
	};

	return (
		<div className="w-[480px] h-[500px] bg-white dark:bg-[#2D2F35] dark:border-none  py-2 font-inter rounded-xl border border-lightSilver shadow-xl">
			{isLoading ? (
				<div className="h-full flex items-center justify-center bg-white dark:bg-[#2D2F35]">
					<ClipLoader color="#fff" loading={isLoading} cssOverride={override} size={30} aria-label="Loading Spinner" data-testid="loader" />
				</div>
			) : edit ? (
				<WidgetConfiguration
					widgetId={widgetId}
					screen={screen}
					setEdit={setEdit}
					size={size}
					setSize={setSize}
					input={input}
					setInput={setInput}
					handleSaveBtnClick={handleSaveBtnClick}
					isResizable={activeWidget?.isResizable}
					isInputBased={true}
				/>
			) : (
				<div>
					<div className="flex justify-end p-1 ">
						{!edit && (
							<span className="cursor-pointer text-xl text-darkGrey dark:text-white" onClick={() => setEdit(!edit)}>
								{<MdInfoOutline />}
							</span>
						)}
					</div>

					<div className={` 'text-sm'  text-center flex justify-between items-center py-3 px-4 text-darkGrey dark:text-white font-bold `}>
						<span className="w-1/5">COMPANY</span>
						<span className="w-1/5">PRICE($)</span>
						<span className="w-1/5">MCAP</span>
						<span className="w-1/5">P/B</span>
						<span className="w-1/5">P/E</span>
					</div>

					{stocks?.map((item, index) => (
						<div
							key={index}
							className={` text-sm py-3 text-center px-4 flex justify-between items-center font-normal text-darkGrey dark:text-white`}
						>
							<span className="w-1/5">{item.shortName}</span>
							<span className="w-1/5">{Math.round(item.price)}</span>
							<span className="w-1/5">{item.marketCap}</span>
							<span className="w-1/5">{Math.round(item.pbRatio)}</span>
							<span className="w-1/5">{Math.round(item.peRatio)}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default FinancialTableFull;
