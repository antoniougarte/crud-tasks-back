import { MongoClient, ServerApiVersion } from 'mongodb';
import { config } from "dotenv"
config();

const uri = process.env.MONGODB_CONNECT_URI || '';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

export {
  client,
  connectToDatabase,
}