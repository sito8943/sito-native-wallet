import { fireEvent, render } from "@testing-library/react-native"

import ActiveFilters from "./ActiveFilters"

describe("Dashboard > ActiveFilters", () => {
  it("renders a chip per item", () => {
    const { getByText } = render(
      <ActiveFilters
        items={[{ label: "Income" }, { label: "This month" }]}
        onPress={jest.fn()}
      />,
    )

    expect(getByText("Income")).toBeTruthy()
    expect(getByText("This month")).toBeTruthy()
  })

  it("reopens the config sheet when a chip is pressed", () => {
    const onPress = jest.fn()
    const { getByText } = render(
      <ActiveFilters items={[{ label: "Income" }]} onPress={onPress} />,
    )

    fireEvent.press(getByText("Income"))

    expect(onPress).toHaveBeenCalled()
  })

  it("clears just that filter via its × when onClear is set", () => {
    const onClear = jest.fn()
    const { getByRole } = render(
      <ActiveFilters items={[{ label: "Cash", onClear }]} onPress={jest.fn()} />,
    )

    fireEvent.press(getByRole("button"))

    expect(onClear).toHaveBeenCalled()
  })
})
