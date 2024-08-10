import dotenv from 'dotenv';
import express from 'express';
import router from './router/student.route.js';
import adminRouter from './router/admin.route.js';
import parentRouter from './router/parent.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/student', router);
app.use('/api/admin', adminRouter);
app.use('/api/parent', parentRouter);

app.get("/", function (req,res){
   res.send("Welcome to Datum Development School App... Delevoped by Courage Nduka and Ani Okechukwu")
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});