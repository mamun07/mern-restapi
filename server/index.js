import express from "express";
import dotend from "dotenv";
import cors from "cors";
import morgan from "morgan";

// Importing support file
import dbSetup from "./config/dbconfig.js";
import Routers from "./routes/router.js";

// Declaring
dotend.config();
const app = express();
const PORT = process.env.SERVER_PORT || 5001;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

// Declering Rest API HTTP request
app.use("/", Routers);

// Start Rest API Server listener...
dbSetup()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server connect to the http://localhost:${PORT}/`);
      });
    } catch (err) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((err) => {
    console.log("Invalid database connection...!");
  });
