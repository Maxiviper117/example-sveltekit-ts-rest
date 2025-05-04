// src/lib/api-contract/index.ts
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const contract = c.router({
	getUsers: {
		method: 'GET',
		path: '/api/users',
		query: z.object({
			limit: z.coerce.number().optional(),
			offset: z.coerce.number().optional()
		}),
		responses: {
			200: z.array(
				z.object({
					id: z.string(),
					name: z.string(),
					email: z.string().email()
				})
			)
		}
	},
	getUserById: {
		method: 'GET',
		path: '/api/users/:id',
		pathParams: z.object({
			id: z.string()
		}),
		responses: {
			200: z.object({
				id: z.string(),
				name: z.string(),
				email: z.string().email()
			}),
			404: z.object({
				message: z.string()
			})
		}
	},
	createUser: {
		method: 'POST',
		path: '/api/users',
		body: z.object({
			name: z.string(),
			email: z.string().email()
		}),
		responses: {
			201: z.object({
				id: z.string(),
				name: z.string(),
				email: z.string().email()
			}),
			400: z.object({
				message: z.string()
			})
		}
	}
});

export type ApiContract = typeof contract;
