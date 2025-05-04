// src/routes/api/users/[id]/+server.ts
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { contract } from '$lib/contract';
import { z } from 'zod';

// Assume you have some user data source
const users = [
	{ id: '1', name: 'Alice', email: 'alice@example.com' },
	{ id: '2', name: 'Bob', email: 'bob@example.com' }
];

export const GET: RequestHandler = async ({ params }) => {
	try {
		// Validate path parameters using the contract's types/schemas
		const { id } = contract.getUserById.pathParams.parse(params);

		// Find the user by ID
		const user = users.find((u) => u.id === id);

		if (user) {
			// Return a JSON response conforming to the contract's 200 response type
			return json(user, { status: 200 });
		} else {
			// Return a 404 response conforming to the contract's 404 response type
			return error(404, { message: 'User not found' });
		}
	} catch (e) {
		if (e instanceof z.ZodError) {
			// Handle validation errors (though less likely for path params in this simple case)
			return error(400, { message: 'Invalid user ID' });
		}
		// Handle other errors
		return error(500, { message: 'Internal server error' });
	}
};
