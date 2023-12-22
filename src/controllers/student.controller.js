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

        const student = await studentService.create(studentInput);

        res.status(200).json({ data: student });
    });

    updateProfile = catchAsync(async (req, res) => {
        const {
            body: { firstName, lastName, email, className },
            params: { id }
        } = req;

        const update = {};

        if (firstName) {
            update.firstName = firstName;
        }
        if (lastName) {
            update.lastName = lastName;
        }
        if (email) {
            update.email = email;
        }
        if (className) {
            update.className = className;
        }

        if (
            !(
                update.firstName ||
                update.lastName ||
                update.email ||
                update.className
            )
        ) {
            throw new CustomError(
                "At least one of the following fields is required: firstName, lastName, email, className",
                400
            );
        }

        await studentService.updateProfile(id, update);

        res.status(204).send();
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
