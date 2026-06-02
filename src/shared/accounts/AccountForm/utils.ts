import { ACCOUNT_TYPE } from "../Account"
import { type AddAccountDto } from "../dtos"

import { type AccountFormValues } from "./types"

export const toFormValues = (dto?: AddAccountDto): AccountFormValues =>
  dto === undefined
    ? {
        name: "",
        bankName: "",
        balance: "",
        type: ACCOUNT_TYPE.CASH,
        currencyId: "",
      }
    : {
        name: dto.name,
        bankName: dto.bankName ?? "",
        balance: String(dto.balance),
        type: dto.type,
        currencyId: dto.currency.id,
      }

export const parseBalance = (value: string): number => Number(value.trim())

export const isValidBalance = (value: string): boolean => {
  const trimmed = value.trim()
  return trimmed !== "" && Number.isFinite(Number(trimmed))
}
