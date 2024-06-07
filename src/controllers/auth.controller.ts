import { IUser, UserModel } from "../db/models/user.model";
import { Request, Response } from "express";
import { compareHashed, hashed } from "../libs/hash";
import { createToken } from "../libs/jwt";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password }: IUser = req.body;

  try {
    const userFind = await UserModel.findOne({ email });
    if (userFind) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const passwordhash = await hashed(password);

    const newUser = new UserModel({
      username,
      email,
      password: passwordhash,
    });

    const success = await newUser.save();
    if (!success) {
      return res.status(500).json({
        message: "Error creating user",
      });
    }

    return res.status(201).json({
      message: "User created successfully",
      data: {
        id: success._id,
        email: success.email,
        createdAt: success.createdAt,
        updatedAt: success.updatedAt,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error. Please try again later",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password }: IUser = req.body;
  try {
    const userFind = await UserModel.findOne({ email });

    if (!userFind) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const passwordIsMatch = await compareHashed(password, userFind.password);

    if (!passwordIsMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = await createToken({
      id: userFind._id,
      email: userFind.email,
    });
    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(200).json({
      message: "Login Success",
      user: {
        email: userFind.email,
        username: userFind.username,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error. Please try again later",
    });
  }
};

export const profile = async (req: Request, res: Response) => {
  //@ts-ignore
  const { id } = req.userJWT;

  const profileFound = await UserModel.findById(id);

  if (!profileFound) {
    return res.status(404).json({
      message: "Profile not found",
    });
  }

  res.status(200).json({
    id: profileFound._id,
    email: profileFound.email,
    username: profileFound.username,
  });
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("token", null, { expires: new Date(0) });
  res.status(200).json({
    message: "Logout success",
  });
};

export const hello = async (req: Request, res: Response) => {
  res.send("Hello World");
};
