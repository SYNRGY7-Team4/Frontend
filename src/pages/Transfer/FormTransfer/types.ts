export interface IFormTransfer {
  accountFrom: string;
  accountTo: string;
  amount: number;
  description: string;
  pin: string;
}

export interface IAccount {
  id: string;
  name: string;
  accountNumber: string;
}
