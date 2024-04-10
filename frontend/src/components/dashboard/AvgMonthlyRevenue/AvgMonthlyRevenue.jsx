/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import Barchart from '../charts/barchart/Barchart';
import { MdSaveAlt } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteWidget } from '../../../redux/slices/widgetSlice';

const AvgMonthlyRevenue = ({ size, widgetId }) => {
	const [edit, setEdit] = useState(false);
	const dispatch = useDispatch();

	const handleWidgetDelete = (widgetId) => {
		dispatch(deleteWidget(widgetId));
	};
	return (
		<div
			className={`${
				size === 'small' ? 'w-[530px]' : size === 'medium' ? 'w-[600px]' : 'w-[700px]'
			} px-4 pt-4 pb-1 font-inter rounded-xl border border-lightSilver  flex justify-center bg-white`}
		>
			<div className="flex justify-end pb-1 ">
				{!edit ? (
					<span className="cursor-pointer" onClick={() => setEdit(!edit)}>
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
			<div className="flex flex-col space-y-7">
				<div className={`${size === 'small' ? 'text-xs' : size === 'medium' ? 'text-sm' : 'text-md'} flex flex-col space-y-1`}>
					<span className="font-poppins font-bold  text-secondarySilver">Average Monthly Revenue</span>
					<span className="font-poppins  text-darkGrey font-bold">$ 324,18 </span>
					<div className="flex font-inter font-semibold space-x-2">
						<span className="text-secondarySilver">m/m:-525,89</span>
						<span className="text-red-700">(-2.24%)</span>
					</div>
				</div>
				<div className={`${size === 'small' ? 'text-xs' : size === 'medium' ? 'text-sm' : 'text-md'} space-y-1`}>
					<div className="flex  font-bold font-inter text-secondarySilver space-x-2">
						<span>Dividend Profit:</span>
						<span>$ 86,05</span>
					</div>
					<span className=" text-secondarySilver font-medium">2 forthcoming dividends</span>
					<div className="flex font-bold font-inter text-secondarySilver space-x-2">
						<span>Transactions:</span>
						<span>4</span>
					</div>
				</div>
				<div className="flex  items-center font-semibold text-sm text-blue-700 space-x-2">
					<MdSaveAlt size={18} />
					<span className="">Download pdf report</span>
				</div>
			</div>
			<div className="">
				<Barchart size={size} />
			</div>
		</div>
	);
};

export default AvgMonthlyRevenue;
