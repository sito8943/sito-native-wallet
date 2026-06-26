import { type DashboardCardType } from "../../components/cards/DashboardCard"

export type AddDashboardCardDto = {
  type: DashboardCardType
  position: number
}
