import { validateSchema } from "../middlewares/validateSchema";
import { signin, signup } from "../controllers/auth.controller";
import { Router } from "express";
import { loginSchema, registerSchema } from "../validators/user.validator";

const router = Router();

router.post("/signup", validateSchema(registerSchema), signup);
router.post("/signin", validateSchema(loginSchema), signin);

export default router;
