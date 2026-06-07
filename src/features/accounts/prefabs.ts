import { ACCOUNT_BANK_NAME, ACCOUNT_TYPE } from "./Account"
import { type AccountPrefab } from "./types"

export const ACCOUNT_PREFABS: AccountPrefab[] = [
  {
    key: "main",
    name: { en: "Main account", es: "Cuenta principal" },
    bankName: ACCOUNT_BANK_NAME.CAIXA,
    type: ACCOUNT_TYPE.DIGITAL,
    description: {
      en: "Everyday banking account",
      es: "Cuenta bancaria del día a día",
    },
  },
  {
    key: "savings",
    name: { en: "Savings", es: "Ahorros" },
    bankName: ACCOUNT_BANK_NAME.BPA,
    type: ACCOUNT_TYPE.DIGITAL,
    description: {
      en: "Money set aside for goals",
      es: "Dinero apartado para objetivos",
    },
  },
  {
    key: "travel-card",
    name: { en: "Travel card", es: "Tarjeta de viaje" },
    bankName: ACCOUNT_BANK_NAME.REVOLUT,
    type: ACCOUNT_TYPE.DIGITAL,
    description: {
      en: "Card for trips and foreign currency",
      es: "Tarjeta para viajes y moneda extranjera",
    },
  },
  {
    key: "cash-wallet",
    name: { en: "Cash wallet", es: "Cartera de efectivo" },
    type: ACCOUNT_TYPE.CASH,
    description: {
      en: "Physical cash on hand",
      es: "Efectivo físico disponible",
    },
  },
  {
    key: "credit-card",
    name: { en: "Credit card", es: "Tarjeta de crédito" },
    bankName: ACCOUNT_BANK_NAME.IMAGIN,
    type: ACCOUNT_TYPE.DIGITAL,
    description: {
      en: "Revolving credit account",
      es: "Cuenta de crédito renovable",
    },
  },
]
