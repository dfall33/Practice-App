import { apiSlice } from "./apiSlice";

const users_url = '/api/users';

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${users_url}/login`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${users_url}/logout`,
                method: 'POST'
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${users_url}/register`,
                method: 'POST',
                body: data
            })
        
        }),
        profile: builder.query({
            query: (username) => ({
                url: `${users_url}/profile/${username}`,
                method: 'GET'
            })
        })
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileQuery
} = usersApiSlice