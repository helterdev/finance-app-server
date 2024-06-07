import { Router, Request, Response } from "express";
import passport from "passport";
import { isNotAuthenticated, logout } from "../middlewares/validateUser";
import accessenv from "../config";

const router = Router();

router.get("/google", isNotAuthenticated, passport.authenticate("google"));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: accessenv.FAILED_URL,
    successRedirect: accessenv.SUCCESS_URL,
  })
);

router.get("/logout", logout);

export default router;
