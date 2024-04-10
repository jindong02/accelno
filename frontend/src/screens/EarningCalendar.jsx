import viewIcon from '../assets/dashboard/icons/view-icon.svg';
import { MdKeyboardArrowDown } from 'react-icons/md';
import StockTicker from '../components/dashboard/stockticker/StockTicker';
import EarningsTable from '../components/dashboard/EarningsTable/EarningsTable';
import RecentActivities from '../components/dashboard/RecentActivities/RecentActivities';

const EarningCalendar = () => {
	return (
		<div className="h-full font-poppins bg-primarySilver">
			<StockTicker />
			<div className="flex justify-between px-16 pt-10">
				<div className="space-y-2">
					<h1 className="font-bold text-xl text-primaryGrey">EARNING CALENDAR</h1>
					<span className="font-medium text-xs">Track your stocks, Look at Watchlists created by the community</span>
				</div>
				<div className="h-10 flex space-x-2 font-semibold text-sm">
					<div className="border border-secondaryGrey px-3 py-2 rounded-md flex items-center space-x-2 ">
						<span>Monthly </span>
						<span>
							<MdKeyboardArrowDown />
						</span>
					</div>
					<div className="px-3 py-2 rounded-md flex items-center space-x-2 bg-dashboardBlue">
						<img src={viewIcon} alt="" className="h-5" />
						<span className="text-white">View report </span>
					</div>
				</div>
			</div>
			<div className="flex justify-end pb-10 px-4 space-x-6">
				<div className="mt-14">
					<EarningsTable />
				</div>
				<div>
					<RecentActivities />
				</div>
			</div>
		</div>
	);
};

export default EarningCalendar;
