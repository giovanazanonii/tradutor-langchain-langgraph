import express from "express";
import cors from "cors";
import translateRouter from "./routes/translate";
import { TranslateDto } from "./dto/translate.dto";
import { validationPipe } from "./common/validation.pipe";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/translate", validationPipe(TranslateDto));
app.use("/translate", translateRouter);

export default app;
