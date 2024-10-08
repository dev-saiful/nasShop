import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import {CloudinaryStorage}  from "multer-storage-cloudinary";
dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET, 
});


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'products',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});


export {
    storage,
}