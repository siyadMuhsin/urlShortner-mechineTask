import mongoose, { Schema } from "mongoose";
import { IUrl } from "../interfaces/Imodels";
import User from "./user.model";
const urlSchema= new mongoose.Schema<IUrl>({
    userId:{type:Schema.Types.ObjectId,ref:"User",required:true},
    originalUrl:{type:String,required:true},
    shortUrl:{type:String,required:true},
    createdAt:{type:Date,default:Date.now()}

})
export const Url=mongoose.model<IUrl>("Url",urlSchema)