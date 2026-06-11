import { fireEvent, render } from "@testing-library/react-native"

import { LANGUAGE, translate } from "#shared/i18n"

import { DASHBOARD_CARD_TYPE } from "../../cards/DashboardCard"

import AddCardSheet from "./AddCardSheet"

const t = (key: Parameters<typeof translate>[1]): string =>
  translate(LANGUAGE.EN, key)

describe("Dashboard > AddCardSheet", () => {
  it("offers a button per card type when open", () => {
    const { getByText } = render(
      <AddCardSheet open onClose={jest.fn()} onSelect={jest.fn()} />,
    )

    expect(getByText(t("dashboard.type.currentBalance"))).toBeTruthy()
    expect(getByText(t("dashboard.type.typeResume"))).toBeTruthy()
  })

  it("reports the chosen card type", () => {
    const onSelect = jest.fn()
    const { getByText } = render(
      <AddCardSheet open onClose={jest.fn()} onSelect={onSelect} />,
    )

    fireEvent.press(getByText(t("dashboard.type.typeResume")))

    expect(onSelect).toHaveBeenCalledWith(DASHBOARD_CARD_TYPE.TYPE_RESUME)
  })
})
