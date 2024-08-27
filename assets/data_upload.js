import {Client, Databases} from 'appwrite';
import fs from 'fs';

// Initialize the Appwrite client
const client = new Client();

const VITE_MY_APPWRITE_HOTEL_PROJECT_URL = 'https://cloud.appwrite.io/v1';
const VITE_MY_APPWRITE_HOTEL_PROJECT_ID = '66b258b500353050426f';
const VITE_MY_APPWRITE_PROJECT_DATABASE_ID = '66b259c60016ac264278';
const VITE_MY_APPWRITE_PROJECT_USER_ID = '66b259940026935146ec';
const VITE_MY_APPWRITE_PROJECT_DATABSE_COLLECTION_ID = '66b2e5f30005a3f43af5';
const VITE_MY_APPWRITE_HOTEL_API_KEY =
  '44e7ffe8506d3bbe4f81438b5cf6197bd16aa0096766ba946d4b0743d31139fa6a5fed2f384d9be6d5d8452900f31ad0697d0bc0dbdc4b271015fe0e784ff3e5ae12ee0d3d63cdb9a201cab48215f3f8052f597d60278a109f176adea74319e517ecb4af336185d0868e45997b812934208ec308eaa770393fa367417c0c8a7c';

client
  .setEndpoint(VITE_MY_APPWRITE_HOTEL_PROJECT_URL) // Your Appwrite Endpoint
  .setProject(VITE_MY_APPWRITE_HOTEL_PROJECT_ID); // Your Appwrite Project ID
// Your API Key

const databases = new Databases(client);

client.headers['X-Appwrite-Key'] = VITE_MY_APPWRITE_HOTEL_API_KEY;

// Read JSON file
const data = JSON.parse(fs.readFileSync('./hoteldata.json', 'utf8'));

// Loop through data and insert into the collection
data.forEach(async item => {
  try {
    const response = await databases.createDocument(
      VITE_MY_APPWRITE_PROJECT_DATABASE_ID,
      VITE_MY_APPWRITE_PROJECT_DATABSE_COLLECTION_ID,
      'unique()', // or specify an ID
      item,
    );
    console.log('Document created successfully', response);
  } catch (error) {
    console.error('Error creating document:', error);
  }
});
