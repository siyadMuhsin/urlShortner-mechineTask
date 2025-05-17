import { FilterQuery } from "mongoose";
import { IUrl } from "../interfaces/Imodels";
import { IUrlRepository } from "../interfaces/repository/IUrlRepository";
import { Url } from "../models/urls.models";

export class UrlRepository implements IUrlRepository{
    async create(data: Partial<IUrl>): Promise<IUrl> {
        const url=new Url(data)
        return await url.save()
    }
    async findOne(data: FilterQuery<IUrl>): Promise<IUrl | null> {
        return await Url.findOne(data)
    }
    async find(data:FilterQuery<IUrl>):Promise<IUrl[]|[]>{
        return await Url.find(data)
    }
    async findByIdAndDelete(urlId: string): Promise<IUrl|null> {
        const id= urlId
        return await Url.findByIdAndDelete(urlId)
         
    }

}