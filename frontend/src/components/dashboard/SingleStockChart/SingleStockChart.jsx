import { MdArrowDropUp, MdArrowDropDown, MdInfoOutline } from 'react-icons/md';
import Areachart from '../charts/areachart/Areachart';
import { useEffect, useState } from 'react';
import { useGetSingleStockDataQuery } from '../../../api/endpoints/widgetDataApi';
import { useGetChartQuery } from '../../../api/endpoints/widgetDataApi';
import { useDispatch } from 'react-redux';
import { deleteWidget, updateWidgetData, updateWidgetSize } from '../../../redux/slices/widgetSlice';
import { selectWidgetsByScreen } from '../../../redux/slices/widgetSlice';
import { useSelector } from 'react-redux';
import WidgetConfiguration from '../WidgetConfiguration/WidgetConfiguration';
import ClipLoader from 'react-spinners/ClipLoader';

const SingleStockChart = ({ widgetId, screen }) => {
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
				size === 'small' ? 'w-[300px]' : size === 'medium' ? 'w-[360px]' : 'w-[400px]'
			} bg-white  dark:bg-[#2D2F35] dark:border-none space-y-3 px-3 py-1 font-inter rounded-xl border border-lightSilver shadow-md`}
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
					isResizable={activeWidget?.isResizable}
					isInputBased={true}
					isSingleStock={true}
				/>
			) : (
				<div className="space-y-3 px-2 py-1">
					<div className="flex justify-end ">
						{!edit && (
							<span className="cursor-pointer text-xl text-darkGrey dark:text-white" onClick={() => setEdit(!edit)}>
								{<MdInfoOutline />}
							</span>
						)}
					</div>

					<div className={`${size === 'small' ? 'text-sm' : size === 'medium' ? 'text-md' : 'text-lg'} flex justify-between `}>
						<div className=" font-bold ">
							<div className="flex space-x-2">
								<span className="text-darkGrey dark:text-white">{stock?.symbol}</span>
								<span className="text-secondarySilver">{stock?.shortName}</span>
							</div>
						</div>
						<div className="space-x-2 font-bold">
							<span className="text-darkGrey dark:text-white">{stock?.regularMarketPrice?.raw}</span>
							<span className="text-secondarySilver ">{stock?.currency}</span>
						</div>
					</div>

					<div
						className={`${size === 'small' ? 'text-xs' : size === 'medium' ? 'text-sm' : 'text-md'}  flex justify-between font-semibold`}
					>
						<span className="text-secondarySilver items-center">Updated: {updatedAt}</span>
						<div className="flex justify-center ">
							<span className={`${Math.sign(stock?.regularMarketChangePercent?.raw) === 1 ? 'text-primaryGreen' : 'text-[#BB231B]'} `}>
								{stock?.regularMarketChangePercent?.fmt}
							</span>

							<span className="text-xl">
								{Math.sign(stock?.regularMarketChangePercent?.raw) === 1 ? (
									<MdArrowDropUp className="text-primaryGreen" />
								) : (
									<MdArrowDropDown className="text-[#BB231B]" />
								)}
							</span>
						</div>
					</div>
					<Areachart size={size} data={chart} changeType={stock?.regularMarketChangePercent?.raw} />
					{/*
						
						<div className={`${size === 'small' ? 'text-xs' : size === 'medium' ? 'text-sm' : 'text-md'} flex justify-between`}>
						<div className="flex justify-between items-center space-x-2">
							<Switch
								onChange={handleChange}
								checked={true}
								onColor="#86d3ff"
								onHandleColor="#2693e6"
								handleDiameter={15}
								uncheckedIcon={false}
								checkedIcon={false}
								height={20}
								width={40}
							/>
							{
								//	<span className="font-medium text-secondarySilver">Notifications</span>
							}
						</div>
						{
								<span className=" font-semibold text-secondarySilver">Advance Chart</span>
						}
					</div>
						
						*/}
				</div>
			)}
		</div>
	);
};

export default SingleStockChart;
