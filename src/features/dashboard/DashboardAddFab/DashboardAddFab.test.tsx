import AsyncStorage from "@react-native-async-storage/async-storage"
import { fireEvent, render } from "@testing-library/react-native"

import { LANGUAGE, translate } from "#shared/i18n"

import DashboardAddFab from "./DashboardAddFab"

const t = (key: Parameters<typeof translate>[1]): string =>
  translate(LANGUAGE.EN, key)

describe("Dashboard > DashboardAddFab", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it("opens the add-card sheet when pressed", async () => {
    const { getByLabelText, findByText } = render(<DashboardAddFab />)

    // The sheet (and its card-type options) is closed until the FAB is tapped.
    fireEvent.press(getByLabelText(t("dashboard.addCard.action")))

    expect(await findByText(t("dashboard.type.typeResume"))).toBeTruthy()
  })
})
