// src/lib/api-contract/index.ts
import { initContract } from '@ts-rest/core';
import { usersContract } from './users';
import { productsContract } from './products';

const c = initContract();

export const contract = c.router({
	users: usersContract, // Mount the usersContract under the '/users' path segment
	products: productsContract // Mount the productsContract under the '/products' path segment
});

export type ApiContract = typeof contract;
