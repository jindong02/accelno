import { api } from '../api';

export const widgetDataApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getSingleStockData: builder.query({
			query: (stock) => ({
				url: `/singlestockdata/${stock}`,
				method: 'GET',
				credentials: 'include',
			}),
		}),
		getChart: builder.query({
			query: (stock) => ({
				url: `/singlestockchart/${stock}`,
				method: 'GET',
				credentials: 'include',
			}),
		}),
		getMarketChart: builder.query({
			query: () => ({
				url: `/marketchart`,
				method: 'GET',
				credentials: 'include',
			}),
		}),
		getMovers: builder.query({
			query: (type) => ({
				url: `marketmovers/${type}`,
				method: 'GET',
				credentials: 'include',
			}),
		}),
		getTrendingStocks: builder.query({
			query: () => ({
				url: `/trendingstocks`,
				method: 'GET',
				credentials: 'include',
			}),
		}),
		getFinancials: builder.query({
			query: (stocks) => ({
				url: `/financials/${stocks}`,
				method: 'GET',
				credentials: 'include',
			}),
		}),
		getFiftyTwoWeeks: builder.query({
			query: (stocks) => ({
				url: `/52weekhighlow/${stocks}`,
				method: 'GET',
				credentials: 'include',
			}),
		}),
		getStockDetail: builder.query({
			query: (stock) => ({
				url: `/stockdetail/${stock}`,
				method: 'GET',
				credentials: 'include',
			}),
		}),
		getChartbyRange: builder.query({
			query: (data) => ({
				url: `/stockchartbyrange/${data}`,
				method: 'GET',
				credentials: 'include',
			}),
		}),
		getHeatmap: builder.query({
			query: () => ({
				url: `/heatmap`,
				method: 'GET',
				credentials: 'include',
			}),
		}),
	}),
});

export const {
	useGetSingleStockDataQuery,
	useGetChartQuery,
	useGetMarketChartQuery,
	useGetMoversQuery,
	useGetTrendingStocksQuery,
	useGetFinancialsQuery,
	useGetFiftyTwoWeeksQuery,
	useGetStockDetailQuery,
	useGetChartbyRangeQuery,
	useGetHeatmapQuery,
} = widgetDataApi;
