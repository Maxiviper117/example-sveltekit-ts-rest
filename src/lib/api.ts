// src/lib/api.ts
import { initClient } from '@ts-rest/core';
import { contract } from '$lib/api-contracts';

export const apiClient = initClient(contract, {
	baseUrl: 'http://localhost:5173', // Replace with your SvelteKit app's base URL
	validateResponse: true // Optional: validate responses against the contract
});

