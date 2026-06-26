import { type Animated, type LayoutChangeEvent } from "react-native"

import { type Action } from "#design/interactions"

import { type Account } from "../../Account"

export type CollapsibleAccountHeaderProps = {
  account: Account
  // Corner action menu (e.g. adjust balance), same shape AccountCard expects.
  actions?: Array<Action<Account>>
  // Vertical scroll offset of the list this header floats over; drives the
  // collapse from full card to compact bar.
  scrollY: Animated.Value
  // Natural (expanded) height of the full card. The owner keeps it so it can
  // pad the list content by the same amount; updated via onMeasure.
  expandedHeight: number
  // Height of the collapsed (sticky) bar.
  collapsedHeight: number
  // Reports the measured full-card height so the owner can sync list padding.
  onMeasure: (event: LayoutChangeEvent) => void
}
