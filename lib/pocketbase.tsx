// lib/pocketbase.js
import PocketBase from 'pocketbase';

// Initialize the PocketBase client with your PocketBase URL
export const pb = new PocketBase(process.env.POCKETBASE_API_URL);
