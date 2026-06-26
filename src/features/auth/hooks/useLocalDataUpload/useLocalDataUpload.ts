import { useCallback, useState } from "react"

import { type UseLocalDataUploadState } from "./types"

// STUB. On sign-up the user keeps their local data — so we ship whatever is in
// local storage (accounts, categories, currencies, transactions, subscriptions,
// dashboard) up to the backend for the new account. The real implementation
// will read each StorageClient and POST a bulk import; for the views-only
// milestone this just resolves after a tick.
export default function useLocalDataUpload(): UseLocalDataUploadState {
  const [uploading, setUploading] = useState(false)

  const upload = useCallback(async (): Promise<void> => {
    setUploading(true)
    try {
      // Stub: the real version serializes every local StorageClient and POSTs a
      // bulk import so the backend persists the guest's data under the new
      // account.
      await new Promise((resolve) => {
        setTimeout(resolve, 400)
      })
    } finally {
      setUploading(false)
    }
  }, [])

  return { upload, uploading }
}
