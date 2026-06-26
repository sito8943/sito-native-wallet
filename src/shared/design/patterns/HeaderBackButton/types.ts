import { type Href } from "expo-router"

export type HeaderBackButtonProps = {
  // Where to go when there is nothing to pop (e.g. the screen was entered via a
  // deep push from another tab, so the stack has no parent to return to).
  fallback: Href
}
