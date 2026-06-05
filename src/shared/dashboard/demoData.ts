import { TRANSACTION_TYPE } from "#shared/categories/TransactionCategory"

import {
  DASHBOARD_CARD_TYPE,
  TYPE_RESUME_TIME,
  type DashboardCard,
} from "./DashboardCard"

// First-launch dashboard: one of each non-subscription card. Balance points at
// the seeded "Main account" (id 1 in the accounts demo data); if that account
// is gone the card simply prompts the user to pick another.
export const INITIAL_DASHBOARD: DashboardCard[] = [
  {
    id: 1,
    type: DASHBOARD_CARD_TYPE.CURRENT_BALANCE,
    title: null,
    config: JSON.stringify({ accountId: 1 }),
    position: 0,
  },
  {
    id: 2,
    type: DASHBOARD_CARD_TYPE.WEEKLY_SPENT,
    title: null,
    config: JSON.stringify({ type: TRANSACTION_TYPE.EXPENSE }),
    position: 1,
  },
  {
    id: 3,
    type: DASHBOARD_CARD_TYPE.TYPE_RESUME,
    title: null,
    config: JSON.stringify({
      type: TRANSACTION_TYPE.INCOME,
      time: TYPE_RESUME_TIME.MONTH,
    }),
    position: 2,
  },
]
