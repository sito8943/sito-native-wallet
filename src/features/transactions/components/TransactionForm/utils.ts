import { todayStamp } from "#shared/data"

import { type AddTransactionDto } from "../../dtos"

import { type TransactionFormValues } from "./types"

export const parseAmount = (value: string): number =>
  Number(value.replace(",", "."))

export const isValidAmount = (value: string): boolean => {
  const amount = parseAmount(value)

  return Number.isFinite(amount) && amount > 0
}

export const toFormValues = (
  dto: AddTransactionDto | undefined,
  // Pre-selected account for a fresh form (e.g. adding from an account's
  // detail screen). Ignored when editing an existing transaction.
  defaultAccountId = 0,
  // Pre-selected categories for a fresh form (e.g. adding from a filtered
  // dashboard card). Ignored when editing an existing transaction.
  defaultCategoryIds: number[] = [],
): TransactionFormValues =>
  dto === undefined
    ? {
        description: "",
        amount: "",
        date: todayStamp(),
        accountId: defaultAccountId,
        categoryIds: defaultCategoryIds,
      }
    : { ...dto, amount: `${dto.amount}` }
