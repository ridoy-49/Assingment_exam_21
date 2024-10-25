import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from "mongoose";
import router from "./routes/api.js"
import fileUpload from "express-fileupload";
import {
    DATABSE,
    MAX_JSON_SIZE,
    PORT,
    REQUEST_NUMBER,
    REQUEST_TIME,
    URL_ENCODE,
    WEB_CACHE
} from "./app/config/config.js";

const app = express();


//APP use default Middleware
app.use(cors());
app.use(express.json({limit:MAX_JSON_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(helmet());
app.use(express.static('public'));
app.use(fileUpload())

//App Use Limiter
const limiter=rateLimit({windowMs:REQUEST_TIME,max:REQUEST_NUMBER})
app.use(limiter);

//cache
app.set("etag",WEB_CACHE);

//DATABASE Connect
mongoose.connect(DATABSE,{autoIndex:true})
    .then(()=>{
        console.log("Database Connected")
    }).catch((err)=>{
    console.log("Database Error",err)
})



app.use("/api",router);

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})