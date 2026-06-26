import AsyncStorage from "@react-native-async-storage/async-storage"
import { render } from "@testing-library/react-native"

import { LANGUAGE, translate } from "#shared/i18n"

import CategoryBreakdownSheet from "./CategoryBreakdownSheet"

const noop = (): void => undefined

describe("Dashboard > CategoryBreakdownSheet", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it("shows the empty message when no transactions match", async () => {
    const { findByText } = render(
      <CategoryBreakdownSheet
        open
        title="By category"
        symbol="€"
        filters={{}}
        onClose={noop}
      />,
    )

    expect(
      await findByText(translate(LANGUAGE.EN, "transactions.empty.default")),
    ).toBeTruthy()
  })
})
