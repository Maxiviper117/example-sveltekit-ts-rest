import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const { apiClient } = locals;

    // Call the getUsers endpoint
    const response = await apiClient.users.getUsers({
        query: {
            limit: 10,    // optional
            offset: 0     // optional
        }
    });

    // response.body contains the data if status is 200
    return {
        users: response.status === 200 ? response.body : []
    };
}) satisfies PageServerLoad;