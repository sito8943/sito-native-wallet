import { type Currency } from "./Currency"

const euro: Currency = {
  id: "eur",
  name: "Euro",
  symbol: "€",
  description: "European Union currency",
}

const dollar: Currency = {
  id: "usd",
  name: "US Dollar",
  symbol: "$",
  description: "United States currency",
}

export const INITIAL_CURRENCIES: Currency[] = [euro, dollar]
