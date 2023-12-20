import { studentService } from "../services/student.service.js";
import { catchAsync } from "../utils/catch.async.js";
import cors from "cors";
class StudentController {
    create = catchAsync(async (req, res) => {
        const { body } = req;

        const studentInput = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            className: body.className
        };
        await studentService.create(studentInput);
        res.status(200).json({ massage: "Success" });
    });

    updateProfile = catchAsync(async (req, res) => {
        const {
            params: { id },
            body: { input }
        } = req;

        const updatedStudent = await studentService.updateProfile(id, input);

        res.status(200).json({
            data: updatedStudent
        });
    });
    getOne = catchAsync(async (req, res) => {
        const { studentId, params } = req;
        const student = await studentService.getOne(params.id, studentId);
        res.status(200).json({
            data: student
        });
    });
    getAll = catchAsync(async (req, res) => {
        const students = await studentService.getAll();
        res.status(200).json({
            data: students
        });
    });
    delete = catchAsync(async (req, res) => {
        const { studentId, params } = req;
        await studentService.delete(params.id, studentId);
        res.status(204).send();
    });
}
export const studentController = new StudentController();
