import mongoose, { Document, Types } from "mongoose";

export interface IUser extends Document {
    _id:string;
    username:string;
    email:string;
    password:string;
    createdAt:Date;
    updatedAt:Date;
}

export interface IUrl extends Document{
userId:Types.ObjectId
    originalUrl:string,
    shortUrl:string
    createdAt:Date
}