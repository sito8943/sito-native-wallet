import { type DashboardCardType } from "../../cards/DashboardCard"

export type AddCardSheetProps = {
  open: boolean
  onClose: () => void
  onSelect: (type: DashboardCardType) => void
}
