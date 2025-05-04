// src/hooks.server.ts

import { apiClient } from '$lib/api';

export async function handle({ event, resolve }) {
	event.locals.apiClient = apiClient;
	const response = await resolve(event);
	return response;
}
