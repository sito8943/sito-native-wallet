import { getLocales } from "expo-localization"

import { CURRENCY_PREFABS } from "#features/currencies"
// Top-level manager import is safe here: this module is only ever reached via a
// dynamic import (from the onboarding finish handler), so the Manager + entity
// client graph never lands in the eager boot graph.
import { manager } from "#shared/data"
import { getDeviceLanguage, type LocalizedText } from "#shared/i18n"

import { ACCOUNT_TYPE } from "../Account"

// Name of the auto-created starter account, resolved to the device language.
const DEFAULT_ACCOUNT_NAME: LocalizedText = {
  en: "My account",
  es: "Mi cuenta",
}

// Eurozone country codes — devices in these regions start in EUR. Cuba (CU)
// starts in CUP; everything else falls back to USD.
const EUROZONE = new Set([
  "AT", "BE", "HR", "CY", "EE", "FI", "FR", "DE", "GR", "IE", "IT",
  "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES",
])

// Resolve the device region (e.g. Spain → "ES") via expo-localization. Intl's
// resolvedOptions().locale is unreliable on RN/Hermes — it usually omits the
// region, which is why Spain wrongly fell back to USD before. getLocales() reads
// the real OS region and is guaranteed to return at least one entry.
const deviceRegion = (): string | null => {
  const region = getLocales()[0]?.regionCode
  return region != null && region !== "" ? region.toUpperCase() : null
}

// Map the region to the prefab currency key the starter account is created in.
const defaultCurrencyKey = (region: string | null): string => {
  if (region === "CU") {
    return "cup"
  }
  if (region !== null && EUROZONE.has(region)) {
    return "eur"
  }
  return "usd"
}

// First-run seed: give an empty device a usable starting point — one default
// currency (picked by region) and one DIGITAL account — so the app isn't an
// empty shell. Runs on onboarding finish AND after logout (logout's
// clearLocalData drops to guest + empty, the same "no login, no data" state).
// Guest/local-first: it never touches the backend, and a later sign-in wipes it
// (clearLocalData) before replacing it with the account's real server data.
//
// Idempotent: hydrates from disk first, then no-ops if ANY currency or account
// already exists, so it can only ever seed a truly empty device once.
export const seedDefaultAccount = async (): Promise<void> => {
  // Wait for disk so the "is it empty?" check sees real persisted data, not the
  // transient empty seed (e.g. when onboarding re-runs after a key bump).
  await manager.hydrateAll()

  if (
    manager.Accounts.getAll().length > 0 ||
    manager.Currencies.getAll().length > 0
  ) {
    return
  }

  const language = getDeviceLanguage()
  const currencyPrefab =
    CURRENCY_PREFABS.find(
      (prefab) => prefab.key === defaultCurrencyKey(deviceRegion()),
    ) ?? CURRENCY_PREFABS[0]
  if (currencyPrefab === undefined) {
    return
  }

  manager.Currencies.add({
    name: currencyPrefab.name[language],
    symbol: currencyPrefab.symbol,
    description: currencyPrefab.description[language],
  })

  // `add` is void (the backend assigns no id locally), but the commit updates
  // the in-memory cache synchronously — so the just-created currency is the only
  // row and can be read straight back to embed in the account.
  const currency = manager.Currencies.getAll()[0]
  if (currency === undefined) {
    return
  }

  manager.Accounts.add({
    name: DEFAULT_ACCOUNT_NAME[language],
    type: ACCOUNT_TYPE.DIGITAL,
    balance: 0,
    currency,
  })
}
