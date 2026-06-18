export type DateRange = { start?: string; end?: string }

// Maps a backend (remote) id to its local id, or undefined when the referenced
// row isn't synced locally. Built from the accounts/categories stores at pull,
// used to remap a pulled card's config snapshots (see remapCardConfigIds).
export type RemoteIdResolver = (remoteId: number) => number | undefined
