import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/google', passport.authenticate('google'));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/message',
    successRedirect: '/home',
  })
);

export default router;
