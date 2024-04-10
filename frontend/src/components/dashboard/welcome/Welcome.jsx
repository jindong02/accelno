import addIcon from '../../../assets/dashboard/icons/addIcon.svg';
import { openModal } from '../../../redux/slices/modalSlice';
import { useDispatch } from 'react-redux';
import { selectIsDarkMode } from '../../../redux/slices/themeSlice';

const Welcome = () => {
	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(openModal());
	};

	return (
		<div className="w-full h-full dark:bg-[#1F2023] bg-white  py-20">
			<div
				className="dark:bg-[#2D2F35] bg-white dark:shadow-none shadow-2xl
				    w-[600px] h-[400px] mx-auto py-36 px-4  rounded-xl flex flex-col justify-center items-center space-y-12"
			>
				<div className=" font-inter text-3xl ">
					<span className={`dark:text-white text-darkGrey  `}> Hi, </span>{' '}
					<span className="font-bold text-primaryGold "> Fynn Schwichtenberg </span>
				</div>
				<img src={addIcon} alt="Add Icon" className="w-28 cursor-pointer " onClick={handleClick} />
			</div>
		</div>
	);
};

export default Welcome;
