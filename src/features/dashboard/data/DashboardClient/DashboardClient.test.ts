import AsyncStorage from "@react-native-async-storage/async-storage"

import { DASHBOARD_CARD_TYPE } from "../../components/cards/DashboardCard"

import { DASHBOARD_STORAGE_KEY } from "./constants"
import DashboardClient from "./DashboardClient"

// Exercises the store directly (fresh instance, no React, no singleton). The
// dashboard ships with no demo seed, so each test builds the state it needs.
describe("Dashboard > DashboardClient", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it("starts empty (no demo seed)", () => {
    const client = new DashboardClient()

    expect(client.list({ pageSize: 0 }).items).toHaveLength(0)
  })

  it("adds a card with null title and config", () => {
    const client = new DashboardClient()

    client.add({ type: DASHBOARD_CARD_TYPE.TYPE_RESUME, position: 9 })

    const items = client.getAll()
    expect(items).toHaveLength(1)
    const added = items.at(-1)
    expect(added?.type).toBe(DASHBOARD_CARD_TYPE.TYPE_RESUME)
    expect(added?.title).toBeNull()
    expect(added?.config).toBeNull()
  })

  it("updates a card title", () => {
    const client = new DashboardClient()
    client.add({ type: DASHBOARD_CARD_TYPE.CURRENT_BALANCE, position: 0 })
    const [first] = client.getAll()

    client.updateTitle(first.id, "My balance")

    expect(client.getById(first.id)?.title).toBe("My balance")
  })

  it("updates a card config", () => {
    const client = new DashboardClient()
    client.add({ type: DASHBOARD_CARD_TYPE.CURRENT_BALANCE, position: 0 })
    const [first] = client.getAll()
    const config = JSON.stringify({ accountId: 2 })

    client.updateConfig(first.id, config)

    expect(client.getById(first.id)?.config).toBe(config)
  })

  // Regression: a write that happens before disk finishes loading must not
  // persist the seed state over the user's real data (which would wipe it on
  // the next launch). The pre-hydration write replays onto the loaded data.
  it("preserves stored data when written to before hydration completes", async () => {
    const stored = [
      {
        id: 42,
        type: DASHBOARD_CARD_TYPE.CURRENT_BALANCE,
        title: "Saved card",
        config: null,
        position: 0,
      },
    ]
    await AsyncStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(stored))

    // Construct + write synchronously, before the async hydrate read resolves.
    const client = new DashboardClient()
    client.add({ type: DASHBOARD_CARD_TYPE.TYPE_RESUME, position: 1 })

    await client.hydrate()

    const ids = client.getAll().map((card) => card.id)
    expect(ids).toContain(42)
    expect(client.getAll()).toHaveLength(stored.length + 1)

    const persisted = JSON.parse(
      (await AsyncStorage.getItem(DASHBOARD_STORAGE_KEY)) ?? "[]",
    ) as Array<{ id: number }>
    expect(persisted.map((card) => card.id)).toContain(42)
    expect(persisted).toHaveLength(stored.length + 1)
  })

  it("removes a card", () => {
    const client = new DashboardClient()
    client.add({ type: DASHBOARD_CARD_TYPE.CURRENT_BALANCE, position: 0 })
    const [first] = client.getAll()

    client.remove(first.id)

    expect(client.getById(first.id)).toBeUndefined()
    expect(client.getAll()).toHaveLength(0)
  })
})
