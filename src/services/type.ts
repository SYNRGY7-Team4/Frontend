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
