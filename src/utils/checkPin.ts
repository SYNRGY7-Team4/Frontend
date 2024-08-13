import bcrypt from "bcrypt";

export const checkPin = async (inputPin: string, userPin: string) => {
  return await bcrypt.compareSync(inputPin, userPin);
};
