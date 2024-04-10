import Switch from 'react-switch';
import Pricing from '../components/common/Pricing';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const handleChange = () => {
	console.log('changed');
};

export const plans = [
	{
		id: 1,
		title: 'Basic',
		price: '50',
	},
	{
		id: 2,
		title: 'Standard',
		price: '79',
	},
	{
		id: 3,
		title: 'Premium',
		price: '99',
	},
];

const PricingPlan = () => {
	const [selected, setSelected] = useState(null);
	const navigate = useNavigate();
	const handleBtnClick = () => {
		navigate(`/checkout/${selected}`);
	};

	return (
		<div className="pb-8 bg-lightGrey text-center space-y-4 ">
			<div className="font-poppins text-base text-white font-medium bg-secondaryBlue py-28 px-4 flex flex-row items-center justify-center space-x-3 ">
				<span>Monthly</span>
				<Switch
					onChange={handleChange}
					checked={true}
					onColor="#86d3ff"
					onHandleColor="#2693e6"
					handleDiameter={30}
					uncheckedIcon={false}
					checkedIcon={false}
					boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
					activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
					height={20}
					width={48}
				/>
				<span>Yearly</span>
			</div>
			<div className=" py-10 px-6 flex md:flex-row flex-col justify-center items-center md:space-x-9 md:space-y-0 space-y-4">
				{plans.map((plan) => (
					<Pricing
						key={plan.id}
						id={plan.id}
						title={plan.title}
						price={plan.price}
						setSelected={setSelected}
						isSelected={selected === plan.id}
					/>
				))}
			</div>
			<button
				disabled={!selected}
				className={` font-poppins font-semibold text-lg rounded-md text-white py-4 px-56   ${selected ? 'bg-[#0A1628]' : 'bg-[#677C9A]'}`}
				onClick={handleBtnClick}
			>
				Next
			</button>
		</div>
	);
};

export default PricingPlan;
