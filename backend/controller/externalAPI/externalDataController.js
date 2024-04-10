const asyncHandler = require('express-async-handler');
const axios = require('axios');

// This is the controller for the Single Stock Data component and returns all required data based on stock symbol

const getSingleStockDataController = asyncHandler(async (req, res) => {
	const { stock } = req.params;
	const options = {
		method: 'GET',
		url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis',
		params: {
			symbol: stock,
			region: 'US',
		},
		headers: {
			'X-RapidAPI-Key': process.env.YAHOO_FINANCE_API_KEY,
			'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
		},
	};
	try {
		const response = await axios.request(options);
		res.status(200).json(response.data.price);
	} catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	}
});

// This is the controller for the Stock Chart component and Stacked Chart Component and returns all required chart data based on stock symbol

const getSingleStockChartController = asyncHandler(async (req, res) => {
	const { stock } = req.params;

	const options = {
		method: 'GET',
		url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart',
		params: {
			interval: '1wk',
			symbol: stock,
			range: '1y',
			region: 'US',
			includePrePost: 'false',
			useYfid: 'true',
			includeAdjustedClose: 'true',
			events: 'capitalGain,div,split',
		},
		headers: {
			'X-RapidAPI-Key': process.env.YAHOO_FINANCE_API_KEY,
			'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
		},
	};

	try {
		const response = await axios.request(options);
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	}
});

// This is the controller for the Market Chart component

const getMarketChartController = asyncHandler(async (req, res) => {
	const options = {
		method: 'GET',
		url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-summary',
		params: { region: 'US' },
		headers: {
			'X-RapidAPI-Key': process.env.YAHOO_FINANCE_API_KEY,
			'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
		},
	};

	try {
		const response = await axios.request(options);
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	}
});

// This controller is for the Market Movers component and returns the top 6 gainers, losers, and active stocks based on the type parameter
// type = gainers, losers, active

const getMarketMoversController = asyncHandler(async (req, res) => {
	const { type } = req.params;

	const options = {
		method: 'GET',
		url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-movers',
		params: {
			region: 'US',
			lang: 'en-US',
			start: '0',
			count: '5',
		},
		headers: {
			'X-RapidAPI-Key': process.env.YAHOO_FINANCE_API_KEY,
			'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
		},
	};

	try {
		const response = await axios.request(options);
		if (type === 'gainers') {
			const gainersData = response.data.finance.result[0].quotes;
			const gainersStocks = gainersData.map((stock) => stock.symbol);
			const gainersString = gainersStocks.join(',');

			// get price and % change for each stock in gainersData
			// we will pass the data to another endpoint and get back details of each stock in gainersData

			const gainersOptions = {
				method: 'GET',
				url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes',
				params: {
					region: 'US',
					symbols: gainersString,
				},
				headers: {
					'X-RapidAPI-Key': process.env.YAHOO_FINANCE_API_KEY,
					'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
				},
			};

			const gainersResponse = await axios.request(gainersOptions);
			const updatedGainersData = [
				...gainersResponse.data.quoteResponse.result.map((stock) => ({
					symbol: stock.symbol,
					price: stock.regularMarketPrice,
					change: stock.regularMarketChangePercent,
					shortName: stock.shortName,
				})),
			];
			res.status(200).json(updatedGainersData);
		} else if (type === 'losers') {
			const losersData = response.data.finance.result[1].quotes;
			const losersStocks = losersData.map((stock) => stock.symbol);
			const losersString = losersStocks.join(',');

			// get price and % change for each stock in gainersData
			// we will pass the data to another endpoint and get back details of each stock in gainersData

			const losersOptions = {
				method: 'GET',
				url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes',
				params: {
					region: 'US',
					symbols: losersString,
				},
				headers: {
					'X-RapidAPI-Key': process.env.YAHOO_FINANCE_API_KEY,
					'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
				},
			};

			const losersResponse = await axios.request(losersOptions);
			const updatedlosersData = [
				...losersResponse.data.quoteResponse.result.map((stock) => ({
					symbol: stock.symbol,
					price: stock.regularMarketPrice,
					change: stock.regularMarketChangePercent,
					shortName: stock.shortName,
				})),
			];
			res.status(200).json(updatedlosersData);
		} else if (type === 'active') {
			const activeData = response.data.finance.result[2].quotes;
			res.status(200).json(activeData);
		}
	} catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	}
});

const getMostTrendingStocksController = asyncHandler(async (req, res) => {
	const options = {
		method: 'GET',
		url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-trending-tickers',
		params: { region: 'US' },
		headers: {
			'X-RapidAPI-Key': process.env.YAHOO_FINANCE_API_KEY,
			'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
		},
	};

	try {
		const response = await axios.request(options);
		const updatedResponse = response.data.finance.result[0].quotes
			.filter((stock, index) => index < 5)
			.map((stock) => ({
				shortName: stock.shortName,
				score: Math.round(stock.trendingScore),
			}));
		res.status(200).json(updatedResponse);
	} catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	}
});

