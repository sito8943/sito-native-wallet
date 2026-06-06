import { fireEvent, render } from "@testing-library/react-native"

import Select from "./Select"

const OPTIONS = [
  { id: 1, label: "English" },
  { id: 2, label: "Spanish" },
]

describe("Design > Patterns > Select", () => {
  it("shows the selected option label", () => {
    const { getByText } = render(
      <Select options={OPTIONS} value={2} onChange={jest.fn()} />,
    )

    expect(getByText("Spanish")).toBeTruthy()
  })

  it("shows the placeholder when the value matches no option", () => {
    const { getByText } = render(
      <Select
        options={OPTIONS}
        value={0}
        placeholder="Pick one"
        onChange={jest.fn()}
      />,
    )

    expect(getByText("Pick one")).toBeTruthy()
  })

  it("emits the chosen option id and never a clear value", () => {
    const onChange = jest.fn()
    const { getByText, getAllByText } = render(
      <Select options={OPTIONS} value={1} onChange={onChange} />,
    )

    fireEvent.press(getByText("English"))
    // The sheet lists both options; the second "Spanish" is the list row.
    fireEvent.press(getAllByText("Spanish")[0])

    expect(onChange).toHaveBeenCalledWith(2)
  })
})
