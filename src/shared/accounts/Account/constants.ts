export const ACCOUNT_TYPE = {
  CASH: "cash",
  DIGITAL: "digital",
} as const

export const ACCOUNT_BANK_NAME = {
  IMAGIN: "Imagin",
  CAIXA: "Caixa",
  REVOLUT: "Revolut",
  BANDEC: "Bandec",
  BPA: "BPA",
  BANCO_METROPOLITANO: "Banco Metropolitano",
} as const

export const ACCOUNT_BANK_OPTIONS = Object.values(ACCOUNT_BANK_NAME).map(
  (bankName) => ({
    id: bankName,
    label: bankName,
  }),
)

// Human-readable labels for selectors and cards.
export const ACCOUNT_TYPE_LABEL = {
  [ACCOUNT_TYPE.CASH]: "Cash",
  [ACCOUNT_TYPE.DIGITAL]: "Digital",
} as const
