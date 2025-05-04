import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { apiClient } = locals;

	const user = await apiClient.users.getUsers();

    console.log('user', user);
	return { user: user.body };
}) satisfies PageServerLoad;
