import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    _id:string;
    username:string;
    email:string;
    password:string;
    createdAt:Date;
    updatedAt:Date;
}

export interface IUrl extends Document{
    userId:mongoose.Schema.Types.ObjectId
    originalUrl:string,
    shortUrl:string
    createdAt:Date
}