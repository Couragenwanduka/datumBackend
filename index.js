import express from 'express';
import router from './router/student.route.js';
import parentRouter from './router/parent.route.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/student', router);
app.use('/api/parent', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});