import { type TransactionCategory } from "#features/categories/TransactionCategory"
import { todayStamp } from "#shared/data/time"

import { type AddTransactionDto } from "./dtos"
import { type StoredTransaction } from "./TransactionClient"

// No demo seed: transactions start empty.
export const INITIAL_TRANSACTIONS: StoredTransaction[] = []

const DEMO_DESCRIPTIONS = [
  "Coffee",
  "Groceries",
  "Salary",
  "Taxi",
  "Gym",
  "Books",
  "Dinner",
  "Electricity",
  "Refund",
  "Freelance",
]

const pick = <T>(items: T[]): T =>
  items[Math.floor(Math.random() * items.length)]

// Dev-only helper: a believable random transaction for the given account,
// tagged with a random available category (none if the user has none yet).
export function makeDemoTransaction(
  accountId: number,
  categories: TransactionCategory[],
): AddTransactionDto {
  const category = categories.length > 0 ? pick(categories) : undefined

  return {
    description: pick(DEMO_DESCRIPTIONS),
    amount: Math.round((Math.random() * 200 + 1) * 100) / 100,
    date: todayStamp(),
    accountId,
    categoryIds: category ? [category.id] : [],
  }
}
