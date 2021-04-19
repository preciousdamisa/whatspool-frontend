export interface AuthResponseData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roles: [];
  referralCode: string;
  token: string;
  expiresIn: number;
}