const getFinancialsController = asyncHandler(async (req, res) => {
	const { stocks } = req.params;
	const stocksArr = stocks.split(',');

	try {
		const financialsPromises = stocksArr.map(async (stock) => {
			const options = {
				method: 'GET',
				url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis',
				params: {
					symbol: stock,
					region: 'US',
				},
				headers: {
					'X-RapidAPI-Key': process.env.YAHOO_FINANCE_API_KEY,
					'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
				},
			};

			const response = await axios.request(options);
			const shortName = response.data.price.shortName;
			const marketCap = response.data.price.marketCap.fmt;
			const price = response.data.price.regularMarketPrice.raw;
			const peRatio = response.data.indexTrend.peRatio.raw;

			// Get price to book ratio (p/b ratio) for each stock from another endpoint

			const optionsTwo = {
				method: 'GET',
				url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v4/get-statistics',
				params: {
					symbol: stock,
					region: 'US',
					lang: 'en-US',
				},
				headers: {
					'X-RapidAPI-Key': process.env.YAHOO_FINANCE_API_KEY,
					'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
				},
			};

			const responseTwo = await axios.request(optionsTwo);
			const pbRatio = responseTwo.data.quoteSummary.result[0].defaultKeyStatistics.priceToBook.raw;

			// Return financials for each stock
			return {
				shortName,
				marketCap,
				price,
				peRatio,
				pbRatio,
			};
		});

		// Wait for all financials promises to resolve
		const financials = await Promise.all(financialsPromises);
		res.status(200).json(financials);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred' });
	}
});

const getFiftyTwoWeeksController = asyncHandler(async (req, res) => {
	const { stocks } = req.params;
	const stocksArr = stocks.split(',');

	try {
		const fiftyTwoWeeksPromises = stocksArr.map(async (stock) => {
			const options = {
				method: 'GET',
				url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis',
				params: {
					symbol: stock,
					region: 'US',
				},
				headers: {
					'X-RapidAPI-Key': process.env.YAHOO_FINANCE_API_KEY,
					'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
				},
			};

			const response = await axios.request(options);
			const shortName = response.data.price.shortName;
			const fiftyTwoWeekHigh = response.data.summaryDetail.fiftyTwoWeekHigh.raw;
			const fiftyTwoWeekLow = response.data.summaryDetail.fiftyTwoWeekLow.raw;

			// Return 52 week high and low for each stock
			return {
				shortName,
				fiftyTwoWeekHigh,
				fiftyTwoWeekLow,
			};
		});

		// Wait for all 52 week high and low promises to resolve
		const fiftyTwoWeeks = await Promise.all(fiftyTwoWeeksPromises);
		res.status(200).json(fiftyTwoWeeks);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred' });
	}
});

const getStockDetailController = asyncHandler(async (req, res) => {
	const { stock } = req.params;
	const options = {
		method: 'GET',
		url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis',
		params: {
			symbol: stock,
			region: 'US',
		},
		headers: {
			'X-RapidAPI-Key': process.env.YAHOO_FINANCE_API_KEY,
			'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
		},
	};
	try {
		const response = await axios.request(options);
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	}
});

const getChartbyRangeController = asyncHandler(async (req, res) => {
	const { data } = req.params;
	const stock = data.split(',')[0];
	const range = data.split(',')[1];
	console.log(stock, range);
	const options = {
		method: 'GET',
		url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart',
		params: {
			interval: `${
				range === '1d'
					? '5m'
					: range === '5d'
					? '1d'
					: range === '1mo'
					? '1d'
					: range === '6mo'
					? '1wk'
					: range === '1y'
					? '1mo'
					: range === '5y'
					? '1mo'
					: '1wk'
			}`,
			symbol: stock,
			range: range,
			region: 'US',
			includePrePost: 'false',
			useYfid: 'true',
			includeAdjustedClose: 'true',
			events: 'capitalGain,div,split',
		},
		headers: {
			'X-RapidAPI-Key': process.env.YAHOO_FINANCE_API_KEY,
			'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
		},
	};

	try {
		const response = await axios.request(options);
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	}
});

const getHeatmapController = asyncHandler(async (req, res) => {
	const options = {
		method: 'GET',
		url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-movers',
		params: {
			region: 'US',
			lang: 'en-US',
			start: '0',
			count: '20',
		},
		headers: {
			'X-RapidAPI-Key': process.env.YAHOO_FINANCE_API_KEY,
			'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
		},
	};

	try {
		const response = await axios.request(options);
		const activeStocksData = response.data.finance.result[2].quotes;
		const activeStocks = activeStocksData.map((stock) => stock.symbol);
		const activeStocksString = activeStocks.join(',');

		// get symbol, percent change and market Cap for each stock in active stocks
		// we will pass the data to another endpoint and get back details of each stock in gainersData

		const activeStocksOptions = {
			method: 'GET',
			url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes',
			params: {
				region: 'US',
				symbols: activeStocksString,
			},
			headers: {
				'X-RapidAPI-Key': process.env.YAHOO_FINANCE_API_KEY,
				'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
			},
		};

		const heatmapResponse = await axios.request(activeStocksOptions);
		const heatmapData = [
			...heatmapResponse.data.quoteResponse.result.map((stock) => ({
				symbol: stock.symbol,
				price: stock.regularMarketPrice,
				change: stock.regularMarketChangePercent,
				shortName: stock.shortName,
				marketCap: stock.marketCap,
			})),
		];
		res.status(200).json(heatmapData);
	} catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	}
});

module.exports = {
	getSingleStockDataController,
	getSingleStockChartController,
	getMarketChartController,
	getMarketMoversController,
	getMostTrendingStocksController,
	getFinancialsController,
	getFiftyTwoWeeksController,
	getStockDetailController,
	getChartbyRangeController,
	getHeatmapController,
};
