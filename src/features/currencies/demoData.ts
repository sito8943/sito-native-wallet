import { type Currency } from "./Currency"

const euro: Currency = {
  id: 1,
  name: "Euro",
  symbol: "€",
  description: "European Union currency",
}

const dollar: Currency = {
  id: 2,
  name: "US Dollar",
  symbol: "$",
  description: "United States currency",
}

export const INITIAL_CURRENCIES: Currency[] = [euro, dollar]
