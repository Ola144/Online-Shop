export interface IUser {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  date?: string;
  uid?: string;
}

export class UserModel {
  fullName: string;
  emailId: string;
  password: string;
  role: string;

  constructor() {
    this.fullName = "";
    this.password = "";
    this.emailId = "";
    this.role = "Customer";
  }
}
