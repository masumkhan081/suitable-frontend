export interface IErrorSignup {
  username: string;
  email: string;
  password: string;
}
export interface IErrorLogin {
  email: string;
  password: string;
}
export interface ISignupData {
  name: string;
  email: string;
  password: string;
  gender: string;
  dob: string;
}
export interface ILoginData {
  email: string;
  password: string;
}
export interface IUpdatePassword {
  password: string;
  newPassword: string;
}

