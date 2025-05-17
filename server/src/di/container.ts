import { Container } from "inversify";
import { TYPES } from "./types";

import { IAuthController } from "../interfaces/controller/IAuthController";
import { AuthController } from "../controllers/auth.controller";
import { IAuthServices } from "../interfaces/services/IAuthServices";
import { AuthService } from "../services/auth.service";
import { IUserRepository } from "../interfaces/repository/IUserRepository";
import { UserRepository } from "../repositories/UserRepository";
import { IAuthMiddleware } from "../interfaces/IMiddlerwares";
import { AuthMiddleware } from "../middlewares/authmiddleware";
import { ITokenController } from "../interfaces/controller/ITokenController";
import { TokenController } from "../controllers/token.controller";
import { IUrlController } from "../interfaces/controller/IUrlController";
import { UrlController } from "../controllers/url.controller";
import { IUrlServices } from "../interfaces/services/IUrlServices";
import { UrlService } from "../services/url.service";
import { IUrlRepository } from "../interfaces/repository/IUrlRepository";
import { UrlRepository } from "../repositories/UrlRepository";
const container = new Container()
container.bind<IAuthController>(TYPES.AuthController).to(AuthController);
container.bind<IAuthServices>(TYPES.AuthService).to(AuthService)
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
container.bind<IAuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware)
container.bind<ITokenController>(TYPES.TokenController).to(TokenController)
container.bind<IUrlController>(TYPES.UrlController).to(UrlController)
container.bind<IUrlServices>(TYPES.UrlService).to(UrlService)
container.bind<IUrlRepository>(TYPES.UrlRepository).to(UrlRepository)
export default container