import express from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

interface UserJWT {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

// declare global {
//   namespace Express {
//     interface Request {
//       user: User;
//     }
//   }
// }

const secretKey = 'accesstoken';

export const authRequired = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: 'Not token, Access denied',
    });
  }

  jwt.verify(
    token,
    secretKey,
    (err: JsonWebTokenError | null, user: UserJWT | any) => {
      if (err) {
        return res.status(401).json({
          message: 'Invalid token',
        });
      }

      req.user = user;

      next();
    }
  );
};
