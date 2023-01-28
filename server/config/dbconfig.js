import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const dbSetup = async () => {
  const mongod = await MongoMemoryServer.create();
  const getUri = mongod.getUri();
  mongoose.set("strictQuery", true);
  const db = await mongoose.connect(getUri);
  return db;
};

export default dbSetup;
