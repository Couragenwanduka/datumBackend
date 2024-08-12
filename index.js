import dotenv from 'dotenv';
import express from 'express';
import router from './router/student.route.js';
import adminRouter from './router/admin.route.js';
import parentRouter from './router/parent.route.js';
import resultRouter from './router/result.route.js';
import promoteStudents from './helper/cron.js';
import path from 'path';
import { fileURLToPath } from 'url';

promoteStudents()
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/student', router);
app.use('/api/admin', adminRouter);
app.use('/api/parent', parentRouter);
app.use('/api/result', resultRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});