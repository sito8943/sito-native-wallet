import { type DashboardCardType } from "../../cards/DashboardCard"

export type AddDashboardCardDto = {
  type: DashboardCardType
  position: number
}
