import { Router } from "express";
import { studentController } from "../controllers/student.controller.js";

const studentRouter = new Router();

studentRouter.post("/", studentController.create);
export { studentRouter };
