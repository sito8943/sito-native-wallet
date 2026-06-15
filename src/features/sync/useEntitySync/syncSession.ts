import { type SyncBaseline } from "../syncEngine"

// App-global sync session state, encapsulated as a singleton (like the Manager
// it coordinates) rather than per-instance hook refs. The orchestrator hook can
// mount on more than one instance of the tabs shell, and React double-invokes
// effects in dev — a per-instance ref let the pull fire twice and split the
// baselines. One shared record keeps "pull once per user" honest and the push
// baselines consistent across mounts.
let pulledForUser: number | null = null
let hydrated = false
const baselines = new Map<string, SyncBaseline>()

export const syncSession = {
  // True once we've already pulled for this user, so a re-mount skips the pull.
  hasPulledFor: (userId: number): boolean => pulledForUser === userId,
  markPulledFor: (userId: number): void => {
    pulledForUser = userId
  },
  // True once the initial pull finished and baselines are built (push gate).
  isHydrated: (): boolean => hydrated,
  markHydrated: (): void => {
    hydrated = true
  },
  setBaseline: (label: string, baseline: SyncBaseline): void => {
    baselines.set(label, baseline)
  },
  getBaseline: (label: string): SyncBaseline | undefined =>
    baselines.get(label),
  // Back to guest: forget everything so the next sign-in pulls fresh.
  reset: (): void => {
    pulledForUser = null
    hydrated = false
    baselines.clear()
  },
}
