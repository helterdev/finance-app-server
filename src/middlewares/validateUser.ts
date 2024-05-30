import { Request, Response, NextFunction } from 'express';
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401);
  return res.redirect('/login');
};

export const isNotAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.status(401);
  return res.redirect('/home');
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/login');
      });
    });
  }
  return res.redirect('/login');
};
