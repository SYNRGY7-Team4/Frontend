import axios from "axios";
import { Response, RegisterFormData } from "./type";

export const registerAPI = async (
  formData: RegisterFormData
): Promise<Response> => {
  const form = new FormData();
  form.append("email", formData.email);
  form.append("no_hp", formData.no_hp);
  form.append("password", formData.password);
  form.append("confirm_password", formData.confirm_password);
  form.append("no_ktp", formData.no_ktp);
  form.append("name", formData.name);
  form.append("date_of_birth", formData.date_of_birth);
  form.append("ektp_photo", formData.ektp_photo);
  form.append("pin", formData.pin);
  form.append("confirm_pin", formData.confirm_pin);
  Object.entries(formData).forEach(([key, value]) => {
    if (value !== null) {
      form.append(key, value);
    }
  });

  try {
    const response = await axios.post<Response>(
      "https://backend-dev-synrgy-team4.koyeb.app/api/auth/register",
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Registration failed. Please try again.");
  }
};
