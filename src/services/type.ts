export interface Response {
  success: boolean;
  data: object;
  message: string;
}

export interface RegisterFormData {
  email: string;
  no_hp: string;
  password: string;
  no_ktp: string;
  name: string;
  date_of_birth: string;
  ektp_photo: string;
  pin: string;
}

export interface ResetPasswordFormData {
  email: string;
  otp: string;
  newPassword: string;
}

export interface OTPRegisterFormData {
  email: string;
  noHP: string;
  otp: string;
}
