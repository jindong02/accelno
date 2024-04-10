import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:3005/api/v1',
	credentials: 'include',
});

export const api = createApi({
	baseQuery: baseQuery,
	endpoints: (builder) => ({}),
});
