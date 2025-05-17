import { Request, Response } from "express";

export interface IUrlController{
    createShortUrl(req:Request,res:Response):Promise<void>
    redirectUrl(req:Request,res:Response):Promise<void>
    getUrls(req:Request,res:Response):Promise<void>
    deleteUrl(req:Request,res:Response):Promise<void>
}