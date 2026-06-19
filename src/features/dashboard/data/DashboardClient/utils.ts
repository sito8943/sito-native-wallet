import { type DashboardCard } from "../../components/cards/DashboardCard"

// Stored value is the raw card array; anything else (corrupt/legacy) resets to
// empty and the seed re-runs.
export const parseStoredDashboard = (value: unknown): DashboardCard[] =>
  Array.isArray(value) ? (value as DashboardCard[]) : []
