import dotenv from 'dotenv';
import express from 'express';
import router from './router/student.route.js';
import adminRouter from './router/admin.route.js';
import parentRouter from './router/parent.route.js';
import subjectRoutes from './router/subject.route.js';
import attendanceRoutes from './router/attendance.route.js';
import resultRouter from './router/result.route.js';
import promoteStudents from './helper/cron.js';
import 'express-async-errors';  // Ensure async errors are handled
import errorHandling from './error/async.Error.js';  // Custom error handler
import path from 'path';
import { fileURLToPath } from 'url';

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
app.use('/api', subjectRoutes);
app.use('/api', attendanceRoutes);

// Error handling middleware (must be last)
app.use(errorHandling);


app.get("/", function (req,res){
  res.send("Welcome to Datum Development School App... Delevoped by Courage Nduka and Ani Okechukwu")
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




 
