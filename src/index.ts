import express from "express";
import { connectMongoDB } from "./mongo";
import routerPersonas from "./routes";
import dotenv from "dotenv";

dotenv.config();

connectMongoDB();

const app = express();
app.use(express.json());
app.use("/api/books", routerPersonas);

app.listen(3000, () => console.log("La API se ha iniciado."));