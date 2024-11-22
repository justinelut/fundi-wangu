import { Client, Account, ID, Models } from 'react-native-appwrite';

const client = new Client();
client
  .setEndpoint('https://appwrite.coolify.pixeldesign.site/v1')
  .setProject('67385b5e00273a1fb6d9')
  .setPlatform('com.fundiwangu.app')

  export const account = new Account(client);
  export default client;