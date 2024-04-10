import { MdTrendingUp } from 'react-icons/md';

const stocksData = [
	{
		id: 1,
		symbol: 'AAPL',
		name: 'Apple Inc.',
		change: '+1.27%',
	},
	{
		id: 2,
		symbol: 'TSLA',
		name: 'Tesla Inc.',
		change: '+4.12%',
	},
	{
		id: 3,
		symbol: 'AMZN',
		name: 'Amazon.com Inc.',
		change: '+2.12%',
	},
	{
		id: 4,
		symbol: 'GOOGL',
		name: 'Alphabet Inc.',
		change: '-0.15%',
	},
	{
		id: 5,
		symbol: 'MSFT',
		name: 'Microsoft Corporation',
		change: '+0.15%',
	},
];

const StockTicker = () => {
	return (
		<div className="stock-ticker-container w-full py-4 bg-white">
			<div className="flex justify-center items-center max-w-7xl mx-auto space-x-6">
				{stocksData.map((stock) => (
					<div key={stock.id} className="font-inter text-sm">
						<span className="text-darkGrey font-bold">{stock.symbol}</span>
						<span className="text-secondarySilver font-semibold"> {stock.name} </span>
						<span className={`${stock.change.charAt(0) === '-' ? 'text-darkPink' : 'text-primaryGreen'} font-semibold`}>
							({stock.change})
						</span>
					</div>
				))}
				<div className="flex items-center justify-center space-x-1 ">
					<MdTrendingUp className="text-2xl" />
					<span className="font-bold text-sm font-poppins">Stocks</span>
				</div>
			</div>
		</div>
	);
};

export default StockTicker;
