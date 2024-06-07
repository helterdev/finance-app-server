import express from 'express';

export interface UserJWT {
  id: string;
  email: string;
  iat: number;
  exp: number;
}
declare global {
  namespace Express {
    interface Request {
      userJWT?: UserJWT;
    }
  }
}
