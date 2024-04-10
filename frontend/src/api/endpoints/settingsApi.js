import { api } from '../api';

export const settingsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getUserProfile: builder.query({
			query: () => ({
				url: `/userprofile`,
				method: 'GET',
				credentials: 'include',
			}),
		}),
		addUserProfile: builder.mutation({
			query: (data) => ({
				url: `/userprofile`,
				method: 'POST',
				body: data,
				credentials: 'include',
			}),
		}),
	}),
});

export const { useGetUserProfileQuery, useAddUserProfileMutation } = settingsApi;
