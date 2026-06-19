import AsyncStorage from "@react-native-async-storage/async-storage"
import { render } from "@testing-library/react-native"

import { LANGUAGE, translate } from "#shared/i18n"

import RecentTransactionsSheet from "./RecentTransactionsSheet"

const noop = (): void => undefined

describe("Dashboard > RecentTransactionsSheet", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it("shows the empty message when no transactions match", async () => {
    const { findByText } = render(
      <RecentTransactionsSheet
        open
        title="Recent"
        filters={{}}
        onClose={noop}
      />,
    )

    expect(
      await findByText(translate(LANGUAGE.EN, "transactions.empty.default")),
    ).toBeTruthy()
  })
})
