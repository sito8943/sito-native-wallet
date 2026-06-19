export const SUBSCRIPTION_PROVIDERS_ENDPOINT = "/subscription-providers"

// One page big enough to hold every provider a user realistically has; the
// backend defaults to a small page, so we ask for a generous cap instead.
export const SUBSCRIPTION_PROVIDERS_PULL_PAGE_SIZE = 500
