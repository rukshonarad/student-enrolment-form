import { Router } from "express";
import { studentController } from "../controllers/student.controller.js";

const studentRouter = new Router();

studentRouter.post("/", studentController.create);
studentRouter.patch("/:id", studentController.updateProfile);
export { studentRouter };
