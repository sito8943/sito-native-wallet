import AsyncStorage from "@react-native-async-storage/async-storage"

import { CURRENCIES_STORAGE_KEY } from "./constants"
import LocalCurrencyClient from "./LocalCurrencyClient"

// Regression: ids are numbers (since "Id to number"). The stored-value guard
// must accept numeric ids, otherwise parse filters every persisted currency out
// and the data vanishes on the next launch.
describe("Currencies > LocalCurrencyClient", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it("reloads added currencies after a restart (numeric ids survive parse)", async () => {
    const first = new LocalCurrencyClient()
    await first.hydrate()
    first.add({ name: "Bitcoin", symbol: "₿", description: "" })
    // Flush the fire-and-forget persist.
    await new Promise((resolve) => setTimeout(resolve, 0))

    const expected = first.getAll().length

    // "Restart": a brand-new instance reading the same storage.
    const second = new LocalCurrencyClient()
    await second.hydrate()

    expect(second.getAll()).toHaveLength(expected)
    expect(second.getAll().some((c) => c.symbol === "₿")).toBe(true)
  })

  it("persists a numeric-id currency that round-trips through storage", async () => {
    const client = new LocalCurrencyClient()
    await client.hydrate()
    client.add({ name: "Bitcoin", symbol: "₿", description: "" })
    await new Promise((resolve) => setTimeout(resolve, 0))

    const raw = await AsyncStorage.getItem(CURRENCIES_STORAGE_KEY)
    const stored = JSON.parse(raw ?? "[]") as Array<{ id: unknown }>

    expect(stored.length).toBeGreaterThan(0)
    expect(stored.every((c) => typeof c.id === "number")).toBe(true)
  })
})
