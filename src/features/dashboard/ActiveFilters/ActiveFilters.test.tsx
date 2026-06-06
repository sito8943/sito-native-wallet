import { fireEvent, render } from "@testing-library/react-native"

import ActiveFilters from "./ActiveFilters"

describe("Dashboard > ActiveFilters", () => {
  it("renders a chip per label", () => {
    const { getByText } = render(
      <ActiveFilters labels={["Income", "This month"]} onPress={jest.fn()} />,
    )

    expect(getByText("Income")).toBeTruthy()
    expect(getByText("This month")).toBeTruthy()
  })

  it("reopens the config sheet when a chip is pressed", () => {
    const onPress = jest.fn()
    const { getByText } = render(
      <ActiveFilters labels={["Income"]} onPress={onPress} />,
    )

    fireEvent.press(getByText("Income"))

    expect(onPress).toHaveBeenCalled()
  })
})
