import { Router } from 'express';
import passport from 'passport';
import { isNotAuthenticated, logout } from '../middlewares/validateUser';

const router = Router();

router.get('/google', isNotAuthenticated, passport.authenticate('google'));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/message',
    successRedirect: '/home',
  })
);

router.get('/logout', logout);

export default router;
