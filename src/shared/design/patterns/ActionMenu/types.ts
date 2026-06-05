import { type Action } from "#design/interactions"

export type ActionMenuProps<T> = {
  entity: T
  actions: Array<Action<T>>
  // Tint for the trigger + sticky icons. Cards with a custom surface (e.g. a
  // branded AccountCard) pass their own text color so the icons stay legible;
  // defaults to the IconButton's themed color when omitted.
  color?: string
  // Accessible label for the overflow (3-dots) trigger.
  menuLabel: string
}
