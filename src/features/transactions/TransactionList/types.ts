import { type ReactElement } from "react"

import { type Action } from "#design/interactions"

import { type Transaction } from "../Transaction"

export type TransactionListProps = {
  data?: Transaction[]
  emptyMessage?: string
  onPress?: (transaction: Transaction) => void
  actionsFor?: (transaction: Transaction) => Array<Action<Transaction>>
  // Infinite/virtual scrolling: called when the user nears the end so the
  // caller can load the next page. Omit for a plain (non-paginated) list.
  onEndReached?: () => void
  // Swipe-to-delete: return a per-row handler to enable it, undefined to skip.
  onSwipeDelete?: (transaction: Transaction) => (() => void) | undefined
  // Header rendered above the list (e.g. filters), kept inside the same
  // scroll/virtualized container.
  header?: ReactElement
}
