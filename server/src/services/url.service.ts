import { nanoid } from "nanoid";
import { IUrlServices } from "../interfaces/services/IUrlServices";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { IUrlRepository } from "../interfaces/repository/IUrlRepository";
import { Types } from "mongoose";
import { IUrl } from "../interfaces/Imodels";

@injectable()
export class UrlService implements IUrlServices {
  constructor(
    @inject(TYPES.UserRepository) private _userRepository: IUserRepository,
    @inject(TYPES.UrlRepository) private _urlRepository: IUrlRepository
  ) {}

  async createUrl(originalUrl: string, userId: string): Promise<{ok:boolean,msg:string,shortUrl?:string}> {
    console.log("Original URL:", originalUrl);
    console.log("User ID:", userId);

    try {
      // Validate user
      const user = await this._userRepository.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

    //   const { username } = user;
      const shortId = nanoid(8);
    //   const shortUrl = `${username}-${shortId}`;

      // Convert userId to ObjectId
      const userObjectId = new Types.ObjectId(userId);

      // Create the URL entry
      const url = await this._urlRepository.create({
        originalUrl,
        shortUrl:shortId,
        userId: userObjectId,
      });

      
      return {ok:true,msg:"Url shorted successfully",shortUrl:url.shortUrl}
    } catch (error) {
      console.error("Error in createUrl:", error);
      throw new Error("Failed to create URL");
    }
  }
async redirectShortUrl(shortUrl: string): Promise<{ ok: boolean; msg: string; originalUrl?: string }> {
  try {
    const url = await this._urlRepository.findOne({ shortUrl });
    if (!url) {
      return { ok: false, msg: "Short URL not found" };
    }
    return { ok: true, msg: "URL found", originalUrl: url.originalUrl };
  } catch (error) {
    console.error("Error redirecting URL:", error);
    throw new Error("Error redirecting URL");
  }
}
async getUrls(userId: string): Promise<{ ok: boolean; msg: string; urls?: IUrl[] }> {
    try {
      const urls = await this._urlRepository.find({ userId });
      if (!urls.length) {
        return { ok: true, msg: "No URLs found", urls: [] };
      }
      return { ok: true, msg: "URLs fetched successfully", urls };
    } catch (error) {
      console.error("Error fetching URLs:", error);
      return { ok: false, msg: "Error fetching URLs" };
    }
  }
 async deleteUrl(urlId: string): Promise<{ ok: boolean; msg: string }> {
    try {
      const deletedUrl = await this._urlRepository.findByIdAndDelete(urlId);

      if (!deletedUrl) {
        return { ok: false, msg: "Url not found" };
      }

      return { ok: true, msg: "Url deleted successfully" };

    } catch (error) {
      console.error("Error deleting URL:", error);
      return { ok: false, msg: "Error deleting URL" };
    }
  }
}
