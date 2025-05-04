import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { apiClient } = locals;

	const user = await apiClient.getUserById({
		params: {
			id: '1'
		}
	});

    console.log('user', user.body);
	return { user: user.body };
}) satisfies PageServerLoad;
