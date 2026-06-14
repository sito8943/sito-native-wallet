import { USE_MOCK_AUTH } from "../constants"

import { mockAuthClient } from "./mockAuthClient"
import { restAuthClient } from "./restAuthClient"
import { type AuthClient } from "./types"

// Real Java backend by default; the mock is opt-in (EXPO_PUBLIC_AUTH_MOCK=true)
// for offline UI work. A closed backend therefore fails login instead of
// quietly logging the user in.
export const authClient: AuthClient = USE_MOCK_AUTH
  ? mockAuthClient
  : restAuthClient
