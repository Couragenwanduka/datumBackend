import path from 'path';
import dotenv from 'dotenv';
import 'express-async-errors'; 
import express from 'express';
import { fileURLToPath } from 'url';
import promoteStudents from './helper/cron.js'; 
import router from './router/student.route.js';
import adminRouter from './router/admin.route.js';
import parentRouter from './router/parent.route.js';
import resultRouter from './router/result.route.js';
import errorHandling from './error/async.Error.js';  
import activityRouter from './router/activity.route.js';
import attendanceRouter from './router/attendance.route.js';
import subjectRouter from './router/subject.route.js';
import remarkRouter from './router/remark.route.js';

// Load environment variables
dotenv.config();

// Start scheduled tasks
promoteStudents();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handlers
app.use('/api/student', router);
app.use('/api/admin', adminRouter);
app.use('/api/parent', parentRouter);
app.use('/api/result', resultRouter);
app.use('/api', attendanceRouter);
app.use('/api/activity', activityRouter);
app.use('/api/subject', subjectRouter);
app.use('/api/remark', remarkRouter);

// Error handling middleware (must be last)
app.use(errorHandling);


app.get("/", function (req,res){
  res.send("Welcome to Datum Development School App... Delevoped by Courage Nduka and Ani Okechukwu")
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




 
