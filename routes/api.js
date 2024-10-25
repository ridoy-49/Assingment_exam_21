import express from 'express';
const router = express.Router();
import * as UserControllers from '../app/controllers/UserControllers.js';
import * as FileControllers from '../app/controllers/FileControllers.js';
import Authentication from "../app/middleware/Authentication.js";

///Users
router.post("/Registration", UserControllers.Registration);
router.post("/Login",UserControllers.Login);
router.post("/CodeVerify",Authentication,UserControllers.EmailVerify);
router.post("/UpdateUserProfile",Authentication,UserControllers.UpdateUserProfile);
router.post("/CodeVerify",Authentication,UserControllers.CodeVerify);
router.get("/ReadUserProfile",Authentication,UserControllers.ReadUserProfile);

///
router.post("/FileUpload",FileControllers.FileUpload);
router.get("/FileRead",FileControllers.FileRead);
router.delete("/FileDelete",FileControllers.FileDelete);


export default router