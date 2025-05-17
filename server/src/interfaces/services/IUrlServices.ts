import { IUrl } from "../Imodels"

export interface IUrlServices{
    createUrl(originalUrl:string,userId:string):Promise<{ok:boolean,msg:string,shortUrl?:string}>
    redirectShortUrl(shortUrl:string):Promise<{ok:boolean,msg:string,originalUrl?:string}>
    getUrls(userId:string):Promise<{ok:boolean,msg:string,urls?:IUrl[]|[]}>
    deleteUrl(urlId:string):Promise<{ok:boolean,msg:string}>
}