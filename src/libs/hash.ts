import bycrypt from 'bcryptjs';

export const hashed = async (payload: string) => {
  const salt = await bycrypt.genSalt(10);
  return await bycrypt.hash(payload, salt);
};

export const compareHashed = async (payload: string, localData: string) => {
  return await bycrypt.compare(payload, localData);
};
