import {MongoClient} from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let mongoClient;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

export async function connectToDatabase() {
  try {
    if (mongoClient) {
      return {mongoClient};
    }
    mongoClient = await new MongoClient(uri, options).connect();
    console.log('connected');
    return {mongoClient};
  } catch (err) {
    console.log(err);
  }
}

export async function addToDatabase(collectionName, document) {
  try {
    if (!mongoClient) {
      await connectToDatabase();
    }
    const db = mongoClient.db('yourDatabaseName'); // Zastąp 'yourDatabaseName' nazwą Twojej bazy danych
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(document);
    console.log('Document inserted:', result);
    return result;
  } catch (err) {
    console.log(err);
  }
}
