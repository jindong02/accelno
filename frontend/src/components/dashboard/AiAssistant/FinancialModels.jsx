const models = [
	{
		id: 1,
	},
	{
		id: 2,
	},
	{
		id: 3,
	},
	{
		id: 4,
	},
	{
		id: 5,
	},
	{
		id: 6,
	},
];

const FinancialModels = () => {
	return (
		<div className=" flex flex-wrap justify-center p-2">
			{models.map((model) => (
				<div key={model.id} className="m-2 w-[160px] h-[90px] border-2 border-[#7F9FE5] shadow-2xl rounded-md"></div>
			))}
		</div>
	);
};

export default FinancialModels;
