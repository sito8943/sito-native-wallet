import { type Currency } from "./types"

const euro: Currency = {
  id: "eur",
  name: "Euro",
  symbol: "€",
}

const dollar: Currency = {
  id: "usd",
  name: "US Dollar",
  symbol: "$",
}

export const INITIAL_CURRENCIES: Currency[] = [euro, dollar]
