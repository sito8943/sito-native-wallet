export const CATEGORIES_ENDPOINT = "/transaction-categories"

// One page big enough to hold every category a user realistically has; the
// backend rejects pageSize 0, so we ask for a generous cap instead.
export const CATEGORIES_PULL_PAGE_SIZE = 500
