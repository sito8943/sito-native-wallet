import { useContext } from "react"

import { SessionContext } from "./SessionContext"
import { type SessionContextValue } from "./types"

export default function useSession(): SessionContextValue {
  const context = useContext(SessionContext)

  if (context === null) {
    throw new Error("useSession must be used within a SessionProvider")
  }

  return context
}
