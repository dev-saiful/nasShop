import path from "path";
import { Router } from "express";
import multer from "multer";
import {ApiError} from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";

const uploadRoute = Router();

const storage = multer.diskStorage({
    destination(req,file,cb)
    {
        cb(null,"../uploads"); // null is for error
    },
    filename(req,file,cb)
    {
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

function fileFilter(req, file, cb)
{
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);
  
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Images only!'), false);
    }
}
const upload = multer({ storage, fileFilter });

const uploadSingleImage = upload.single('image');

uploadRoute.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
      if (err) {
          return res.status(400).json(new ApiError(400, err.message));
      }
      if (!req.file) {
          return res.status(400).json(new ApiError(400, "No file uploaded"));
      }
      res.status(200).json(
          new ApiResponse(200, `${req.file.path}` , "Image uploaded successfully")
      );
  });
});


export default uploadRoute;