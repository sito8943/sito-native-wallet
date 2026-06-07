import { type DashboardCard } from "../DashboardCard"
import { type AddDashboardCardDto } from "../dtos"

export type UseDashboardState = {
  data: DashboardCard[]
  error: Error | null
  isLoading: boolean
  addCard: (input: AddDashboardCardDto) => void
  updateTitle: (id: number, title: string) => void
  updateConfig: (id: number, config: string) => void
  removeCard: (id: number) => void
  reorderCards: (orderedIds: number[]) => void
}
