import { type CurrencyPrefab } from "./types"

export const CURRENCY_PREFABS: CurrencyPrefab[] = [
  {
    key: "usd",
    name: { en: "US Dollar", es: "Dólar estadounidense" },
    symbol: "$",
    description: {
      en: "United States dollar",
      es: "Dólar de Estados Unidos",
    },
  },
  {
    key: "eur",
    name: { en: "Euro", es: "Euro" },
    symbol: "€",
    description: {
      en: "European Union euro",
      es: "Euro de la Unión Europea",
    },
  },
  {
    key: "gbp",
    name: { en: "British Pound", es: "Libra esterlina" },
    symbol: "£",
    description: {
      en: "United Kingdom pound sterling",
      es: "Libra esterlina del Reino Unido",
    },
  },
  {
    key: "brl",
    name: { en: "Brazilian Real", es: "Real brasileño" },
    symbol: "R$",
    description: {
      en: "Brazilian real",
      es: "Real brasileño",
    },
  },
  {
    key: "cup",
    name: { en: "Cuban Peso", es: "Peso cubano" },
    symbol: "CUP",
    description: {
      en: "Cuban peso",
      es: "Peso cubano",
    },
  },
]
