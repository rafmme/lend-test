import { knexInstance } from "../config";

interface IUser {
  id: number;
  fullName: string;
  email: string;
  securityPassKey: string;
};

export const User = knexInstance<IUser>('users');


