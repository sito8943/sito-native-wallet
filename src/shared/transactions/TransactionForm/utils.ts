import { type AddTransactionDto } from "../dtos"

import { type TransactionFormValues } from "./types"

// Local YYYY/MM/DD for today, matching the app's stored date format.
const formatToday = (): string => {
  const now = new Date()
  const month = `${now.getMonth() + 1}`.padStart(2, "0")
  const day = `${now.getDate()}`.padStart(2, "0")

  return `${now.getFullYear()}/${month}/${day}`
}

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
        date: formatToday(),
        accountId: "",
        categoryIds: [],
      }
    : { ...dto, amount: `${dto.amount}` }
