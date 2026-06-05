import { render } from "@testing-library/react-native"

import AutoBadge from "./AutoBadge"

describe("Design > Patterns > AutoBadge", () => {
  it("shows the label by default", () => {
    const { getByText } = render(<AutoBadge />)

    expect(getByText("Automatically generated")).toBeTruthy()
  })

  it("hides the label when showLabel is false", () => {
    const { queryByText } = render(<AutoBadge showLabel={false} />)

    expect(queryByText("Automatically generated")).toBeNull()
  })
})
