export const ACCOUNTS_ENDPOINT = "/accounts"

// One page big enough to hold every account a user realistically has; the
// backend rejects pageSize 0, so we ask for a generous cap instead.
export const ACCOUNTS_PULL_PAGE_SIZE = 500
