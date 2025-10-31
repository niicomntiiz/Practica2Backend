import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let client: MongoClient;
let dB: Db;
const dbName = "Practica2";

export const connectMongoDB = async (): Promise<void> => {
  try {
    const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.CLUSTER}.mwb9ctv.mongodb.net/?appName=${process.env.CLUSTER_NAME}`

    client = new MongoClient(mongoUrl);
    await client.connect();
    dB = client.db(dbName);
    console.log("Conectado a mongo db en la BBDD: " + dbName);
  } catch (error) {
    console.log("Error mongo: ", error);
  }
};

export const getDb = ():Db => dB;