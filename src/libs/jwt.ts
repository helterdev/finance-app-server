import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY!;

export const createToken = (payload: jwt.JwtPayload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secretKey,
      {
        expiresIn: '1d',
      },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        return resolve(token);
      }
    );
  });
};
