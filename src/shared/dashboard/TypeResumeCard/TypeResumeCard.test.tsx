import AsyncStorage from "@react-native-async-storage/async-storage"
import { render } from "@testing-library/react-native"

import { LANGUAGE, translate } from "#shared/i18n"

import { DASHBOARD_CARD_TYPE, TYPE_RESUME_TIME } from "../DashboardCard"
import { type DashboardCard } from "../DashboardCard"

import TypeResumeCard from "./TypeResumeCard"

const noop = (): void => undefined

const card: DashboardCard = {
  id: 1,
  type: DASHBOARD_CARD_TYPE.TYPE_RESUME,
  title: null,
  config: JSON.stringify({
    account: null,
    type: 0, // income
    time: TYPE_RESUME_TIME.CURRENT_MONTH,
  }),
  position: 0,
}

describe("Dashboard > TypeResumeCard", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it("renders its active filter chips (type / time / account)", async () => {
    const { findByText } = render(<TypeResumeCard card={card} onDelete={noop} />)

    expect(
      await findByText(translate(LANGUAGE.EN, "dashboard.time.currentMonth")),
    ).toBeTruthy()
  })
})
