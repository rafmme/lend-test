import { knexInstance } from "../config";

interface IAccount {
  id: number;
  accountName: string;
  accountOwner: string;
  accountBalance: number;
  securityPassKey: string;
};

export const Account = knexInstance<IAccount>('accounts');

