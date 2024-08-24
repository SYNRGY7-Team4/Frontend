export type TIsStatus = "success" | "danger" | undefined;

export type TPinInput = {
  pin: string;
};

export interface IDataSuccess {
  id: string;
  referenceNumber: string;
  accountFrom: string;
  accountTo: string;
  amount: number;
  balance: number;
  description: string;
  datetime: string;
  nameAccountFrom: string;
  nameAccountTo: string;
  status: string;
  type: string;
}
