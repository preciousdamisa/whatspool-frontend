export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public balance: number,
    public referralBonus: number,
    public roles: [],
    public wins: [],
    public referralCode: string,
    private _token: string,
    private _tokenExpiryTime: Date
  ) {}

  static fromJson(userData: {
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
    _token: string;
    _tokenExpiryTime: string;
  }) {
    return new User(
      userData.id,
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.phone,
      userData.balance,
      userData.referralBonus,
      userData.roles,
      userData.wins,
      userData.referralCode,
      userData._token,
      new Date(userData._tokenExpiryTime)
    );
  }

  get token() {
    if (this._tokenExpiryTime && this._tokenExpiryTime > new Date()) {
      return this._token;
    }
    return null;
  }

  get tokenExpiryTime() {
    return this._tokenExpiryTime;
  }

  get isAdmin() {
    return this.roles.find((r) => r === 'Admin') ? true : false;
  }

  get isModerator() {
    return this.roles.find((r) => r === 'Moderator') ? true : false;
  }
}