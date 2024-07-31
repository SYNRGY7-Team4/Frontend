export interface Response {
  data: object;
}

export interface RegisterFormData {
  email: string;
  no_hp: string;
  password: string;
  confirm_password: string;
  no_ktp: string;
  name: string;
  date_of_birth: string;
  ektp_photo: File | null;
  pin: string;
  confirm_pin: string;
}
