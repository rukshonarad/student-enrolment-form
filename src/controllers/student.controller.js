import { studentService } from "../services/student.service.js";
import { catchAsync } from "../utils/catch.async.js";
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
}
export const studentController = new StudentController();
