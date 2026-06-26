export const CURRENCIES_ENDPOINT = "/currencies"

// One page big enough to hold every currency a user realistically has; the
// backend rejects pageSize 0, so we ask for a generous cap instead.
export const CURRENCIES_PULL_PAGE_SIZE = 500
