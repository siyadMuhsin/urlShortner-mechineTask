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
const container = new Container()
container.bind<IAuthController>(TYPES.AuthController).to(AuthController);
container.bind<IAuthServices>(TYPES.AuthService).to(AuthService)
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
container.bind<IAuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware)
container.bind<ITokenController>(TYPES.TokenController).to(TokenController)
export default container