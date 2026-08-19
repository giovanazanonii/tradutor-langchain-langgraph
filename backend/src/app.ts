import express from "express";
import cors from "cors";
import translateRouter from "./routes/translate";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/translate", translateRouter);

export default app;
