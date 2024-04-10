/* eslint-disable react/prop-types */
import { useGetChartQuery, useGetSingleStockDataQuery } from '../../../api/endpoints/widgetDataApi';
import StackedAreachart from '../charts/areachart/StackedAreachart';
import { MdInfoOutline } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWidget, updateWidgetData, updateWidgetSize, selectWidgetsByScreen } from '../../../redux/slices/widgetSlice';
import WidgetConfiguration from '../WidgetConfiguration/WidgetConfiguration';
import ClipLoader from 'react-spinners/ClipLoader';

const SingleStockStackedChart = ({ widgetId, screen }) => {
	const dispatch = useDispatch();
	// state to check if data needs to be fetched from API
	const [fetch, setFetch] = useState(false);
	// state to hold the time of the last update
	const [updatedAt, setUpdatedAt] = useState('');
	// state to hold the type of change in stock price (positive or negative)
	const [changeType, setChangeType] = useState('');
	// state to toggle between edit and view mode
	const [edit, setEdit] = useState(false);
	// state to toggle between widget sizes
	const [size, setSize] = useState('small');
	// state to handle input from user
	const [input, setInput] = useState('');
	// state to store stock ticker symbols from user input
	const [ticker, setTicker] = useState('');
	// state to hold stock data from API or redux store
	const [stock, setStock] = useState([]);
	// state to hold chart data from API or redux store
	const [chart, setChart] = useState([]);

	const { data, isSuccess, isLoading } = useGetSingleStockDataQuery(ticker, {
		skip: !fetch,
	});
	const { data: chartData } = useGetChartQuery(ticker, {
		skip: !fetch,
	});

	const selectedWidgets = useSelector((state) => selectWidgetsByScreen(state, screen));
	const activeWidget = selectedWidgets?.find((widget) => widget.id === widgetId);

	useEffect(() => {
		// Check if data already exists in the state or local storage
		if (activeWidget?.data) {
			setStock(activeWidget.data.stockdata);
			setChart(activeWidget.data.chartData);
			setUpdatedAt(activeWidget.data.updatedAt);
		} else if (!activeWidget?.data && !fetch) {
			// If there is no data and fetch is false, display the widget configuration
			setEdit(true);
		}
	}, [activeWidget?.data, fetch]);

	useEffect(() => {
		// This useEffect is responsible for updating the 'stocks' state when data is fetched
		if (isSuccess && data && chartData && updatedAt) {
			setStock(data);
			setChart(chartData);
			dispatch(
				updateWidgetData({
					screen,
					widgetId,
					data: {
						stockdata: data,
						chartData: chartData,
						updatedAt: updatedAt,
					},
				})
			); // Save data to Redux
			setFetch(false); // Reset 'fetch' to false
			setEdit(false); // Close widget configuration
			setInput([]); // Reset input
		}
	}, [isSuccess, data, dispatch, setFetch, setEdit, screen, widgetId, chartData, updatedAt]);

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
		setTicker(input);
		setFetch(true); // Set fetch to true to trigger the query
		dispatch(updateWidgetSize({ screen, widgetId, size })); // Save the widget size to Redux
	};

	const handleWidgetDelete = (widgetId) => {
		dispatch(deleteWidget({ screen, widgetId }));
	};

	const checkPercentType = (value) => {
		const convertedValue = parseFloat(value);

		if (convertedValue < 0) {
			setChangeType('negative');
		} else if (convertedValue > 0) {
			setChangeType('positive');
		}
	};

	useEffect(() => {
		if (isSuccess) {
			const currentDate = new Date();

			// Get the hours, minutes, and seconds
			const hours = currentDate.getHours();
			const minutes = currentDate.getMinutes();

			// Determine whether it's AM or PM
			const amOrPm = hours >= 12 ? 'PM' : 'AM';

			// Convert the hours to 12-hour format
			const formattedHours = hours % 12 || 12;

			// Add leading zeros for minutes if needed
			const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

			// Create the formatted time string
			const formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;

			setUpdatedAt(formattedTime);

			checkPercentType(stock?.data?.regularMarketChangePercent?.fmt);
		}
	}, [isSuccess, stock?.data, changeType]);

	const override = {
		display: 'block',
		margin: '0 auto',
		borderColor: '#2151C0',
	};

	return (
		<div
			className={`${
				size === 'small' ? 'w-[570px]' : size === 'medium' ? 'w-[380px]' : 'w-[460px]'
			} bg-white   dark:bg-[#2D2F35] dark:border-none rounded-xl border border-lightSilver   pt-3 pb-5 shadow-md`}
		>
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
					isResizable={false}
					isInputBased={true}
					isSingleStock={true}
				/>
			) : (
				<div>
					<div className="flex justify-end p-1 ">
						{!edit && (
							<span className="cursor-pointer  text-xl text-darkGrey dark:text-white" onClick={() => setEdit(!edit)}>
								{<MdInfoOutline />}
							</span>
						)}
					</div>
					<div className="flex justify-center space-x-5 mb-4">
						<div className="flex space-x-2 font-bold text-sm">
							<span className="text-darkGrey dark:text-white">{data?.symbol}</span>
							<span className="text-secondarySilver">{data?.shortName}</span>
							<span
								className={`${
									Math.sign(parseFloat(data?.regularMarketChangePercent.fmt)) === 1 ? 'text-primaryGreen' : 'text-[#BB231B]'
								}  `}
							>
								{data?.regularMarketChangePercent.fmt}
							</span>
						</div>

						<span className="text-sm text-darkGrey dark:text-white font-medium">
							{data?.exchangeName} - {data?.currency}
						</span>
					</div>
					<StackedAreachart size={size} data={chart} changeValue={data?.regularMarketChangePercent.fmt} />
				</div>
			)}
		</div>
	);
};

export default SingleStockStackedChart;
