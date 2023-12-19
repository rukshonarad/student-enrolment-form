import { prisma } from "../prisma/index.js";

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
}
export const studentService = new StudentService();
