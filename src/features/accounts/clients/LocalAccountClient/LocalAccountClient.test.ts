import AsyncStorage from "@react-native-async-storage/async-storage"

import { type Currency } from "#features/currencies"
import { SORT_ORDER } from "#shared/data"

import LocalAccountClient from "./LocalAccountClient"

const EURO: Currency = {
  id: 1,
  name: "Euro",
  symbol: "€",
  description: "Euro",
}

const transactionClient = () => {
  throw new Error("Transactions are not used by these tests")
}

describe("Accounts > LocalAccountClient", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it("orders pulled accounts by the backend updatedAt descending", async () => {
    const client = new LocalAccountClient(transactionClient)
    await client.hydrate()

    client.mergeRemote(
      [
        {
          id: 1,
          name: "Older",
          balance: 10,
          type: 1,
          currency: { id: 1 },
          updatedAt: "2026-06-20T10:00:00",
        },
        {
          id: 2,
          name: "Newer",
          balance: 20,
          type: 1,
          currency: { id: 1 },
          updatedAt: "2026-06-22T10:00:00",
        },
      ],
      () => EURO,
    )

    const result = client.list({
      pageSize: 0,
      sortingBy: "updatedAt",
      sortingOrder: SORT_ORDER.DESC,
    })

    expect(result.items.map((account) => account.remoteId)).toEqual([2, 1])
  })

  it("refreshes updatedAt without duplicating a known account", async () => {
    const client = new LocalAccountClient(transactionClient)
    await client.hydrate()
    const base = {
      id: 1,
      name: "Account",
      balance: 10,
      type: 1,
      currency: { id: 1 },
    }

    client.mergeRemote(
      [{ ...base, updatedAt: "2026-06-20T10:00:00" }],
      () => EURO,
    )
    client.mergeRemote(
      [{ ...base, updatedAt: "2026-06-22T10:00:00" }],
      () => EURO,
    )

    expect(client.getAll()).toHaveLength(1)
    expect(client.getAll()[0]?.updatedAt).toBe("2026-06-22T10:00:00")
  })
})
