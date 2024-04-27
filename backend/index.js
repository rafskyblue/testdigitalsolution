import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import ProductRoute from "./routes/produkroute.js";

const app = express();
mongoose.connect("mongodb://localhost:27017/fullstack_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database Conected"));

app.use(cors());
app.use(express.json());
app.use(ProductRoute);

app.listen(5000, () => console.log("server and up running ..."));
