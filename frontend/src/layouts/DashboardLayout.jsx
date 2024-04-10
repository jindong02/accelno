import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../components/dashboard/navbar/DashboardNavbar';
import Sidebar from '../components/dashboard/sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { selectIsDarkMode } from './../redux/slices/themeSlice';

const DashboardLayout = () => {
	const isDarkMode = useSelector(selectIsDarkMode);

	return (
		<>
			<div className={`${isDarkMode ? 'dark' : ''}`}>
				<DashboardNavbar />
				<main>
					<Sidebar />
					<Outlet />
				</main>
			</div>
		</>
	);
};

export default DashboardLayout;
