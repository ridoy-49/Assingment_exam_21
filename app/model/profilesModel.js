import mongoose from "mongoose"
const UserSchema = new mongoose.Schema(
    {
        Bio:{type:String},
        img:{data:Buffer,contentType:"string"},
    },
    {
        timestamps: true,
        versionKey:false
    }
)
const usersModel=mongoose.model("profils",UserSchema);
export default usersModel;