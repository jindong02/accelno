import { useState } from 'react';
import { MdDone } from 'react-icons/md';
import ClipLoader from 'react-spinners/ClipLoader';

const plansData = [
	{
		id: 1,
		name: 'Basic',
		desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, minus?',
		price: 50,
	},
	{
		id: 2,
		name: 'Standard',
		desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, minus?',
		price: 79,
	},
	{
		id: 3,
		name: 'Premium',
		desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, minus?',
		price: 99,
	},
];

const Plan = () => {
	// eslint-disable-next-line no-unused-vars
	const [selectedPlan, setSelectedPlan] = useState(plansData[1]);
	const [updatedPlan, setUpdatedPlan] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = (plan) => {
		setUpdatedPlan(plan);
		setSelectedPlan(plan);
	};

	const handleSaveBtn = () => {
		if (updatedPlan) {
			setIsLoading(true);

			// Simulating an API call or some asynchronous operation
			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		}
	};

	const override = {
		display: 'block',
		margin: '60px auto',
		borderColor: '#2151C0',
	};

	return (
		<div className="flex flex-col border-t border-[#A7A8AB] py-4 gap-3">
			{isLoading ? (
				<ClipLoader color="#fff" loading={isLoading} cssOverride={override} size={50} aria-label="Loading Spinner" data-testid="loader" />
			) : (
				plansData.map((plan) => (
					<div
						key={plan.id}
						className={`relative w-4/5 h-20 border-4 ${
							plan.id === selectedPlan.id ? 'border-dashboardBlue cursor-not-allowed' : 'border-lightGrey cursor-pointer'
						} flex items-center hover:border-dashboardBlue `}
						onClick={() => plan.id !== selectedPlan.id && handleClick(plan)}
					>
						<span className="text-sm font-semibold bg-inputGrey h-full w-1/6 flex justify-center items-center">{plan.name}</span>
						<p className="px-3 text-xs font-semibold">{plan.desc}</p>
						<span className="text-md font-semibold h-full w-1/6 flex justify-center items-center px-3">${plan.price}/month</span>

						{plan.id === selectedPlan.id && (
							<span className="absolute top-1/2 -translate-y-1/2 -left-4 p-1 rounded-full bg-dashboardBlue flex items-center justify-center text-white text-lg">
								<MdDone />
							</span>
						)}
					</div>
				))
			)}
			<div className="absolute bottom-6 right-8 flex gap-3 text-sm font-normal">
				<button className="border border-[#A7A8AB] py-2 px-4 rounded-md">Cancel</button>
				<button
					className={` ${
						updatedPlan ? 'bg-[#381EDA] text-white cursor-pointer' : 'bg-lightGrey text-yellow-50 cursor-not-allowed'
					}   py-2 px-4 rounded-md `}
					disabled={!updatedPlan}
					onClick={handleSaveBtn}
				>
					Save{' '}
				</button>
			</div>
		</div>
	);
};

export default Plan;
