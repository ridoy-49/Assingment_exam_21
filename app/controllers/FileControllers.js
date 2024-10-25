import fs from 'fs';
import path from 'path';
import {fileURLToPath} from "url"
import {dirname} from 'path';
import profilesModel from "../model/profilesModel.js";
import fileUpload from "express-fileupload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const FileUpload=async (req,res)=>{
    try{
        const UploadedFile=req.files.file
        if(!Array.isArray(UploadedFile)){
            const UploadPath=path.join(__dirname,'../../uploads',Date.now()+"_"+UploadedFile.name)
            await UploadedFile.mv(UploadPath,(err)=>{
                if(err){
                    res.json({msg:err.toString()});
                }
                res.json({status:"success",msg:"file Upload successfully",file:UploadPath})
            })
        }
        else{
            for(let i=0;i<UploadedFile.length;i++){
                let  UploadPath=path.join(__dirname,'../../uploads',Date.now()+"_"+UploadedFile[i].name)
                await UploadedFile[i].mv(UploadPath,(err)=>{
                    if(err){
                        res.json({msg:err.toString()});
                    }
                })
            }
            res.json({status:"success",msg:"file Upload successfully"})
        }
    }
    catch (err){
        res.json({msg:err.toString()});
    }
}





export const FileRead=async (req,res)=>{
    try{
        const fileName=req.params.fileName;
        let filePath=path.join(__dirname,'../../uploads',fileName)
        console.log(filePath);
        return res.sendFile(filePath);
    }
    catch (err){
        res.json({msg:err.toString()});
    }
}


export const FileDelete=async (req,res)=>{
    try{
        const fileName=req.params.fileName;
        let filePath=path.join(__dirname,'../../uploads',fileName)
        fs.unlinkSync(filePath,(err)=>{
            if(err){
                res.json({msg:err.toString()});
            }
        });
        res.json({status:"success"});
    }
    catch (err){
        res.json({msg:err.toString()});
    }
}