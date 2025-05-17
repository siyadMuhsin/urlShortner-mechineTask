import express, { Express } from "express";
import container from "../di/container";
import { IUrlController } from "../interfaces/controller/IUrlController";
import { TYPES } from "../di/types";
import { IAuthMiddleware } from "../interfaces/IMiddlerwares";
const urlRoute=express.Router()
const urlController=container.get<IUrlController>(TYPES.UrlController)
const authMiddleware=container.get<IAuthMiddleware>(TYPES.AuthMiddleware)
urlRoute.post('/shorten',authMiddleware.verifyToken.bind(authMiddleware),urlController.createShortUrl.bind(urlController))
urlRoute.get('/:shortId',urlController.redirectUrl.bind(urlController))
urlRoute.get('/',authMiddleware.verifyToken.bind(authMiddleware),urlController.getUrls.bind(urlController))
urlRoute.delete('/:urlId',urlController.deleteUrl.bind(urlController))
function test(){
    console.log('workign')
}
export default urlRoute