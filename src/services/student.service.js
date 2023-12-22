import { prisma } from "../prisma/index.js";
import { CustomError } from "../utils/customError.js";
class StudentService {
    create = async (studentInput) => {
        const student = await prisma.student.create({
            data: {
                ...studentInput
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                className: true
            }
        });
        return student;
    };
    updateProfile = async (id, update) => {
        const student = await prisma.student.update({
            where: {
                id
            },
            data: {
                ...update
            }
        });
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
    getAll = async () => {
        const students = prisma.student.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                className: true
            }
        });
        return students;
    };
    delete = async (id) => {
        const student = await prisma.student.findUnique({
            where: {
                id: id
            }
        });

        const updatedStudent = await prisma.student.delete({
            where: {
                id: id
            }
        });
        return updatedStudent;
    };
}
export const studentService = new StudentService();
