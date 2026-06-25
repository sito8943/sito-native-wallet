import AsyncStorage from "@react-native-async-storage/async-storage"
import { fireEvent, render } from "@testing-library/react-native"

import { LANGUAGE, translate } from "#shared/i18n"

import DashboardActionFabs from "./DashboardActionFabs"

// The global expo-router mock only exposes Link; the primary FAB calls
// useRouter().push (add-transaction action), so override it here to capture it.
const mockPush = jest.fn()
jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush }),
}))

const t = (key: Parameters<typeof translate>[1]): string =>
  translate(LANGUAGE.EN, key)

describe("Dashboard > DashboardActionFabs", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it("navigates to the new-transaction screen from the primary FAB", () => {
    const { getByLabelText } = render(<DashboardActionFabs />)

    fireEvent.press(getByLabelText(t("transactions.add")))

    expect(mockPush).toHaveBeenCalledWith("/transaction/new")
  })

  it("enters edit mode: the primary FAB becomes add-card and opens the sheet", async () => {
    const { getByLabelText, findByText } = render(<DashboardActionFabs />)

    // Tap the secondary FAB to enter edit mode.
    fireEvent.press(getByLabelText(t("dashboard.editMode.action")))

    // The primary FAB now adds a card; pressing it opens the card-type sheet
    // instead of navigating.
    fireEvent.press(getByLabelText(t("dashboard.addCard.action")))

    expect(await findByText(t("dashboard.type.typeResume"))).toBeTruthy()
    expect(mockPush).not.toHaveBeenCalled()
  })
})
