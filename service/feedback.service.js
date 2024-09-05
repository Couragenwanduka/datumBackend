import prisma from "../prisma/dbconnect.js";
import { googleApi } from "../helper/googleApi.js";
import Feedback from "../model/feedback.model.js";
import { sendFeedbackSuccessMessage } from "../helper/nodemailer.js";
import pLimit from 'p-limit';

// Define concurrency limit
const limit = pLimit(5); // Adjust based on your system's capacity and API rate limits

const feedbackBackup = async (studentId, feedback, className, term, subject) => {
    try {
        const newFeedback = new Feedback({
            studentId,
            feedback,
            class: className,
            term,
            subject,
            createdAt: new Date(),
        });
        await newFeedback.save();
        return newFeedback;
    } catch (error) {
        console.log('Error backing up feedback:', error.message);
        throw error; // Optionally re-throw the error
    }
};

const saveFeedback = async (studentId, feedback, className, term, subject) => {
    try {
        const savedFeedback = await prisma.feedback.create({
            data: {
                studentId,
                feedback,
                class: className, // Ensure this field matches your Prisma schema
                term,
                subject,
                createdAt: new Date(),
            }
        });
        return savedFeedback;
    } catch (error) {
        console.log('Error saving feedback:', error.message);
        throw error; // Optionally re-throw the error
    }
};

export const generateFeedback = async (term,email) => {
    try {
        const batchSize = 100; // Define appropriate batch size
        let skip = 0;
        let hasMore = true;

        while (hasMore) {
            // Fetch students in batches, filtered by term
            const students = await prisma.student.findMany({
                skip,
                take: batchSize,
                where: {
                    term: term // Assuming `term` is a field in the `student` model
                },
                include: {
                    remarks: true,
                    attendance: true,
                    results: true,
                },
            });

            if (students.length === 0) {
                hasMore = false;
                break;
            }

            // Group students by class
            const classGroups = students.reduce((acc, student) => {
                const className = student.class; // Assuming `class` is a field in the `student` model
                if (!acc[className]) {
                    acc[className] = [];
                }
                acc[className].push(student);
                return acc;
            }, {});

            // Process each class group
            for (const [className, studentsInClass] of Object.entries(classGroups)) {
                console.log(`Processing class: ${className} for term: ${term}`);

                const feedbackPromises = studentsInClass.map(student =>
                    limit(async () => {
                        try {
                            const aiFeedback = await googleApi(JSON.stringify(student), JSON.stringify(studentsInClass));
                            let saveToSql;
                            let subject = student.results.subject || 'Subject Missing';
                            try {
                                saveToSql = await saveFeedback(student.id, aiFeedback, student.class, student.term, subject);
                            } catch {
                                // If saving to Prisma fails, back up with Mongoose
                                await feedbackBackup(student.id, aiFeedback, student.class, student.term, subject);
                                 await sendFeedbackSuccessMessage(email)
                                console.log(`Feedback backed up for student ID: ${student.id} in class: ${className}, term: ${term}`);
                            }
                            if (saveToSql) {
                                await sendFeedbackSuccessMessage(email)
                                console.log(`Feedback generated and saved for student ID: ${student.id} in class: ${className}, term: ${term}`);
                            }
                        } catch (error) {
                            console.error(`Error generating feedback for student ID: ${student.id} in class: ${className}, term: ${term}`, error);
                        }
                    })
                );

                // Wait for all promises for the current class to resolve
                await Promise.all(feedbackPromises);
            }

            // Prepare for the next batch
            skip += batchSize;
        }

        console.log(`Feedback generation process completed successfully for term: ${term}.`);
    } catch (error) {
        console.error(`Error during feedback generation process for term: ${term}:`, error);
        throw error;
    }
};


export const getAllFeedbackOnPostgres = async(term) => {
    try {
        const feedback = await prisma.feedback.findMany({
            where: {
                term,
            },
            include: {
                student: true,
            },
        });
        return feedback;
    } catch (error) {
        console.log('Error getting feedback:', error.message);
        throw error;
    }
}

export const getAllFeedbackOnMongoDb = async(term) => {
    try {
        const feedback = await Feedback.find({term});
        return feedback;
    } catch (error) {
        console.log('Error getting feedback from MongoDB:', error.message);
        throw error;
    }
}

export const getFeedbackByStudentIdAndTermOnPostgress = async(studentId, Class,term) => {
    try {
        const feedback = await prisma.feedback.findMany({
            where: {
                studentId:parseInt(studentId,10),
                class:Class,
                term,
            },
        })
        return feedback;
    } catch (error) {
        console.log('Error getting feedback by student ID and term:', error.message);
        throw error;
    }
}
export const getFeedbackByStudentIdAndTermOnMongodb = async(studentId, Class,term) =>{
    try {
        const feedback = await Feedback.findOne({studentId, term, class:Class});
        return feedback;
    } catch (error) {
        console.log('Error getting feedback by student ID and term from MongoDB:', error.message);
        throw error;
    }
}
export const deleteAllFeedback = async() => {
    try {
        await prisma.feedback.deleteMany();
        console.log('All feedback deleted from Postgres');
    } catch (error) {
        console.log('Error deleting all feedback from Postgres:', error.message);
        throw error;
    }
}