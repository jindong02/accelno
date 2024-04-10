import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navigation/Navbar';

const RootLayout = () => {
	return (
		<>
			<Navbar />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;
