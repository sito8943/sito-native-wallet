import { useSubscriptions } from "../useSubscriptions"

import { type UseSubscriptionState } from "./types"

// Selects one subscription by id, keeping the view dumb. Subscriptions are
// still a static in-memory list (no StorageClient yet), so the lookup happens
// here; once they get a client this should delegate to client.getById like the
// other selector hooks.
export default function useSubscription(id: number): UseSubscriptionState {
  const { data, error, isLoading } = useSubscriptions()

  return {
    data: data?.find((item) => item.id === id) ?? null,
    error,
    isLoading,
  }
}
