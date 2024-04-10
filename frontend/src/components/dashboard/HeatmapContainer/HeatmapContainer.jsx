import { useState } from 'react';
import { useGetHeatmapQuery } from '../../../api/endpoints/widgetDataApi';
import ClipLoader from 'react-spinners/ClipLoader';
import { MdInfoOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteWidget } from '../../../redux/slices/widgetSlice';

/* const data = [
	{ value: 5541, change: 4.0 },
	{ value: 5600, change: 0.2 },
	{ value: 58454, change: -0.3 },
	{ value: 590, change: 0.4 },
	{ value: 60000, change: 0.5 },
	{ value: 6100, change: 4.6 },
	{ value: 6200, change: -1.7 },
	{ value: 6300, change: 3.8 },
	{ value: 6400, change: -0.9 },
	{ value: 6500, change: 2.0 },
	{ value: 6600, change: -3.1 },
	{ value: 6700, change: 1.2 },
];
*/

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: '#2151C0',
};

const colorScale = [
	{
		id: 1,
		color: 'bg-red-700',
	},
	{
		id: 2,
		color: 'bg-red-600',
	},
	{
		id: 3,
		color: 'bg-red-500',
	},
	{
		id: 4,
		color: 'bg-red-400',
	},
	{
		id: 5,
		color: 'bg-red-300',
	},
	{
		id: 6,
		color: 'bg-gray-300',
	},
	{
		id: 7,
		color: 'bg-green-300',
	},
	{
		id: 8,
		color: 'bg-green-400',
	},
	{
		id: 9,
		color: 'bg-green-500',
	},
	{
		id: 10,
		color: 'bg-green-600',
	},
	{
		id: 11,
		color: 'bg-green-700',
	},
];

