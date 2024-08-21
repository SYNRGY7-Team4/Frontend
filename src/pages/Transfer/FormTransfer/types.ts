export interface IFormTransfer {
  accountFrom: string;
  accountTo: string;
  amount: number;
  description: string;
  pin: string;
  datetime: string;
  bankTo: string;
}

export interface IAccount {
  id: string;
  name: string;
  accountNumber: string;
}
