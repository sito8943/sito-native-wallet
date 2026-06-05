import { type DashboardCardType } from "../DashboardCard"

export type AddDashboardCardDto = {
  type: DashboardCardType
  position: number
}
