import { type Dispatch, type SetStateAction } from "react"

export type UseStoredStateOptions<T> = {
  errorMessage: string
  initialValue: T
  parseStoredValue: (value: unknown) => T
  storageKey: string
}

export type UseStoredStateResult<T> = {
  error: Error | null
  isLoading: boolean
  setValue: Dispatch<SetStateAction<T>>
  value: T
}
