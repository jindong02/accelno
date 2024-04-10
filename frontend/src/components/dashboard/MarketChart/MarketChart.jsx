import Widemarketchart from '../charts/areachart/widemarketchart';
import { useGetMarketChartQuery } from '../../../api/endpoints/widgetDataApi';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteWidget } from '../../../redux/slices/widgetSlice';
import { MdInfoOutline } from 'react-icons/md';

const durationData = [
	{ id: 1, name: '1D' },
	{ id: 2, name: '1W' },
	{ id: 3, name: '1M' },
	{ id: 4, name: '6M' },
	{ id: 5, name: '1Y' },
];

const MarketChart = ({ widgetId, screen }) => {
	const [edit, setEdit] = useState(false);
	const [duration, setDuration] = useState('1D');

	const { data, error, isLoading } = useGetMarketChartQuery();

	const requiredData = data?.marketSummaryAndSparkResponse?.result[0];

	const dispatch = useDispatch();

	const handleWidgetDelete = (widgetId) => {
		dispatch(deleteWidget({ screen, widgetId }));
	};

	return (
		<div
			className={` w-[600px] 
			 p-3 font-inter space-y-3  dark:bg-[#2D2F35] dark:border-none shadow-lg rounded-md`}
		>
			<div className="flex justify-end pb-1 ">
				{!edit ? (
					<span className="cursor-pointer text-xl text-darkGrey dark:text-white" onClick={() => setEdit(!edit)}>
						{<MdInfoOutline />}
					</span>
				) : (
					<button
						className=" bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-sm hover:bg-red-600"
						onClick={() => handleWidgetDelete(widgetId)}
					>
						x
					</button>
				)}
			</div>
			<div className="flex justify-between">
				<div className="flex flex-col">
					<span className={` text-md  text-primaryGrey dark:text-white font-bold `}>{requiredData?.shortName}</span>
					<div className="flex space-x-1 text-sm">
						<span className="text-darkGrey dark:text-white">Return:</span>
						<span className="text-primaryGreen ">5.5%</span>
					</div>
				</div>
				<div className="text-sm space-x-2">
					<span className="text-darkGrey dark:text-white font-bold">{requiredData?.regularMarketPreviousClose?.raw}</span>
					<span className="text-primaryGreen"></span>
				</div>
				<div className={`text-sm flex rounded-md`}>
					{durationData.map((item) => (
						<span
							key={item.id}
							onClick={() => setDuration(item.name)}
							className={`flex justify-center items-center px-2 ${
								duration === item.name ? 'bg-dashboardBlue text-white' : 'bg-lightSilver dark:bg-primaryGrey'
							} hover:bg-dashboardBlue hover:text-white cursor-pointer `}
						>
							{item.name}
						</span>
					))}
				</div>
			</div>
			<Widemarketchart data={requiredData} />
		</div>
	);
};

export default MarketChart;
