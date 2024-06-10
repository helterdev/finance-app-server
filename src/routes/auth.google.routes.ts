import { Router } from "express";
import passport from "passport";
import { isNotAuthenticated } from "../middlewares/validateUser";
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

export default router;
