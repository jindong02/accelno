import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { curveCardinal } from 'd3-shape';

const positiveGradientColors = [
	{ offset: '0%', color: 'rgba(20, 198, 122, 0.8)' },
	{ offset: '50%', color: 'rgba(20, 198, 122, 0.216)' },
	{ offset: '100%', color: 'rgba(20, 198, 122, 0)' },
];

const negativeGradientColors = [
	{ offset: '0%', color: 'rgba(255, 0, 0, 0.8)' },
	{ offset: '50%', color: 'rgba(255, 0, 0, 0.216)' },
	{ offset: '100%', color: 'rgba(255, 0, 0, 0)' },
];

const transformDataForChart = (data) => {
	if (!data || !data.chart || !data.chart.result || data.chart.result.length === 0) {
		return [];
	}

	const { dataGranularity, range } = data.chart.result[0].meta;

	// Define a function to format the timestamp based on range and interval
	const formatTimestamp = (timestamp) => {
		if (range === '1d') {
			if (dataGranularity === '5m') {
				const date = new Date(timestamp * 1000);
				return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
			} else {
				// You can format the timestamp differently for other interval options
				// For now, let's use the timestamp as is for other intervals
				return timestamp;
			}
		} else if (range === '1mo') {
			if (dataGranularity === '1d') {
				const date = new Date(timestamp * 1000);
				return `${date.getDate()}-${date.getMonth() + 1}`;
			}
		} else if (range === '5y' && dataGranularity === '1mo') {
			const date = new Date(timestamp * 1000);
			return `${date.getDate()}-${date.getMonth() + 1} ${date.getFullYear()}`;
		} else {
			// Default to showing the month for other ranges
			return new Date(timestamp * 1000).toLocaleDateString('en-US', { month: 'short' });
		}
	};

	return data.chart.result[0].indicators.quote[0].close.map((val, index) => ({
		name: formatTimestamp(data.chart.result[0].timestamp[index]),
		val: val,
	}));
};
const RangeChart = ({ size, stock, data, changeType }) => {
	const liveData = transformDataForChart(data);
	const cardinal = curveCardinal.tension(0.2);

	return (
		<AreaChart
			width={size === 'small' ? 330 : size === 'medium' ? 390 : 650}
			height={size === 'small' ? 160 : size === 'medium' ? 200 : 240}
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
			<YAxis orientation="left" />
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
				dataKey="val"
				stroke={Math.sign(changeType) === 1 ? '#14C67A' : '#BB231B'}
				fill={Math.sign(changeType) === 1 ? 'url(#gradientFill)' : 'url(#gradientFill2)'}
				fillOpacity={0.2}
			/>
		</AreaChart>
	);
};

export default RangeChart;
