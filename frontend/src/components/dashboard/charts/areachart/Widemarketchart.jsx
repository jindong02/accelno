import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { curveCardinal } from 'd3-shape';

const gradientColors = [
	{ offset: '0%', color: 'rgba(20, 198, 122, 0.8)' },
	{ offset: '50%', color: 'rgba(20, 198, 122, 0.216)' },
	{ offset: '100%', color: 'rgba(20, 198, 122, 0)' },
];

const Widemarketchart = ({ data }) => {
	const cardinal = curveCardinal.tension(0.2);

	// Extract the close data from the API response
	const closeData = data?.spark?.close || [];

	// Transform the close data into the desired format
	const chartData = closeData.map((val, index) => ({
		name: new Date(data?.spark?.timestamp[index] * 1000).toLocaleTimeString(),
		val: val,
	}));

	return (
		<div>
			<AreaChart
				width={560}
				height={210}
				data={chartData}
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
						{gradientColors.map((color) => (
							<stop key={color.offset} offset={color.offset} stopColor={color.color} />
						))}
					</linearGradient>
				</defs>

				<Area type={cardinal} dataKey="val" stroke="#14C67A" fill="url(#gradientFill)" fillOpacity={0.2} />
			</AreaChart>
		</div>
	);
};

export default Widemarketchart;

/*

import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { curveCardinal } from 'd3-shape';

const data = [
	{
		name: 1,
		val: 220,
	},
	{
		name: 5,
		val: 420,
	},
	{
		name: 10,
		val: 360,
	},
	{
		name: 15,
		val: 520,
	},
	{
		name: 20,
		val: 700,
	},
	{
		name: 25,
		val: 320,
	},
];

const gradientColors = [
	{ offset: '0%', color: 'rgba(20, 198, 122, 0.8)' },
	{ offset: '50%', color: 'rgba(20, 198, 122, 0.216)' },
	{ offset: '100%', color: 'rgba(20, 198, 122, 0)' },
];

const Widemarketchart = ({ size }) => {
	const cardinal = curveCardinal.tension(0.2);

	return (
		<AreaChart
			width={size === 'small' ? 500 : size === 'medium' ? 600 : 700}
			height={size === 'small' ? 180 : size === 'medium' ? 210 : 240}
			data={data}
			style={{ fontSize: '0.7rem', fontWeight: '500', FontFamily: 'Inter' }}
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
					{gradientColors.map((color) => (
						<stop key={color.offset} offset={color.offset} stopColor={color.color} />
					))}
				</linearGradient>
			</defs>

			<Area type={cardinal} dataKey="val" stroke="#14C67A" fill="url(#gradientFill)" fillOpacity={0.2} />
		</AreaChart>
	);
};

export default Widemarketchart;

*/
