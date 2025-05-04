// src/routes/api/users/+server.ts
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { contract } from '$lib/api-contracts';
import { z } from 'zod';

// Assume you have some user data source
const users = [
	{ id: '1', name: 'Alice', email: 'alice@example.com' },
	{ id: '2', name: 'Bob', email: 'bob@example.com' }
];

export const GET: RequestHandler = async ({ url }) => {
	try {
		// Validate query parameters using the contract's types/schemas
		const queryParams = contract.users.getUsers.query.parse(Object.fromEntries(url.searchParams));

		// Implement your logic to fetch users based on limit and offset
		const { limit, offset } = queryParams;
		const filteredUsers = users.slice(offset ?? 0, limit ? (offset ?? 0) + limit : users.length);
		

		// Return a JSON response conforming to the contract's 200 response type
		return json(filteredUsers, { status: 200 });
	} catch (e) {
		if (e instanceof z.ZodError) {
			// Handle validation errors
			return error(400, { message: 'Invalid query parameters' });
		}
		// Handle other errors
		return error(500, { message: 'Internal server error' });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		// Parse and validate the request body using the contract's types/schemas
		const requestBody = contract.users.createUser.body.parse(await request.json());

		// Implement your logic to create a new user
		const newUser = { id: Date.now().toString(), ...requestBody };
		users.push(newUser); // In a real app, you'd interact with a database

		// Return a JSON response conforming to the contract's 201 response type
		return json(newUser, { status: 201 });
	} catch (e) {
		if (e instanceof z.ZodError) {
			// Handle validation errors
			return error(400, { message: 'Invalid request body' });
		}
		// Handle other errors
		return error(500, { message: 'Internal server error' });
	}
};
