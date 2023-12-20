import { prisma } from "../prisma/index.js";
import { CustomError } from "../utils/customError.js";
class StudentService {
    create = async (studentInput) => {
        const student = await prisma.student.create({
            data: {
                ...studentInput
            },
            select: {
                id: true
            }
        });
    };
    updateProfile = async (id, input) => {
        try {
            const existingStudent = await prisma.student.findUnique({
                where: {
                    id: id
                }
            });

            if (!existingStudent) {
                return {
                    error: "Student not found"
                };
            }

            const updatedStudent = await prisma.student.update({
                where: {
                    id: id
                },
                data: {
                    firstName: input.firstName || existingStudent.firstName,
                    lastName: input.lastName || existingStudent.lastName,
                    email: input.email || existingStudent.email,
                    className: input.className || existingStudent.className
                }
            });

            return {
                updatedStudent
            };
        } catch (error) {
            throw new CustomError("Project does not exist", 404);
        }
    };
    getOne = async (id, studentId) => {
        const student = await prisma.student.findUnique({
            where: { id: id }
        });
        if (!student) {
            throw new CustomError("Student does not exists", 404);
        }
        if (student.studentId !== studentId) {
            throw new CustomError("StudentId does not match", 403);
        }
        return student;
    };
}
export const studentService = new StudentService();
