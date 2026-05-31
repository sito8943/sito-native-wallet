import { type SOFT_DELETE_SCOPE } from "./constants"

export type SoftDeleteScope =
  (typeof SOFT_DELETE_SCOPE)[keyof typeof SOFT_DELETE_SCOPE]

export type BaseFilterDto = {
  deletedAt?: Date | null
  softDeleteScope?: SoftDeleteScope
}
