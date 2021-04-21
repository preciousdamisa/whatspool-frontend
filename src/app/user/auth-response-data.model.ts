export interface AuthResponseData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  balance: number;
  referralBonus: number;
  roles: [];
  wins: [];
  referralCode: string;
  token: string;
  expiresIn: number;
}
