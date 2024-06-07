import { Router, Request, Response } from "express";
import { isAuthenticated } from "../middlewares/validateUser";
import { authRequired } from "../middlewares/validateToken";
import accessenv from "../config";

const router = Router();

router.get("/user", isAuthenticated, (req: Request, res: Response) => {
  console.log("Request:", req.user);
  console.log("RequestJWT:", req.userJWT);

  // if (req.user) {
  //   return res.json({ user: req.user });
  // }
  // res.json({ message: "Welcome user page" });
});

export default router;
