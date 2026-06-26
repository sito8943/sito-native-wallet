export const TRANSACTIONS_ENDPOINT = "/transactions"

// One page big enough to hold a user's history; the backend defaults to a small
// page, so we ask for a generous cap (it accepts large sizes) instead of paging.
export const TRANSACTIONS_PULL_PAGE_SIZE = 500
