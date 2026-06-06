import { type DashboardCardType } from "../DashboardCard"

export type AddCardSheetProps = {
  open: boolean
  onClose: () => void
  onSelect: (type: DashboardCardType) => void
}
