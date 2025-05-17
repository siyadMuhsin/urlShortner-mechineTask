import { FilterQuery } from "mongoose";
import { IUrl } from "../Imodels";

export interface IUrlRepository{
    create(data:Partial<IUrl>):Promise<IUrl>
    findOne(data:FilterQuery<IUrl>):Promise<IUrl|null>
    find(data:FilterQuery<IUrl>):Promise<IUrl[]|[]>
    findByIdAndDelete(urlId:string):Promise<IUrl|null>
}