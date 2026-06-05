import AsyncStorage from "@react-native-async-storage/async-storage"

import { DASHBOARD_CARD_TYPE } from "../DashboardCard"
import { INITIAL_DASHBOARD } from "../demoData"

import DashboardClient from "./DashboardClient"

// Exercises the store directly (fresh instance, no React, no singleton) so each
// test starts from the seeded cards held in the constructor.
describe("Dashboard > DashboardClient", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it("seeds the initial cards", () => {
    const client = new DashboardClient()

    expect(client.list({ pageSize: 0 }).items).toHaveLength(
      INITIAL_DASHBOARD.length,
    )
  })

  it("adds a card with null title and config", () => {
    const client = new DashboardClient()

    client.add({ type: DASHBOARD_CARD_TYPE.WEEKLY_SPENT, position: 9 })

    const items = client.getAll()
    expect(items).toHaveLength(INITIAL_DASHBOARD.length + 1)
    const added = items.at(-1)
    expect(added?.type).toBe(DASHBOARD_CARD_TYPE.WEEKLY_SPENT)
    expect(added?.title).toBeNull()
    expect(added?.config).toBeNull()
  })

  it("updates a card title", () => {
    const client = new DashboardClient()
    const [first] = client.getAll()

    client.updateTitle(first.id, "My balance")

    expect(client.getById(first.id)?.title).toBe("My balance")
  })

  it("updates a card config", () => {
    const client = new DashboardClient()
    const [first] = client.getAll()
    const config = JSON.stringify({ accountId: 2 })

    client.updateConfig(first.id, config)

    expect(client.getById(first.id)?.config).toBe(config)
  })

  it("removes a card", () => {
    const client = new DashboardClient()
    const [first] = client.getAll()

    client.remove(first.id)

    expect(client.getById(first.id)).toBeUndefined()
    expect(client.getAll()).toHaveLength(INITIAL_DASHBOARD.length - 1)
  })
})
