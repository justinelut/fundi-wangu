import { Client, Account, Databases, ID } from 'react-native-appwrite';

const client = new Client();

client
  .setEndpoint('https://appwrite.coolify.pixeldesign.site/v1')
  .setProject('675350fc0018886bc04d');

export const account = new Account(client);
export const databases = new Databases(client); // Add database instance

export default client;
