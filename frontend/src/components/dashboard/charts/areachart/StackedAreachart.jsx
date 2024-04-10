import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { curveCardinal } from 'd3-shape';

const positiveGradientColors = [
	{ offset: '0%', color: 'rgba(20, 198, 122, 0.8)' },
	{ offset: '50%', color: 'rgba(20, 198, 122, 0.216)' },
	{ offset: '100%', color: 'rgba(20, 198, 122, 0)' },
];

const negativeGradientColors = [
	{ offset: '0%', color: 'rgba(255, 0, 0, 0.9)' },
	{ offset: '50%', color: 'rgba(255, 0, 0, 0.2)' },
	{ offset: '100%', color: 'rgba(255, 0, 0, 0)' },
];

const transformDataForChart = (data) => {
	if (!data || !data.chart || !data.chart.result || data.chart.result.length === 0) {
		return [];
	}

	const closeValues = data.chart.result[0].indicators.quote[0].close;
	const highValues = data.chart.result[0].indicators.quote[0].high;
	const lowValues = data.chart.result[0].indicators.quote[0].low;

	return closeValues.map((val, index) => ({
		name: new Date(data.chart.result[0].timestamp[index] * 1000).toLocaleDateString('en-US', { month: 'short' }),
		uv: highValues[index], // Use the high value for the upper area (uv)
		lv: lowValues[index], // Use the low value for the lower area (lv)
	}));
};

const StackedAreachart = ({ size, data, changeValue }) => {
	const liveData = transformDataForChart(data);
	const cardinal = curveCardinal.tension(0.2);

	return (
		<AreaChart
			width={size === 'small' ? 550 : size === 'medium' ? 500 : 580}
			height={size === 'small' ? 200 : size === 'medium' ? 260 : 320}
			data={liveData}
			style={{ fontSize: '0.7rem', fontWeight: '500', fontFamily: 'Inter' }}
			margin={{
				top: 10,
				right: 30,
				left: 0,
				bottom: 0,
			}}
		>
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />

			<defs>
				<linearGradient id="gradientFill" gradientTransform="rotate(180)">
					{positiveGradientColors.map((color) => (
						<stop key={color.offset} offset={color.offset} stopColor={color.color} />
					))}
				</linearGradient>
				<linearGradient id="gradientFill2" gradientTransform="rotate(180)">
					{negativeGradientColors.map((color) => (
						<stop key={color.offset} offset={color.offset} stopColor={color.color} />
					))}
				</linearGradient>
			</defs>

			<Area
				type={cardinal}
				dataKey="uv"
				stackId="1"
				stroke={false}
				fill={Math.sign(parseFloat(changeValue)) === 1 ? 'url(#gradientFill)' : 'url(#gradientFill2)'}
				fillOpacity={0.4}
			/>
			<Area
				type={cardinal}
				dataKey="lv"
				stackId="1"
				stroke={false}
				fill={Math.sign(parseFloat(changeValue)) === 1 ? '#60ffba' : '#9A2A2A'}
				fillOpacity={0.4}
			/>
		</AreaChart>
	);
};

export default StackedAreachart;

/*
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
	{
		name: 'Jan',
		lv: 100,
		uv: 140,
	},
	{
		name: 'Feb',
		lv: 150,
		uv: 80,
	},
	{
		name: 'Mar',
		lv: 170,
		uv: 150,
	},
	{
		name: 'Apr',
		lv: 180,
		uv: 240,
	},
	{
		name: 'May',
		lv: 160,
		uv: 250,
	},
	{
		name: 'Jun',
		lv: 150,
		uv: 230,
	},
	{
		name: 'Jul',
		lv: 100,
		uv: 200,
	},
	{
		name: 'Aug',
		lv: 120,
		uv: 90,
	},
	{
		name: 'Sep',
		lv: 170,
		uv: 220,
	},
	{
		name: 'Oct',
		lv: 180,
		uv: 240,
	},
	{
		name: 'Nov',
		lv: 160,
		uv: 250,
	},
	{
		name: 'Dec',
		lv: 200,
		uv: 245,
	},
];

const gradientColors = [
	{ offset: 0, color: 'rgba(20, 198, 122, 0.7)' },
	{ offset: 0.7115, color: 'rgba(20, 198, 122, 0)' },
];

const gradientColorsSec = [
	{ offset: 0, color: 'rgba(255, 84, 84, 0.9)' },
	{ offset: 1, color: 'rgba(255, 84, 84, 0)' },
];

const StackedAreachart = ({ size }) => {
	return (
		<AreaChart
			width={size === 'small' ? 450 : size === 'medium' ? 500 : 560}
			height={size === 'small' ? 200 : size === 'medium' ? 260 : 320}
			data={data}
			margin={{
				top: 10,
				right: 30,
				left: 0,
				bottom: 0,
			}}
		>
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
			<defs>
				<linearGradient id="gradientFill" gradientTransform="rotate(180)">
					{gradientColors.map((color) => (
						<stop key={color.offset} offset={color.offset} stopColor={color.color} />
					))}
				</linearGradient>
				<linearGradient id="gradientFillSec" gradientTransform="rotate(180)">
					{gradientColorsSec.map((color) => (
						<stop key={color.offset} offset={color.offset} stopColor={color.color} />
					))}
				</linearGradient>
			</defs>

			<Area type="monotone" dataKey="lv" stackId="1" stroke={false} fill="url(#gradientFillSec)" fillOpacity={0.4} />
			<Area type="monotone" dataKey="uv" stackId="1" stroke={false} fill="url(#gradientFill)" fillOpacity={0.4} />
		</AreaChart>
	);
};

export default StackedAreachart;
*/
