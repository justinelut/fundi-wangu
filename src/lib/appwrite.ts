import { Client, Account, Databases, ID } from 'react-native-appwrite';

const client = new Client();

client
  .setEndpoint('https://appwrite.coolify.pixeldesign.site/v1') // API Endpoint
  .setProject('67385b5e00273a1fb6d9'); // Project ID

export const account = new Account(client);
export const databases = new Databases(client); // Add database instance

export default client;
