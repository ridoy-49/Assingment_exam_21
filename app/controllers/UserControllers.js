
import usersModel from "../model/usersModel.js";
import {TokenEncode} from "../utility/tokenUtility.js";
import SendEmail from "../utility/EmailUtility.js";
import Authentication from "../middleware/Authentication.js";

export const Registration=async (req,res)=>{
    try{
        let reqBody=req.body;
        await usersModel.create(reqBody)
        return res.json({status: "success",msg: "User registered successfully"})
    }
    catch (err){
        res.json({msg:err.toString()});
    }
}

export const Login=async (req,res)=>{
    try{
        let reqBody=req.body;
        let data= await usersModel.findOne(reqBody)
        if(!data){
            res.json({status:"fail",message:"Users does not exist"})
        }
        else{
            let token=TokenEncode(data["email"],data["_id"])
            res.json({status:"success",msg:"User login successfully",token:token})
        }
    }
    catch (err){
        res.json({msg:err.toString()});
    }
}

export const EmailVerify=async (req,res)=>{
    try{
        let email=req.body.email;
        let data=await usersModel.findOne({"email":email})
        let code=Math.floor(Math.random()*1000000)
        let EmailTo=data["email"]
        let EmailSubject="Email Verification "
        let EmailText=`Your Email verification code in ${code}`
        await usersModel.updateOne({"email":email}, {"otp": code})
        if(!data){
            res.json({status:"fail",message:"User does not exist"})
        }
        else {
            //await SendEmail(EmailTo,EmailText,EmailSubject)
            res.json({status:"success",msg:"Email send successfully",code:code})
        }
    }
    catch (err){
        console.log(err)
        res.json({status:"fail",msg:err.toString()});
    }
}

export const CodeVerify=async (req,res)=>{
    try{
        let otp=req.body["otp"]
        let data= await usersModel.findOne({"otp":otp})
        if(!data){
            res.json({status:"fail",message:"Invalid Code"})
        }
        else{
            res.json({status:"success",msg:"Code verification successfully",data:data})
        }
    }
    catch (err){
        res.json({status:"fail",msg:err.toString()});
    }
}

export const UpdateUserProfile=async (req,res)=>{
    try{
        let reqBody=req.body;
        let data =await usersModel.updateOne(reqBody)
        res.json({status:"success",msg:"User updated successfully",data:data})
    }
    catch (err){
        res.json({status:"fail",message:err.toString()});
    }
}

export const ReadUserProfile=async (req,res)=>{
    try{
        let reqBody=req.body;
        let data =await usersModel.findOne(reqBody)
        res.json({status:"success",msg:"User updated successfully",data:data})
    }
    catch (err){
        res.json({status:"fail",message:err.toString()});
    }
}


