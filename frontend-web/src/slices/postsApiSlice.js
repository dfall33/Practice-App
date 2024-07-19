import { apiSlice } from "./apiSlice";

const posts_url = '/api/posts';

const postsApiSlice = apiSlice.injectEndpoints({

    endpoints: function(builder) {
        return {
            createPost: builder.mutation({
                query: (data) => {
                    return {
                        url: `${posts_url}`,
                        method: 'POST',
                        body: data
                    }
                }
            }),

            deletePost: builder.mutation({
                query: (id) => {
                    return {
                        url: `${posts_url}/${id}`,
                        method: 'DELETE',
                    }
                }
            }),

            getUserPosts: builder.query({
                query: (username) => {
                    return {
                        url: `${posts_url}/users/${username}`,
                        method: 'GET'
                    }
                }
            }),

            getIndividualPost: builder.query({
                query: (id) => {
                    return {
                        url: `${posts_url}/${id}`,
                        method: 'GET'
                    }
                }
            })
        }
    }

});

export const {
    useCreatePostMutation,
    useDeletePostMutation,
    useGetUserPostsQuery,
    useGetIndividualPostQuery,
} = postsApiSlice;
