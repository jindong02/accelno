import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md';
import { useState } from 'react';
import { useGetChartbyRangeQuery, useGetStockDetailQuery } from '../../../api/endpoints/widgetDataApi';
import RangeChart from '../charts/areachart/RangeChart';
import ClipLoader from 'react-spinners/ClipLoader';
import { useSelector, useDispatch } from 'react-redux';
import { closeStockModal, selectStockModalStock } from '../../../redux/slices/stockDetailModalSlice';

const durationData = [
	{ id: 1, name: '1d' },
	{ id: 3, name: '1mo' },
	{ id: 4, name: '6mo' },
	{ id: 5, name: '1y' },
	{ id: 6, name: '5y' },
];

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: '#2151C0',
};

const StockDetailModal = () => {
	const dispatch = useDispatch();
	const [duration, setDuration] = useState('5y');
	const stock = useSelector(selectStockModalStock);

	const { data: stockData, isLoading: stockDataLoading, error } = useGetStockDetailQuery(stock);
	const { data: chartData, isLoading: chartDataLoading } = useGetChartbyRangeQuery([stock, duration]);

	return (
		<div className="bg-white dark:bg-[#2D2F35] h-[570px] w-[700px]  fixed top-1/2 bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 right-0 p-4 rounded-xl shadow-xl z-50">
			{stockDataLoading && chartDataLoading ? (
				<div className="h-full flex items-center justify-center bg-white dark:bg-[#2D2F35]">
					<ClipLoader
						color="#fff"
						loading={stockDataLoading && chartDataLoading}
						cssOverride={override}
						size={30}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			) : (
				<div className="flex-col font-inter space-y-3">
					<button
						onClick={() => dispatch(closeStockModal())}
						className="absolute right-2 top-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-md font-semibold hover:bg-red-600 float-right"
					>
						x
					</button>

					<div className="flex flex-col">
						<span className="text-2xl text-darkGrey dark:text-white"> {stockData?.price?.shortName}</span>
						<span className="text-sm text-secondarySilver">{`${stockData?.price?.exchangeName}: ${stockData?.price?.symbol}`}</span>
					</div>
					<div className="space-x-1">
						<span className="text-darkGrey dark:text-white text-3xl"> {stockData?.price?.regularMarketPrice?.raw} </span>
						<span className="text-secondarySilver text-sm font-semibold"> {stockData?.price?.currency} </span>
					</div>
					<div
						className={`flex ${
							Math.sign(stockData?.price?.regularMarketChangePercent?.raw) === 1 ? 'text-[#14C67A]' : 'text-[#BB231B]'
						} space-x-2 `}
					>
						<span className="font-medium">
							{' '}
							{stockData?.price?.regularMarketChange?.fmt} ({stockData?.price?.regularMarketChangePercent?.fmt}){' '}
						</span>
						<span className="text-xl">
							{Math.sign(stockData?.price?.regularMarketChangePercent?.raw) === 1 ? <MdArrowDropUp /> : <MdArrowDropDown />}
						</span>
					</div>
					<div className={`flex text-sm rounded-md`}>
						{durationData.map((item) => (
							<span
								key={item.id}
								onClick={() => setDuration(item.name)}
								className={`flex justify-center items-center px-5 py-2 ${
									duration === item.name ? 'bg-dashboardBlue text-white' : 'bg-lightSilver dark:bg-primaryGrey'
								} hover:bg-dashboardBlue hover:text-white cursor-pointer `}
							>
								{item.name}
							</span>
						))}
					</div>

					<div>
						<RangeChart data={chartData} size="large" changeType={stockData?.price?.regularMarketChangePercent?.raw} />
					</div>
					<div className="flex gap-16 text-sm  font-light   text-darkGrey dark:text-white">
						<div className="flex flex-col gap-2">
							<span>Open</span>
							<span>High</span>
							<span>Low</span>
						</div>
						<div className="flex flex-col  gap-2">
							<span> {stockData?.price?.regularMarketOpen?.raw} </span>
							<span> {stockData?.price?.regularMarketDayHigh?.raw} </span> <span> {stockData?.price?.regularMarketDayLow?.raw} </span>
						</div>

						<div className="flex flex-col  gap-2">
							<span>Mkt cap</span>
							<span>P/E ratio</span>
						</div>
						<div className="flex flex-col  gap-2">
							<span>{stockData?.price?.marketCap?.fmt}</span>
							<span> {stockData?.indexTrend?.peRatio?.fmt} </span>{' '}
						</div>

						<div className="flex flex-col  gap-2">
							<span>52-wk high</span>
							<span>52-wk low</span>
						</div>
						<div className="flex flex-col  gap-2">
							<span> {stockData?.summaryDetail?.fiftyTwoWeekHigh?.raw} </span>
							<span> {stockData?.summaryDetail?.fiftyTwoWeekLow?.raw} </span>{' '}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default StockDetailModal;
