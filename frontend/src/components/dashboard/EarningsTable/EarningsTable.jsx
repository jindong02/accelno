const data = [
	{
		'TICKER 428 Matches': 'CVS Health Corp',
		'MKT CAP': '89.991 B',
		'EPS ESTIMATE': 2.89,
		'REPORTED EPS': 2.98,
		SURPRISE: 0.08,
		'SURPRISE %': '2.77%',
		'REVENUE FORECAST': '140 B',
	},
	{
		'TICKER 428 Matches': 'CVS Health Corp',
		'MKT CAP': '89.991 B',
		'EPS ESTIMATE': 2.89,
		'REPORTED EPS': 2.98,
		SURPRISE: 0.08,
		'SURPRISE %': '2.77%',
		'REVENUE FORECAST': '140 B',
	},
	{
		'TICKER 428 Matches': 'CVS Health Corp',
		'MKT CAP': '89.991 B',
		'EPS ESTIMATE': 2.89,
		'REPORTED EPS': 2.98,
		SURPRISE: 0.08,
		'SURPRISE %': '2.77%',
		'REVENUE FORECAST': '140 B',
	},
	{
		'TICKER 428 Matches': 'CVS Health Corp',
		'MKT CAP': '89.991 B',
		'EPS ESTIMATE': 2.89,
		'REPORTED EPS': 2.98,
		SURPRISE: 0.08,
		'SURPRISE %': '2.77%',
		'REVENUE FORECAST': '140 B',
	},
	{
		'TICKER 428 Matches': 'CVS Health Corp',
		'MKT CAP': '89.991 B',
		'EPS ESTIMATE': 2.89,
		'REPORTED EPS': 2.98,
		SURPRISE: 0.08,
		'SURPRISE %': '2.77%',
		'REVENUE FORECAST': '140 B',
	},
	{
		'TICKER 428 Matches': 'CVS Health Corp',
		'MKT CAP': '89.991 B',
		'EPS ESTIMATE': 2.89,
		'REPORTED EPS': 2.98,
		SURPRISE: 0.08,
		'SURPRISE %': '2.77%',
		'REVENUE FORECAST': '140 B',
	},
	{
		'TICKER 428 Matches': 'CVS Health Corp',
		'MKT CAP': '89.991 B',
		'EPS ESTIMATE': 2.89,
		'REPORTED EPS': 2.98,
		SURPRISE: 0.08,
		'SURPRISE %': '2.77%',
		'REVENUE FORECAST': '140 B',
	},
	{
		'TICKER 428 Matches': 'CVS Health Corp',
		'MKT CAP': '89.991 B',
		'EPS ESTIMATE': 2.89,
		'REPORTED EPS': 2.98,
		SURPRISE: 0.08,
		'SURPRISE %': '2.77%',
		'REVENUE FORECAST': '140 B',
	},
	{
		'TICKER 428 Matches': 'CVS Health Corp',
		'MKT CAP': '89.991 B',
		'EPS ESTIMATE': 2.89,
		'REPORTED EPS': 2.98,
		SURPRISE: 0.08,
		'SURPRISE %': '2.77%',
		'REVENUE FORECAST': '140 B',
	},
	{
		'TICKER 428 Matches': 'CVS Health Corp',
		'MKT CAP': '89.991 B',
		'EPS ESTIMATE': 2.89,
		'REPORTED EPS': 2.98,
		SURPRISE: 0.08,
		'SURPRISE %': '2.77%',
		'REVENUE FORECAST': '140 B',
	},
];

const EarningsTable = () => {
	return (
		<div className=" w-[950px] border border-lightSilver font-poppins">
			<table className="w-full text-left">
				<thead className="bg-white text-sm">
					<tr className="">
						<th className="py-6 px-4">TICKER 428 MATCHES</th>
						<th className="py-6 px-4">MKT CAP</th>
						<th className="py-6 px-4">EPS ESTIMATE</th>
						<th className="py-6 px-4">REPORTED EPS</th>
						<th className="py-6 px-4">SURPRISE</th>
						<th className="py-6 px-4">SURPRISE %</th>
						<th className="py-6 px-4">REVENUE FORECAST</th>
					</tr>
				</thead>
				<tbody>
					{data.map((rowData, index) => (
						<tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-primarySilver'}`}>
							{Object.values(rowData).map((value, innerIndex) => (
								<td key={innerIndex} className="p-3 text-sm text-darkGrey font-semibold text-center">
									{value}
									{innerIndex !== 0 && innerIndex !== 5 ? <span className="ml-1 text-xs text-secondarySilver">USD</span> : ''}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default EarningsTable;
