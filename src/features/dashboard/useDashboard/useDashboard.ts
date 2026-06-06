import { useManager } from "#shared/data"
import { useClientStore } from "#shared/data/storage"

import { type AddDashboardCardDto } from "../dtos"

import { type UseDashboardState } from "./types"

export default function useDashboard(): UseDashboardState {
  const client = useManager().Dashboard
  const { error, isLoading } = useClientStore(client)

  // pageSize 0 = full list; cards are ordered by their stored position.
  const result = client.list({ pageSize: 0 })
  const data = [...result.items].sort((a, b) => a.position - b.position)

  return {
    data,
    error,
    isLoading,
    addCard: (input: AddDashboardCardDto) => {
      client.add(input)
    },
    updateTitle: (id: number, title: string) => {
      client.updateTitle(id, title)
    },
    updateConfig: (id: number, config: string) => {
      client.updateConfig(id, config)
    },
    removeCard: (id: number) => {
      client.remove(id)
    },
  }
}
