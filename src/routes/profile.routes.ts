import { Router } from "express";
import { profile, logout } from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/validateUser";

const router = Router();

router.get("/profile", isAuthenticated, profile);
router.post("/logout", isAuthenticated, logout);

export default router;
