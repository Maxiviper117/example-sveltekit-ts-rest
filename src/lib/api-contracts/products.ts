// src/lib/api-contract/products.ts
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const productsContract = c.router({
	getProducts: {
		method: 'GET',
		path: '/api/products', // Note: path is relative within this router
		query: z.object({
			search: z.string().optional()
		}),
		responses: {
			200: z.array(
				z.object({
					id: z.string(),
					name: z.string(),
					price: z.number()
				})
			)
		}
	},
	getProductById: {
		method: 'GET',
		path: '/api/products/:id', // Note: path is relative within this router
		pathParams: z.object({
			id: z.string()
		}),
		responses: {
			200: z.object({
				id: z.string(),
				name: z.string(),
				price: z.number()
			}),
			404: z.object({
				message: z.string()
			})
		}
	}
});

export type ProductsContract = typeof productsContract;
