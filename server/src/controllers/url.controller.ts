import { Request, Response } from "express";
import { IUrlController } from "../interfaces/controller/IUrlController";
import { HttpStatus } from "../types/httpStatus";
import {nanoid} from 'nanoid'
import { inject, injectable } from "inversify";
import { IUrlServices } from "../interfaces/services/IUrlServices";
import { TYPES } from "../di/types";
import { AuthRequest } from "../middlewares/authmiddleware";
@injectable()
export class UrlController implements IUrlController{
    constructor(
        @inject(TYPES.UrlService) private _urlService:IUrlServices
    ){}
    async createShortUrl(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { originalUrl } = req.body;
      const userId = req.user as string;
      console.log(userId);
      

      if (!originalUrl) {
        this.sendResponse(res, { ok: false, msg: "Original URL is required" }, HttpStatus.BAD_REQUEST);
        return;
      }

      if (!userId) {
        this.sendResponse(res, { ok: false, msg: "User not authenticated" }, HttpStatus.UNAUTHORIZED);
        return;
      }

      const result = await this._urlService.createUrl(originalUrl, userId);

      if (result.ok) {
        this.sendResponse(res, { ok: true, msg: "Short URL created successfully", shortUrl: result.shortUrl }, HttpStatus.CREATED);
      } else {
        this.sendResponse(res, { ok: false, msg: result.msg }, HttpStatus.BAD_REQUEST);
      }

    } catch (error) {
      console.error("Error creating short URL:", error);
      this.sendResponse(res, { ok: false, msg: "Server error" }, HttpStatus.SERVER_ERROR);
    }
  }
     async redirectUrl(req: Request, res: Response): Promise<void> {
    const { shortId } = req.params;

    try {
      if (!shortId) {
        this.sendResponse(res, { msg: "Short URL not provided" }, HttpStatus.BAD_REQUEST);
        return;
      }
      const result = await this._urlService.redirectShortUrl(shortId);
      if (!result.ok) {
        this.sendResponse(res, { msg: result.msg }, HttpStatus.NOT_FOUND);
        return;
      }
      res.redirect(result.originalUrl as string);
    } catch (error) {
      console.error("Error in redirectUrl controller:", error);
      this.sendResponse(res, { msg: "Server error" }, HttpStatus.SERVER_ERROR);
    }
  }
  async getUrls(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user as string;

      if (!userId) {
        this.sendResponse(res, { ok: false, msg: "User not authenticated" }, HttpStatus.UNAUTHORIZED);
        return;
      }

      const result = await this._urlService.getUrls(userId);

      if (result.ok) {
        this.sendResponse(res, { ok: true, msg: result.msg, urls: result.urls }, HttpStatus.OK);
      } else {
        this.sendResponse(res, { ok: false, msg: result.msg }, HttpStatus.BAD_REQUEST);
      }

    } catch (error) {
      console.error("Error fetching URLs:", error);
      this.sendResponse(res, { ok: false, msg: "Server error" }, HttpStatus.SERVER_ERROR);
    }
  }
 async deleteUrl(req: Request, res: Response): Promise<void> {
    try {
      const { urlId } = req.params;

      if (!urlId) {
        this.sendResponse(res, { ok: false, msg: "Url ID is required" }, HttpStatus.BAD_REQUEST);
        return;
      }

      const result = await this._urlService.deleteUrl(urlId);

      if (result.ok) {
        this.sendResponse(res, { ok: true, msg: result.msg }, HttpStatus.OK);
      } else {
        this.sendResponse(res, { ok: false, msg: result.msg }, HttpStatus.BAD_REQUEST);
      }

    } catch (error) {
      console.error("Error deleting URL:", error);
      this.sendResponse(res, { ok: false, msg: "Server error" }, HttpStatus.SERVER_ERROR);
    }
  }

    private sendResponse(res:Response,data:any,status:HttpStatus):void{
        res.status(status).json(data)
    }

}