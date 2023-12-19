import { studentService } from "../services/student.service.js";
import { catchAsync } from "../utils/catch.async.js";
class StudentController {
    create = catchAsync(async (req, res) => {
        const { body } = req;

        const studentInput = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            class: body.class
        };
        await studentService.create(studentInput);
        res.status(200).json({ massage: "Success" });
    });
}
export const studentController = new StudentController();
