import dashboardLogo from '../../../assets/dashboard/logos/dashboardLogo.svg';
import { NavLink } from 'react-router-dom';
import homeIcon from '../../../assets/dashboard/icons/homeIcon.svg';
import lightModeIcon from '../../../assets/dashboard/icons/lightmode-icon.svg';
import accountIcon from '../../../assets/dashboard/icons/account-icon.svg';
import updatesIcon from '../../../assets/dashboard/icons/update-icon.svg';
import logoutIcon from '../../../assets/dashboard/icons/logout-icon.svg';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../../../redux/slices/authSlice';
import { toggleDarkMode } from '../../../redux/slices/themeSlice';

const sidebarItems = [
	{
		id: 1,
		title: 'Dashboard',
		icon: homeIcon,
		path: 'dashboard',
	},
];

const sidebarItems2 = [
	{
		id: 1,
		title: 'Light/Dark Mode',
		icon: lightModeIcon,
		path: '#',
	},
	{
		id: 2,
		title: 'My Account',
		icon: accountIcon,
		path: 'settings',
	},
	{
		id: 3,
		title: 'Updates & FAQ',
		icon: updatesIcon,
		path: '#',
	},
	{
		id: 4,
		title: 'Logout',
		icon: logoutIcon,
		path: '#',
	},
];

const Sidebar = () => {
	const [active, setActive] = useState(false);
	const dispatch = useDispatch();
	return (
		<div
			className={`${!active ? ' -left-52' : 'left-0'} fixed top-0 bottom-0  z-50 bg-secondaryGrey w-64 h-full space-y-4
			transition-all duration-200 ease-in
			`}
			onMouseEnter={() => setActive(true)}
			onMouseLeave={() => setActive(false)}
		>
			<div className="px-16 pt-4">
				<img src={dashboardLogo} alt="Logo" className=" w-14 " />
			</div>

			<div className="flex flex-col justify-between space-y-10">
				<div className="w-full">
					{sidebarItems.map((item) => (
						<NavLink
							key={item.id}
							to={item.path}
							className={({ isActive }) => (isActive ? 'bg-secondaryGrey' : '')}
							style={({ isActive }) => {
								return {
									backgroundColor: isActive ? '#393A3E' : '',
									borderTop: isActive ? '2px solid #FF5B5B' : '',
								};
							}}
						>
							<div className={`${!active && 'justify-end'}   flex items-center py-3 px-4 space-x-4 `}>
								<img src={item.icon} alt="" className="w-5" />
								{active && (
									<div className="flex justify-between w-full">
										<span className="font-nunito font-normal text-white"> {item.title} </span>
										<span className={`${item.title !== 'Dashboard' && item.title !== 'Widgets' ? 'block' : 'hidden'} text-white `}>
											{' '}
											{<MdKeyboardArrowDown />}{' '}
										</span>
									</div>
								)}
							</div>
						</NavLink>
					))}
				</div>

				<div className="w-full">
					{sidebarItems2.map((item) => (
						<NavLink
							key={item.id}
							to={item.path}
							className={({ isActive }) => (isActive ? 'bg-secondaryGrey' : '')}
							style={({ isActive }) => {
								return {
									backgroundColor: isActive ? '#393A3E' : '',
									borderTop: isActive ? '2px solid #FF5B5B' : '',
								};
							}}
						>
							<div
								className={`${!active && 'justify-end'}   flex items-center py-3 px-4 space-x-4 `}
								onClick={
									item.title === 'Logout'
										? () => dispatch(logoutSuccess())
										: item.title === 'Light/Dark Mode'
										? () => dispatch(toggleDarkMode())
										: ''
								}
							>
								<img src={item.icon} alt="" className="w-5" />
								{active && (
									<div className="flex justify-between w-full">
										<span className="font-nunito font-normal text-white"> {item.title} </span>
									</div>
								)}
							</div>
						</NavLink>
					))}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
