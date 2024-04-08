import { validateSchema } from '../middlewares/validateSchema';
import { authRequired } from '../middlewares/validateToken';
import {
  logout,
  profile,
  signin,
  signup,
} from '../controllers/auth.controller';
import { Router } from 'express';
import { loginSchema, registerSchema } from '../validators/user.validator';

const router = Router();

router.post('/signup', validateSchema(registerSchema), signup);
router.post('/signin', validateSchema(loginSchema), signin);
router.get('/profile', authRequired, profile);
router.post('/logout', logout);

export default router;
