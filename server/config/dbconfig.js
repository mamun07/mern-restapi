import mongoose from "mongoose";

const dbSetup = async () => {
  try {
    const DBURL = process.env.DB_URL;
    mongoose.set("strictQuery", false);
    mongoose.connect(DBURL, {
      useNewUrlParser: true,
      ssl: true,
      sslValidate: false,
    });
  } catch (err) {
    console.log("Databse Connection Error : " + err.message);
  }
};

export default dbSetup;
