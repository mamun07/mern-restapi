import express from "express";
import dotend from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

// Importing support file
import dbSetup from "./config/dbconfig.js";
import Routers from "./routes/router.js";

// Declaring
dotend.config();
const app = express();
const PORT = process.env.SERVER_PORT || 5001;

// Configraing
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Declering Rest API Routing
app.use("/api", Routers);

// Rest API Server listener...
app.listen(PORT, () => {
  dbSetup();
  console.log(`Surver running on port ${PORT}`);
});
