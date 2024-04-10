const data = [
	{
		id: 1,
		name: 'Tesla Inc.',
		price: 102.32,
		mcap: 300.33,
		pb: 3.2,
		pe: 'Tesla Inc.',
	},
	{
		id: 2,
		name: 'Tesla Inc.',
		price: 102.32,
		mcap: 300.33,
		pb: 3.2,
		pe: 'Tesla Inc.',
	},
	{
		id: 3,
		name: 'Tesla Inc.',
		price: 102.32,
		mcap: 300.33,
		pb: 3.2,
		pe: 'Tesla Inc.',
	},
	{
		id: 4,
		name: 'Tesla Inc.',
		price: 102.32,
		mcap: 300.33,
		pb: 3.2,
		pe: 'Tesla Inc.',
	},
	{
		id: 5,
		name: 'Tesla Inc.',
		price: 102.32,
		mcap: 300.33,
		pb: 3.2,
		pe: 'Tesla Inc.',
	},
	{
		id: 6,
		name: 'Tesla Inc.',
		price: 102.32,
		mcap: 300.33,
		pb: 3.2,
		pe: 'Tesla Inc.',
	},
];

const FinancialTableMini = () => {
	return (
		<div className="bg-white w-[385px] h-full py-6 font-inter rounded-xl border border-lightSilver shadow-xl">
			<div className="text-center flex justify-between items-center py-3 px-4 text-darkGrey text-sm font-bold ">
				<span className="w-1/5">COMPANY</span>
				<span className="w-1/5">PRICE($)</span>
				<span className="w-1/5">MCAP($M)</span>
				<span className="w-1/5">P/B</span>
				<span className="w-1/5">P/E</span>
			</div>

			{data.map((item) => (
				<div key={item.id} className="text-center py-3 px-4 flex justify-between items-center text-sm font-medium text-darkGrey">
					<span className="w-1/5">{item.name}</span>
					<span className="w-1/5">{item.price}</span>
					<span className="w-1/5">{item.mcap}</span>
					<span className="w-1/5">{item.pb}</span>
					<span className="w-1/5">{item.pe}</span>
				</div>
			))}
		</div>
	);
};

export default FinancialTableMini;
