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
        const { email, firstName, lastName, className } = req.body;
        if (!email || !firstName || !lastName || !className) {
            return res
                .status(400)
                .json({ message: "Please provide all required fields." });
        }
        const studentInput = {
            email,
            firstName,
            lastName,
            className
        };

        await studentService.updateProfile(req.studentId, studentInput);

        res.status(200).json({
            message: "Profile was updated successfully!"
        });
    });
}
export const studentController = new StudentController();
