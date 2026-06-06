import { type CurrencyPrefab } from "./types"

export const CURRENCY_PREFABS: CurrencyPrefab[] = [
  {
    key: "usd",
    name: "US Dollar",
    symbol: "$",
    description: "United States dollar",
  },
  { key: "eur", name: "Euro", symbol: "€", description: "European Union euro" },
  {
    key: "gbp",
    name: "British Pound",
    symbol: "£",
    description: "United Kingdom pound sterling",
  },
  {
    key: "brl",
    name: "Brazilian Real",
    symbol: "R$",
    description: "Brazilian real",
  },
  { key: "cup", name: "Cuban Peso", symbol: "CUP", description: "Cuban peso" },
]
