import { type APP_ICONS } from "#design/elements/Icon"

import { type DashboardCardType } from "../../cards/DashboardCard"

export type AddCardSheetProps = {
  open: boolean
  onClose: () => void
  onSelect: (type: DashboardCardType) => void
}

export type Option = {
  type: DashboardCardType
  label: string
  description: string
  icon: (typeof APP_ICONS)[keyof typeof APP_ICONS]
}
