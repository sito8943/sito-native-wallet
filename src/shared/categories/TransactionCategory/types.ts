export enum TransactionType {
  Out = 0,
  In = 1,
}

export type TransactionCategory = {
  id: string
  name: string
  color: string
  type: TransactionType
}
