import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { MdPaid, MdMoreVert } from 'react-icons/md';
import './RecentActivities.css';

const RecentActivities = () => {
	return (
		<div className=" pt-3 font-poppins">
			<div className="flex justify-end font-semibold">
				<button className="rounded-tl-md rounded-bl-md py-3 px-6 bg-dashboardBlue text-white">Recent</button>
				<button className="rounded-tr-md rounded-br-md py-3 px-6 bg-searchbarGrey text-primaryGrey">Alerts</button>
			</div>
			<div className="bg-white activity-container mx-auto w-[270px] px-2 py-10 overflow-hidden">
				<div className="flex justify-between mb-4 md:text-md 2xl:text-lg px-4">
					<span className=" font-semibold text-darkGrey"> RECENT </span>
					<MdMoreVert />
				</div>
				<div className="overflow-y-scroll h-full">
					<VerticalTimeline layout="1-column-left" lineColor="#2D2F35">
						<VerticalTimelineElement
							style={{ margin: '0px' }}
							className="vertical-timeline-element--work"
							contentStyle={{ color: '#2D2F35', border: 'none', boxShadow: 'none' }}
							contentArrowStyle={{ display: 'none' }}
							date="10 minutes ago"
							iconStyle={{ background: '#2151C0', color: '#fff' }}
							icon={<MdPaid />}
						>
							<h1 className="font-bold text-darkGrey md:text-sm 2xl:text-md mb-2"> You Sold an item </h1>
							<span className=" md:text-sm 2xl:text-md ">
								Curabitur non leo mauris. Quisque dapibus massa in nisi tincidunt, vitae lacinia ex vestibulum.
							</span>
						</VerticalTimelineElement>
						<VerticalTimelineElement
							style={{ margin: '0px' }}
							className="vertical-timeline-element--work"
							contentStyle={{ color: '#2D2F35', border: 'none', boxShadow: 'none' }}
							contentArrowStyle={{ display: 'none' }}
							date="10 minutes ago"
							iconStyle={{ background: '#2151C0', color: '#fff' }}
							icon={<MdPaid />}
						>
							<h1 className="font-bold text-darkGrey md:text-sm 2xl:text-md mb-2"> You Sold an item </h1>
							<span className=" md:text-sm 2xl:text-md ">
								Curabitur non leo mauris. Quisque dapibus massa in nisi tincidunt, vitae lacinia ex vestibulum.
							</span>
						</VerticalTimelineElement>
						<VerticalTimelineElement
							style={{ margin: '0px' }}
							className="vertical-timeline-element--work"
							contentStyle={{ color: '#2D2F35', border: 'none', boxShadow: 'none' }}
							contentArrowStyle={{ display: 'none' }}
							date="10 minutes ago"
							iconStyle={{ background: '#2151C0', color: '#fff' }}
							icon={<MdPaid />}
						>
							<h1 className="font-bold text-darkGrey md:text-sm 2xl:text-md mb-2"> You Sold an item </h1>
							<span className=" md:text-sm 2xl:text-md ">
								Curabitur non leo mauris. Quisque dapibus massa in nisi tincidunt, vitae lacinia ex vestibulum.
							</span>
						</VerticalTimelineElement>

						<VerticalTimelineElement iconStyle={{ background: '#2151C0', color: '#fff' }} icon={<MdPaid />} />
					</VerticalTimeline>
				</div>
			</div>
		</div>
	);
};

export default RecentActivities;
