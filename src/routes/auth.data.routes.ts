import { Router } from "express";
import { isAuthenticated } from "../middlewares/validateUser";
import {
  getAllData,
  getData,
  createData,
} from "../controllers/data.controller";

const router = Router();

router.get("/alldata", isAuthenticated, getAllData);
router.get("/data/:id", isAuthenticated, getData);
router.post("/data", isAuthenticated, createData);

export default router;
