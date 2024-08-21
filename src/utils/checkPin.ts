import bcrypt from "bcryptjs";

export const checkPin = async (inputPin: string, userPin: string) => {
  const parts = userPin.split("$2a$12$");
  const hashPin = `$2a$12$${parts[2]}`;
  const passCheck = bcrypt.compareSync(inputPin, hashPin);
  return passCheck;
};
