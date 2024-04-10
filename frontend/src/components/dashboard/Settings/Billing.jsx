const Billing = () => {
	return (
		<div className="flex flex-col border-t border-[#A7A8AB] py-4 gap-6 font-inter">
			<div className="flex justify-start items-center gap-16">
				<span className="text-sm font-medium"> - Card ending with 9401 - </span>
				<button className="text-sm text-secondaryBlue font-semibold hover:underline ">Change Payment</button>
			</div>
			<span className="text-sm text-[#989898] font-semibold italic"> Your next billing date is 29/09/2023 </span>
		</div>
	);
};

export default Billing;
