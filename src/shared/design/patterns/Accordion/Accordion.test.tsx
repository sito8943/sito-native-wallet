import { render, userEvent } from "@testing-library/react-native"
import { Text } from "react-native"

import Accordion from "./Accordion"

describe("Design > Patterns > Accordion", () => {
  it("toggles its content when pressed", async () => {
    const { getByRole, queryByText } = render(
      <Accordion header={<Text>Advanced filters</Text>}>
        <Text>Hidden content</Text>
      </Accordion>,
    )

    expect(queryByText("Hidden content")).toBeNull()

    const trigger = getByRole("button")

    await userEvent.press(trigger)
    expect(queryByText("Hidden content")).toBeTruthy()

    await userEvent.press(trigger)
    expect(queryByText("Hidden content")).toBeNull()
  })
})
