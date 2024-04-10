import { MdDone } from 'react-icons/md';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Pricing = ({ id, title, price, isSelected, setSelected, isDumb }) => {
	const [isHovered, setIsHovered] = useState(false);
	const navigate = useNavigate();
	return (
		<div
			className={`w-80 md:w-96 ${!isDumb ? 'space-y-20' : 'space-y-8'} pt-4 px-6 pb-32 font-poppins shadow-lg  ${
				isHovered ? 'scale-110' : ''
			} transition-all duration-200 ease-in-out cursor-pointer ${isSelected ? 'bg-[#1A2DD7] text-white' : 'bg-white'}`}
			onMouseEnter={() => {
				!isDumb && setIsHovered(!isHovered);
			}}
			onMouseLeave={() => {
				!isDumb && setIsHovered(!isHovered);
			}}
			onClick={() => {
				setSelected(id);
			}}
		>
			<div className="space-y-4 text-center flex flex-col">
				<h1 className="text-lg font-semibold "> {title} </h1>

				<span className="font-semibold text-2xl">
					$<span className="text-4xl">{price}</span>
					<span className="text-sm"> month</span>{' '}
				</span>
				{
					// Same component is used in the landing page with Get Started button but does not have any other functionality
					// So, isDumb prop is used to check if the component is used in the landing page or not
					// If it is used in the landing page, then the Get Started button is shown and other props are not passed
					isDumb && (
						<button
							className="text-xl font-semibold text-primaryBlue border border-primaryPurple w-40 py-3 rounded-md mx-auto"
							onClick={() => {
								navigate('/register');
							}}
						>
							{' '}
							Get Started{' '}
						</button>
					)
				}
			</div>
			<div className="space-y-4 flex flex-col text-base font-semibold justify-center">
				<span className="space-x-2 flex">
					<span className="text-secondaryPurple text-2xl font-bold">
						<MdDone />
					</span>{' '}
					<span>Custom custom </span>
				</span>
				<span className="space-x-2 flex">
					<span className="text-secondaryPurple text-2xl font-bold">
						<MdDone />
					</span>{' '}
					<span>Custom custom </span>
				</span>
				<span className="space-x-2 flex">
					<span className="text-secondaryPurple text-2xl font-bold">
						<MdDone />
					</span>{' '}
					<span>Custom custom </span>
				</span>
				<span className="space-x-2 flex">
					<span className="text-secondaryPurple text-2xl font-bold">
						<MdDone />
					</span>{' '}
					<span>Custom custom </span>
				</span>
				<span className="space-x-2 flex">
					<span className="text-secondaryPurple text-2xl font-bold">
						<MdDone />
					</span>{' '}
					<span>Custom custom </span>
				</span>
				<span className="space-x-2 flex">
					<span className="text-secondaryPurple text-2xl font-bold">
						<MdDone />
					</span>{' '}
					<span>Custom custom </span>
				</span>
				<span className="space-x-2 flex">
					<span className="text-secondaryPurple text-2xl font-bold">
						<MdDone />
					</span>{' '}
					<span>Custom custom </span>
				</span>
			</div>
		</div>
	);
};

export default Pricing;
