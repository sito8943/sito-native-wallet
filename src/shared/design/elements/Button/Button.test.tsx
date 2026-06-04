import { render, userEvent } from "@testing-library/react-native"

import Button from "./Button"

describe("Design > Elements > Button", () => {
  it("calls onPress when the user presses it", async () => {
    const onPress = jest.fn()
    const { getByText } = render(
      <Button accessibilityLabel="Save" onPress={onPress}>
        Save
      </Button>,
    )

    await userEvent.press(getByText("Save"))

    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it("blocks presses while loading", async () => {
    const onPress = jest.fn()
    const { getByText } = render(
      <Button accessibilityLabel="Save" loading onPress={onPress}>
        Save
      </Button>,
    )

    await userEvent.press(getByText("Save"))

    expect(onPress).not.toHaveBeenCalled()
  })
})
