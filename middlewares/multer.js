import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

export const upload = multer({storage: storage})



cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
  });

const uploadToCloudinary = async (imageurl) => {
  try {
    const result = await cloudinary.uploader.upload(imageurl);
    return result.url;
  } catch (error) {
    console.log(error);
  }
};


export default uploadToCloudinary;






