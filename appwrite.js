import {Client, Account, Databases, Query} from 'appwrite';
import {API_URL, PROJECT_ID} from '@env';

const client = new Client();

client
  .setEndpoint(API_URL) // Your Appwrite endpoint from .env
  .setProject(PROJECT_ID); // Your project ID from .env

const account = new Account(client);
const databases = new Databases(client);

export {account, databases, Query};
