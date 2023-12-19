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
    updateProfile = async (studentId, studentInput) => {
        try {
            const existingStudent = await prisma.student.findUnique({
                where: {
                    id: studentId
                }
            });

            if (!existingStudent) {
                return {
                    error: "Student not found"
                };
            }

            const updatedStudent = await prisma.student.update({
                where: {
                    id: studentId
                },
                data: {
                    ...studentInput
                }
            });

            return {
                updatedStudent
            };
        } catch (error) {
            console.error("Error updating profile:", error);
            return {
                error: "An error occurred while updating the profile"
            };
        }
    };
}
export const studentService = new StudentService();
