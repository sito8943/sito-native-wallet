import { fireEvent, render } from "@testing-library/react-native"
import { Text } from "react-native"

import { LANGUAGE, translate } from "#shared/i18n"

import CardFrame from "./CardFrame"

const t = (key: Parameters<typeof translate>[1]): string =>
  translate(LANGUAGE.EN, key)

const baseProps = {
  title: null,
  placeholder: "Card title",
  onRename: jest.fn(),
  onOpenFilters: jest.fn(),
  onDelete: jest.fn(),
  activeFilters: null,
}

describe("Dashboard > CardFrame", () => {
  it("saves the trimmed title on end editing", () => {
    const onRename = jest.fn()
    const { getByPlaceholderText } = render(
      <CardFrame {...baseProps} onRename={onRename}>
        <Text>value</Text>
      </CardFrame>,
    )

    const input = getByPlaceholderText("Card title")
    fireEvent.changeText(input, "  Savings  ")
    fireEvent(input, "endEditing")

    expect(onRename).toHaveBeenCalledWith("Savings")
  })

  it("opens filters and deletes through the header buttons", () => {
    const onOpenFilters = jest.fn()
    const onDelete = jest.fn()
    const { getByLabelText } = render(
      <CardFrame
        {...baseProps}
        onOpenFilters={onOpenFilters}
        onDelete={onDelete}
      >
        <Text>value</Text>
      </CardFrame>,
    )

    fireEvent.press(getByLabelText(t("dashboard.card.filters")))
    expect(onOpenFilters).toHaveBeenCalled()

    fireEvent.press(getByLabelText(t("dashboard.card.delete.action")))
    expect(onDelete).toHaveBeenCalled()
  })
})
