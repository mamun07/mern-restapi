import mongoose from "mongoose";

export default async function dbSetup() {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.DB_URL);
}
