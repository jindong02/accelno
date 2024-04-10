import { MdKeyboardArrowDown, MdInfoOutline } from 'react-icons/md';
import { useGetMoversQuery } from '../../../api/endpoints/widgetDataApi';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import WidgetConfiguration from '../WidgetConfiguration/WidgetConfiguration';
import ClipLoader from 'react-spinners/ClipLoader';
import { updateWidgetSize, selectWidgetsByScreen } from '../../../redux/slices/widgetSlice';
import { useSelector } from 'react-redux';

const GainerLoser = ({ widgetId, screen }) => {
	const { data: gainersData, isLoading: gainersLoading, error: gainersError } = useGetMoversQuery('gainers');
	const { data: losersData, isLoading: losersLoading, error: losersError } = useGetMoversQuery('losers');

	const [isGainer, setIsGainer] = useState(true);
	const [size, setSize] = useState('small');
	const [edit, setEdit] = useState(false);
	const requiredData = isGainer ? gainersData : losersData;
	const dispatch = useDispatch();

	const selectedWidgets = useSelector((state) => selectWidgetsByScreen(state, screen));
	const activeWidget = selectedWidgets?.find((widget) => widget.id === widgetId);

	useEffect(() => {
		if (activeWidget?.size) {
			setSize(activeWidget.size);
		} else {
			setSize('small');
		}
	}, [setSize, activeWidget?.size]);

	const handleSaveBtnClick = () => {
		setEdit(false);
		dispatch(updateWidgetSize({ screen, widgetId, size }));
	};

	const override = {
		display: 'block',
		margin: '0 auto',
		borderColor: '#2151C0',
	};

	return (
		<div
			className={`bg-white dark:bg-[#2D2F35] dark:border-none font-inter rounded-xl border border-lightSilver shadow-md py-1 ${
				size === 'small' ? ' w-[320px]' : size === 'medium' ? ' w-[420px]' : size === 'large' ? ' w-[520px]' : ''
			} `}
		>
			{gainersLoading || losersLoading ? (
				<div className="h-full flex items-center justify-center bg-white dark:bg-[#1F2023]">
					<ClipLoader
						color="#fff"
						loading={gainersLoading || losersLoading}
						cssOverride={override}
						size={30}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			) : edit ? (
				<WidgetConfiguration
					size={size}
					setSize={setSize}
					isResizable={true}
					edit={edit}
					setEdit={setEdit}
					isInputBased={false}
					screen={screen}
					widgetId={widgetId}
					handleSaveBtnClick={handleSaveBtnClick}
				/>
			) : (
				<div>
					<div className="flex justify-end p-1 ">
						<span className="cursor-pointer text-xl text-darkGrey dark:text-white" onClick={() => setEdit(!edit)}>
							{<MdInfoOutline />}
						</span>
					</div>

					<div
						className={`${
							size === 'small' ? 'text-xs' : size === 'medium' ? 'text-sm' : size === 'large' ? 'text-md' : ''
						} flex justify-between items-center text-darkGrey dark:text-white pb-4 px-3`}
					>
						<span className="font-bold  ">Today&#39;s Gainer/Loser</span>
						<div className="flex items-center space-x-2 cursor-pointer" onClick={() => setIsGainer(!isGainer)}>
							<span className=" font-medium">{isGainer ? 'Gainers' : 'Losers'}</span>
							<MdKeyboardArrowDown />
						</div>
					</div>
					<div
						className={`${
							size === 'small' ? 'text-xs py-2' : size === 'medium' ? 'text-sm py-3' : size === 'large' ? 'text-md py-4' : ''
						}   custom-stripe  px-3 flex justify-between text-left items-center bg-dashboardBlue  font-semibold text-white`}
					>
						<span className="w-[40%]">Company</span>
						<span className="w-[30%] text-center">Price ($)</span>
						<span className="w-[30%] text-right">Change %</span>
					</div>

					<div className="">
						{requiredData?.map((item, i) => (
							<div
								key={i}
								className={`${
									size === 'small' ? 'text-xs py-3' : size === 'medium' ? 'text-sm py-4' : size === 'large' ? 'text-md py-5' : ''
								}  px-3 flex justify-between items-center font-medium text-darkGrey dark:text-white`}
							>
								<span className="w-[40%]"> {item.shortName} </span>
								<span className="w-[30%] text-center ">{item.price}</span>

								<div className={`w-[30%] text-center  `}>
									<span
										className={`${isGainer ? 'bg-primaryGreen' : 'bg-red-400'}  py-1 px-3 text-center rounded-lg text-white font-normal`}
									>
										{Math.round(item.change)} %
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default GainerLoser;
