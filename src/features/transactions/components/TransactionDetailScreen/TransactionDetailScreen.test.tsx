import AsyncStorage from "@react-native-async-storage/async-storage"
import { render } from "@testing-library/react-native"

import { LANGUAGE, translate } from "#shared/i18n"

import TransactionDetailScreen from "./TransactionDetailScreen"

// expo-router is only stubbed for <Link> in jest.setup; this screen also calls
// useRouter(), so provide it here.
jest.mock("expo-router", () => ({
  useRouter: () => ({ back: jest.fn(), push: jest.fn() }),
}))

describe("Transactions > TransactionDetailScreen", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it("shows a not-found message for an unknown transaction id", async () => {
    const { findByText } = render(<TransactionDetailScreen id={999999} />)

    expect(
      await findByText(translate(LANGUAGE.EN, "transactions.notFound")),
    ).toBeTruthy()
  })
})
