import React, { useState } from 'react';
import Heatmap from 'react-heatmap-grid';

const xLabels = new Array(5).fill(0).map((_, i) => (i + 1) / 10); // Values from 0.1 to 0.5 (5 columns)
const yLabels = ['AAPL', 'GOOG', 'MSFT', 'AMZN', 'FB', 'TSLA', 'NFLX']; // 7 stock symbols

// Create fake data for the heatmap (increase or decrease values for each stock symbol)
const data = yLabels.map((stock) => {
	return xLabels.map((value) => {
		// Generate a random increase or decrease value between -0.3 to 0.3 (to get range 0.1 to 0.5)
		const increaseDecrease = Math.random() * 0.3 - 0.15;
		return {
			value: increaseDecrease.toFixed(2), // Limit decimal places to two digits
			symbol: stock,
		};
	});
});

// Define colors for each company
const companyColors = {
	AAPL: '#FF7875',
	GOOG: '#FF6A00',
	MSFT: '#D9D9D9',
	AMZN: '#40A9FF',
	FB: '#008000',
	TSLA: '#0000FF',
	NFLX: '#800080',
};

// Calculate step size for color gradients based on the range -0.15 to 0.15 (random range for increase/decrease)
const step = 0.3 / (Object.keys(companyColors).length - 1);

// Get color for a given value based on increase or decrease range for each company
const getColor = (symbol, value) => {
	const index = Math.min(Math.floor((parseFloat(value) + 0.15) / step), Object.keys(companyColors).length - 1);
	return companyColors[symbol];
};

const HeatmapComp = ({ size }) => (
	<div style={{ width: `${size === 'small' ? '300px' : size === 'medium' ? '380px' : '500px'}`, padding: '5px', fontFamily: 'poppins' }}>
		<Heatmap
			xLabels={xLabels}
			yLabels={yLabels}
			yLabelWidth={60}
			xLabelsLocation={'bottom'}
			data={data}
			rectangles
			cellStyle={(background, value) => ({
				background: getColor(value.symbol, value.value),
				fontSize: '11px',
				fontWeight: 'bold',
				color: 'white',
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				height: '60px',
			})}
			cellRender={(value) => (
				<>
					<div>{value.symbol}</div>
					<div>{value.value}</div>
				</>
			)}
		/>
	</div>
);

export default HeatmapComp;
