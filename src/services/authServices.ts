import { AxiosError } from "axios";
import { Response, RegisterFormData } from "./type";
import axiosInstance from "@/axios/axios";

const handleError = (error: unknown): any => {
  if (error instanceof AxiosError) {
    if (error.response?.data) {
      console.error("API Error:", error.response.data);
      return error.response?.data;
    } else {
      console.error("Error jaringan:", error.message);
      return {
        message: "Terjadi kesalahan jaringan. Silakan coba lagi.",
      };
    }
  } else {
    console.error("Error tidak terduga:", error);
    return {
      message: "Terjadi kesalahan yang tidak terduga. Silakan coba lagi.",
    };
  }
};

export const checkRegisterDataAPI = async (
  fieldName: string,
  fieldValue: string
) => {
  try {
    const requestBody = {
      filter: {
        [fieldName]: fieldValue,
      },
    };

    const response = await axiosInstance.post<Response>(
      "https://lumibank-api-fsw-edqo6jv53q-et.a.run.app/api/users",
      requestBody
    );
    console.log(response);

    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const registerAPI = async (formData: RegisterFormData) => {
  const form = new FormData();
  form.append("email", formData.email);
  form.append("no_hp", formData.no_hp);
  form.append("password", formData.password);
  form.append("no_ktp", formData.no_ktp);
  form.append("name", formData.name);
  form.append("date_of_birth", formData.date_of_birth);
  form.append("ektp_photo", formData.ektp_photo);
  form.append("pin", formData.pin);

  try {
    const response = await axiosInstance.post<Response>("/auth/register", form);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchUserDataAPI = async () => {
  try {
    const response = await axiosInstance.get<Response>("/user/me");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchUserBalanceDataAPI = async (account_number: string) => {
  try {
    const response = await axiosInstance.get<Response>(
      `/balance/get?accountNumber=${account_number}`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchUserMutationDataAPI = async (account_number: string) => {
  try {
    const response = await axiosInstance.get<Response>(
      `/transaction/mutations?accountNumber=${account_number}`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchUserQRCodeDataAPI = async () => {
  try {
    const response = await axiosInstance.get(`/qrcode/generate`, {
      responseType: "arraybuffer",
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
