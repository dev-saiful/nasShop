import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import productRoute from "./routes/product.routes.js";
import orderRoute from "./routes/order.routes.js";
import uploadRoute from "./routes/upload.routes.js";
import { errorHandler,notFound } from "./middlewares/error.middleware.js";

export const app = express();
/**
 * @desc middlewares needed
 */
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/api/v1/users",userRoute);
app.use("/api/v1/products",productRoute);
app.use("/api/v1/orders",orderRoute);
app.use("/api/v1/upload",uploadRoute);

app.get("/api/config/paypal",(req,res)=>{
    res.send({clientId : process.env.PAYPAL_CLIENT_ID});
});

    // const __dirname = path.resolve();
    // const __dirname = path.join(path.resolve(),"..");

if(process.env.NODE_ENV==="production")
{
        const __dirname = path.resolve();
    // console.log(path.join(__dirname,"/uploads"));
    console.log(__dirname);
    // set static folder
    app.use("/uploads",express.static("/var/data/uploads"));
    app.use(express.static(path.join(__dirname,"..","/client/dist")));

    // any route that is not api will be redirected to index.html
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"..","client","dist","index.html"));
    });
}
else
{
const __dirname = path.resolve();
app.use("/uploads",express.static(path.join(__dirname,"..","/uploads")));
console.log(path.join(__dirname));
    app.get("/",(req,res)=>{
      
        res.send("Api is running");
    });
}

app.use(notFound);
app.use(errorHandler);