const HeatmapContainer = ({ size, widgetId, screen }) => {
	const { data, isLoading } = useGetHeatmapQuery();
	const [close, setClose] = useState(false);
	const dispatch = useDispatch();
	const handleWidgetDelete = (widgetId) => {
		dispatch(deleteWidget({ screen, widgetId }));
	};

	const checkChange = (absVal) => {
		if (absVal >= 0 && absVal < 1) {
			return 'bg-green-300';
		} else if (absVal >= 1 && absVal < 2) {
			return 'bg-green-400';
		} else if (absVal >= 2 && absVal < 3) {
			return 'bg-green-500';
		} else if (absVal >= 3 && absVal < 4) {
			return 'bg-green-600';
		} else if (absVal >= 4) {
			return 'bg-green-700';
		} else if (absVal < 0 && absVal > -1) {
			return 'bg-red-300';
		} else if (absVal < -1 && absVal > -2) {
			return 'bg-red-400';
		} else if (absVal < -2 && absVal > -3) {
			return 'bg-red-500';
		} else if (absVal < -3 && absVal > -4) {
			return 'bg-red-600';
		} else if (absVal < -4) {
			return 'bg-red-700';
		} else {
			return 'bg-gray-300';
		}
	};

	if (isLoading || !data) {
		return (
			<div className="w-[1080px] h-[400px]  font-inter ">
				<div className="h-full flex items-center justify-center bg-white dark:bg-[#2D2F35]">
					<ClipLoader color="#fff" loading={isLoading} cssOverride={override} size={30} aria-label="Loading Spinner" data-testid="loader" />
				</div>
			</div>
		);
	}

	const heatmapDataSorted = [...data];

	heatmapDataSorted.sort((a, b) => b.marketCap - a.marketCap);
	if (heatmapDataSorted && heatmapDataSorted.length > 0) {
		return (
			<div className=" w-[1000px] h-[650px] relative font-inter bg-white dark:bg-[#2D2F35] shadow-xl space-y-3 flex flex-col items-center ">
				<div className="absolute top-2 right-2">
					{!close ? (
						<span className=" cursor-pointer  text-xl text-darkGrey dark:text-white" onClick={() => setClose(!close)}>
							{<MdInfoOutline />}
						</span>
					) : (
						<button
							className=" bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-md font-semibold hover:bg-red-600 float-right"
							onClick={() => handleWidgetDelete(widgetId)}
						>
							x
						</button>
					)}
				</div>

				<div className="space-y-2 flex flex-col items-center text-darkGrey dark:text-white ">
					<span className="text-2xl font-semibold">Heatmap</span>
					<span className="text-xs">(Data based on market cap of most active stocks)</span>
				</div>
				<div className=" flex flex-col items-center ">
					<div className="flex justify-between w-[550px] text-xs text-darkGrey dark:text-white">
						<span>-4</span>
						<span>0</span>
						<span>+4</span>
					</div>
					<div className="flex ">
						{colorScale.map((item) => (
							<div key={item.id} className={`w-[50px] h-[20px] ${item.color}`}></div>
						))}
					</div>
				</div>
				<div className=" flex gap-1">
					<div className="flex flex-col gap-1 ">
						<div
							className={`w-[300px] h-[260px] text-2xl text-white flex items-center justify-center ${checkChange(
								heatmapDataSorted[0].change
							)} `}
						>
							{heatmapDataSorted[0].symbol}
							<br />
							{heatmapDataSorted[0].change.toFixed(2)}
						</div>
						<div
							className={`w-[300px] h-[240px] text-2xl text-white flex items-center justify-center ${checkChange(
								heatmapDataSorted[1].change
							)}`}
						>
							{heatmapDataSorted[1].symbol}
							<br />
							{heatmapDataSorted[1].change.toFixed(2)}
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<div
							className={`w-[250px] h-[240px] text-2xl text-white flex items-center justify-center ${checkChange(
								heatmapDataSorted[3].change
							)}`}
						>
							{heatmapDataSorted[3].symbol}
							<br />
							{heatmapDataSorted[3].change.toFixed(2)}
						</div>
						<div
							className={`w-[250px] h-[260px] text-2xl text-white flex items-center justify-center ${checkChange(
								heatmapDataSorted[2].change
							)}`}
						>
							{heatmapDataSorted[2].symbol}
							<br />
							{heatmapDataSorted[2].change.toFixed(2)}
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<div
							className={`w-[220px] h-[170px] text-xl text-white flex items-center justify-center ${checkChange(
								heatmapDataSorted[5].change
							)}`}
						>
							{heatmapDataSorted[5].symbol}
							<br />
							{heatmapDataSorted[5].change.toFixed(2)}
						</div>
						<div
							className={`w-[220px] h-[140px] text-xl text-white flex items-center justify-center ${checkChange(
								heatmapDataSorted[6].change
							)}`}
						>
							{heatmapDataSorted[6].symbol}
							<br />
							{heatmapDataSorted[6].change.toFixed(2)}
						</div>
						<div
							className={`w-[220px] h-[190px] text-xl text-white flex items-center justify-center ${checkChange(
								heatmapDataSorted[4].change
							)}`}
						>
							{heatmapDataSorted[4].symbol}
							<br />
							{heatmapDataSorted[4].change.toFixed(2)}
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<div
							className={`w-[200px] h-[180px] text-md text-white flex items-center justify-center ${checkChange(
								heatmapDataSorted[7].change
							)}`}
						>
							{heatmapDataSorted[7].symbol}
							<br />
							{heatmapDataSorted[7].change.toFixed(2)}
						</div>
						<div className="flex flex-col gap-1">
							{/*
							<div
								className={`w-[50px] h-[180px] text-xs text-white flex items-center justify-center ${checkChange(
									heatmapDataSorted[11].change
								)}`}
							>
								{heatmapDataSorted[11].symbol}
								<br />
								{heatmapDataSorted[11].change.toFixed(2)}
							</div>
							*/}
							<div
								className={`w-[200px] h-[70px] text-xs text-white flex items-center justify-center ${checkChange(
									heatmapDataSorted[10].change
								)}`}
							>
								{heatmapDataSorted[10].symbol}
								<br />
								{heatmapDataSorted[10].change.toFixed(2)}
							</div>
							<div
								className={`w-[200px] h-[100px] text-xs text-white flex items-center justify-center ${checkChange(
									heatmapDataSorted[9].change
								)}`}
							>
								{heatmapDataSorted[9].symbol}
								<br />
								{heatmapDataSorted[9].change.toFixed(2)}
							</div>
						</div>
						<div
							className={`w-[200px] h-[140px] text-sm text-white flex items-center justify-center ${checkChange(
								heatmapDataSorted[8].change
							)}`}
						>
							{heatmapDataSorted[8].symbol}
							<br />
							{heatmapDataSorted[8].change.toFixed(2)}
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="w-[1080px] h-[400px]  font-inter ">
				<div className="h-full flex items-center justify-center bg-white dark:bg-[#2D2F35]">
					<ClipLoader color="#fff" loading={isLoading} cssOverride={override} size={30} aria-label="Loading Spinner" data-testid="loader" />
				</div>
			</div>
		);
	}
};

export default HeatmapContainer;
