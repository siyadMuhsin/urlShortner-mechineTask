import { UrlController } from "../controllers/url.controller";


export const TYPES={
    AuthController:Symbol.for("AuthController"),
    AuthService:Symbol.for('AuthService'),
    UserRepository:Symbol.for('UserRepository'),
    AuthMiddleware:Symbol.for('AuthMiddleware'),
    TokenController:Symbol.for('TokenController'),
    UrlController:Symbol.for('UrlController'),
    UrlService:Symbol.for('UrlService'),
    UrlRepository:Symbol.for("UrlRepository")

}