import StripeSubscription from '../services/StripeSubscription';
import checkIcon from '../assets/icons/checkIcon.svg';
import minusIcon from '../assets/icons/minusIcon.svg';
import plusIcon from '../assets/icons/plusIcon.svg';
import { useParams } from 'react-router-dom';
import { plans } from '../pages/PricingPlan';

const Checkout = () => {
	const { planId } = useParams();
	const plan = plans.find((plan) => plan.id === Number(planId));

	return (
		<div className="flex space-x-3 justify-center py-10">
			<div className=" bg-[#F7FAFC] w-[550px] p-12 h-full space-y-10 font-inter rounded-md">
				<div className="flex space-x-5 text-[#3182CE] font-medium">
					<span>Account</span>

					<img src={checkIcon} alt="check icon" className="w-20" />

					<span>Plan</span>
					<img src={checkIcon} alt="check icon" className="w-20" />
					<span>Payment</span>
				</div>
				<div className="space-y-5">
					<span className="text-md font-semibold">Payment Details</span>
					{/*
						<div className="flex justify-between items-center text-[#2D3748] text-sm">
						<span className="">Use saved card</span>
						<select className="bg-[#E2E8F0] p-3 rounded-md">
							<option>Mastercard ending in 4242</option>
						</select>
					</div>
						
						
						
						
						*/}
				</div>

				<StripeSubscription />
			</div>
			<div className="bg-[#F7FAFC] w-[350px] h-full py-12 px-6 space-y-8 font-inter rounded-md">
				<div className="sm-looper-wrapper ">
					<span className="font-medium text-md">Order Summary</span>
				</div>
				<div className="flex justify-between items-center">
					<div className="flex flex-col space-y-2">
						<span className="text-md font-medium">{plan?.title}</span>
						<span className="text-md font-bold">${plan?.price}/m</span>
					</div>
					<div className="flex items-center space-x-3">
						<span className="bg-[#E2E8F0] px-3 py-1 rounded-md">
							<img src={minusIcon} alt="" className="h-5" />
						</span>
						<span> 1 </span>
						<span className="bg-[#E2E8F0] px-3 py-1 rounded-md">
							<img src={plusIcon} alt="" className="h-5" />
						</span>
					</div>
				</div>
				<div className="space-y-4">
					<p className="text-xs font-medium text-[#718096]">Gift Card / Discount code</p>
					<div className="flex justify-between mb-6">
						<input type="text" className="bg-[#E2E8F0] p-3 rounded-md w-3/5" />
						<button className="px-5 py-3 border border-[#3182CE] rounded-md text-sm font-medium text-[#3182CE]">Apply </button>
					</div>

					<div className=" space-y-6">
						<div className="flex justify-between text-sm font-medium">
							<span>Subtotal</span>
							<span>${plan?.price}</span>
						</div>
						<div className="flex justify-between text-sm font-medium">
							<span>Tax</span>
							<span>$0.0</span>
						</div>
						<div className="flex justify-between text-md font-semibold">
							<span>Total</span>
							<span>${plan?.price}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
