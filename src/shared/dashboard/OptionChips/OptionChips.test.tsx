import { fireEvent, render } from "@testing-library/react-native"

import OptionChips from "./OptionChips"

const options = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
]

describe("Dashboard > OptionChips", () => {
  it("fires onSelect with the pressed option's value", () => {
    const onSelect = jest.fn()
    const { getByText } = render(
      <OptionChips options={options} value="a" onSelect={onSelect} />,
    )

    fireEvent.press(getByText("Beta"))

    expect(onSelect).toHaveBeenCalledWith("b")
  })

  it("renders every option label", () => {
    const { getByText } = render(
      <OptionChips options={options} value="a" onSelect={jest.fn()} />,
    )

    expect(getByText("Alpha")).toBeTruthy()
    expect(getByText("Beta")).toBeTruthy()
  })
})
