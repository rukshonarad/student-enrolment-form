import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { studentRouter } from "./src/routes/student.router.js";
dotenv.config();
app.use(cors());
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/health", (_, res) => {
    res.status(200).json("Success");
});

app.use("/students", studentRouter);

app.listen(PORT, () => {
    console.log("Server is running", PORT);
});
