import { Client, Account, Databases, Query } from 'react-native-appwrite';

const client = new Client();

client
  .setEndpoint('https://appwrite.coolify.pixeldesign.site/v1')
  .setProject('675350fc0018886bc04d');

export const account = new Account(client);
export const databases = new Databases(client); // Add database instance

export default client;

const databaseid = '675351130030b8e7344f';
const categoriesid = '676669f2003842aa9b65';

export const getCategories = async ({ limit }: { limit: number }) => {
  try {
    const response = await databases.listDocuments(
      databaseid, // Replace with your actual database ID
      categoriesid, // Replace with your collection ID that stores categories
      [
        Query.limit(limit), // Apply limit to the query
      ]
    );

    // Assuming each document in the collection represents a category
    return response.documents;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
