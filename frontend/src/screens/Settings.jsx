import { NavLink, useParams } from 'react-router-dom';
import Profile from '../components/dashboard/Settings/Profile';
import Passwords from '../components/dashboard/Settings/Passwords';
import Plan from '../components/dashboard/Settings/Plan';
import Billing from '../components/dashboard/Settings/Billing';
import { useEffect, useState } from 'react';

const settingsNavLinks = [
	{
		id: 1,
		name: 'Profile',
		link: '/settings/profile',
		component: Profile,
	},
	{
		id: 2,
		name: 'Password',
		link: '/settings/password',
		component: Passwords,
	},
	{
		id: 3,
		name: 'Team',
		link: '/settings/team',
	},
	{
		id: 4,
		name: 'Plan',
		link: '/settings/plan',
		component: Plan,
	},
	{
		id: 5,
		name: 'Billing',
		link: '/settings/billing',
		component: Billing,
	},
	{
		id: 6,
		name: 'Email',
		link: '/settings/email',
	},
	{
		id: 7,
		name: 'Notifications',
		link: '/settings/notifications',
	},
	{
		id: 8,
		name: 'Integrations',
		link: '/settings/integrations',
	},
	{
		id: 9,
		name: 'Security',
		link: '/settings/security',
	},
];

const Settings = () => {
	const [component, setComponent] = useState(settingsNavLinks[0]);
	const handleNavClick = (id) => {
		const selectedComponent = settingsNavLinks.find((item) => item.id === id);
		setComponent(selectedComponent);
	};

	useEffect(() => {}, [component]);
	return (
		<div className="pl-24 pt-8 font-inter">
			<h2 className="text-2xl font-semibold ">Settings</h2>
			<div className="flex mt-8 gap-20">
				<aside>
					<div className="flex flex-col gap-3">
						{settingsNavLinks.map((link) => (
							<NavLink
								key={link.id}
								to={link.link}
								className={({ isActive, isPending }) =>
									isPending
										? 'pending'
										: isActive
										? 'font-semibold text-dashboardBlue border-l border-dashboardBlue'
										: 'font-normal text-darkGrey'
								}
								onClick={() => handleNavClick(link.id)}
							>
								<span className="p-1 text-sm ">{link.name}</span>
							</NavLink>
						))}
					</div>
				</aside>
				<div className="flex-col h-full">
					<div className="flex justify-between items-center w-[800px] mb-4 h-full">
						<div className="">
							<h3 className="text-md font-semibold mb-1">{component.name}</h3>
							<span className="text-xs text-[#989898]">Update your Company photos and details here</span>
						</div>
					</div>

					{component.component && <component.component />}
				</div>
			</div>
		</div>
	);
};

export default Settings;
