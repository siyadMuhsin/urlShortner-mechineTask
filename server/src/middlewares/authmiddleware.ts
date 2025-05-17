import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpStatus } from "../types/httpStatus";
import { IAuthMiddleware } from "../interfaces/IMiddlerwares";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export interface AuthRequest extends Request {
  user?: JwtPayload | string;
}

export class AuthMiddleware implements IAuthMiddleware{
  async verifyToken(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = this.getTokenFromRequest(req);

      if (!token) {
        this.sendResponse(res, { msg: "Unauthorized: No token provided" }, HttpStatus.UNAUTHORIZED);
        return;
      }

      const decoded = await this.tokenVerify(token, JWT_SECRET);
      req.user = decoded;
      next();
      
    } catch (error) {
      console.error("Token verification error:", error);
      this.sendResponse(res, { msg: "Invalid or expired token" }, HttpStatus.UNAUTHORIZED);
    }
  }

  private getTokenFromRequest(req: Request): string | null {
    return req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1] || null;
  }

  private sendResponse(res: Response, data: any, status: HttpStatus): void {
    res.status(status).json(data);
  }

  private tokenVerify(token: string, secret: string): Promise<JwtPayload | string> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded as JwtPayload);
      });
    });
  }
}
