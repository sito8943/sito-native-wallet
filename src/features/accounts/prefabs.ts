import { ACCOUNT_BANK_NAME, ACCOUNT_TYPE } from "./Account"
import { type AccountPrefab } from "./types"

export const ACCOUNT_PREFABS: AccountPrefab[] = [
  {
    key: "main",
    name: "Main account",
    bankName: ACCOUNT_BANK_NAME.CAIXA,
    type: ACCOUNT_TYPE.DIGITAL,
    description: "Everyday banking account",
  },
  {
    key: "savings",
    name: "Savings",
    bankName: ACCOUNT_BANK_NAME.BPA,
    type: ACCOUNT_TYPE.DIGITAL,
    description: "Money set aside for goals",
  },
  {
    key: "travel-card",
    name: "Travel card",
    bankName: ACCOUNT_BANK_NAME.REVOLUT,
    type: ACCOUNT_TYPE.DIGITAL,
    description: "Card for trips and foreign currency",
  },
  {
    key: "cash-wallet",
    name: "Cash wallet",
    type: ACCOUNT_TYPE.CASH,
    description: "Physical cash on hand",
  },
  {
    key: "credit-card",
    name: "Credit card",
    bankName: ACCOUNT_BANK_NAME.IMAGIN,
    type: ACCOUNT_TYPE.DIGITAL,
    description: "Revolving credit account",
  },
]
