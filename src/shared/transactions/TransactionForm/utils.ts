import { todayStamp } from "#shared/data"

import { type AddTransactionDto } from "../dtos"

import { type TransactionFormValues } from "./types"

export const parseAmount = (value: string): number =>
  Number(value.replace(",", "."))

export const isValidAmount = (value: string): boolean => {
  const amount = parseAmount(value)

  return Number.isFinite(amount) && amount > 0
}

export const toFormValues = (
  dto: AddTransactionDto | undefined,
): TransactionFormValues =>
  dto === undefined
    ? {
        description: "",
        amount: "",
        date: todayStamp(),
        accountId: "",
        categoryIds: [],
      }
    : { ...dto, amount: `${dto.amount}` }
