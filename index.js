import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import { studentRouter } from "./src/routes/student.router.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());
const PORT = process.env.PORT || 3000;

app.use("/students", studentRouter);

app.get("/health", (_, res) => {
    res.status(200).json("Success");
});

app.listen(PORT, () => {
    console.log("Server is running", PORT);
});
