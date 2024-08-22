export interface IFormTransfer {
  accountFrom: string;
  accountTo: string;
  amount: string;
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
