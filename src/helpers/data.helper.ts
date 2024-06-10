import { DataModel } from "../db/models/data.model";
export const findbyId = async (id: any) => {
  try {
    const data = await DataModel.findById(id);
    return data;
  } catch (error) {
    console.log("Error in Helper findbyId:", error);
  }
};

export const create = async (value: number, user: "user" | "UserGoogle") => {
  try {
    const data = await new DataModel({
      data: value,
      user,
    });

    return data;
  } catch (error) {
    console.log("Error in createHelperData:", error);
  }
};
