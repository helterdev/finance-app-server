import { Request, Response } from "express";
import { DataModel } from "../db/models/data.model";
import { findbyId, create } from "../helpers/data.helper";

export const getAllData = async (req: Request, res: Response) => {
  if (req.userJWT) {
    try {
      const data = await DataModel.find({
        user: req.userJWT.id,
      })
        .populate("Client")
        .exec();
      return res.status(200).json({
        data,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const data = await DataModel.find({
        //@ts-ignore
        userGoogle: req.user._id,
      })
        .populate("UserGoogle")
        .exec();
      return res.status(200).json({
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const getData = async (req: Request, res: Response) => {
  if (req.userJWT) {
    const data = await findbyId(req.userJWT);
    if (!data) return res.status(404).json({ message: "Not Found" });
    return res.status(200).json({ data });
  } else {
    const data = await findbyId(req.user);
    if (!data) return res.status(404).json({ message: "Not Found" });
    return res.status(200).json({ data });
  }
};

export const createData = async (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.user);
  console.log(req.userJWT);
};
