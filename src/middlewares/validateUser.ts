import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UserJWT } from "../types/express";
import accessenv from "../config";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(
      token,
      accessenv.SECRET_KEY,
      (err: JsonWebTokenError | null, user: UserJWT | any) => {
        if (err) {
          return res.status(401).json({
            message: "Invalid token",
          });
        }

        req.userJWT = user;

        next();
      }
    );
  } else {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ message: "Access Denied" });
  }
};

export const isNotAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect(accessenv.SUCCESS_URL);
  }

  return res.redirect(accessenv.SUCCESS_URL);
};
