import { render, userEvent } from "@testing-library/react-native"

import { APP_ICONS } from "#design/elements/Icon"
import { type Action } from "#design/interactions"

import ActionMenu from "./ActionMenu"

type Row = { id: number }
const row: Row = { id: 1 }

const action = (overrides: Partial<Action<Row>>): Action<Row> => ({
  id: 1,
  icon: APP_ICONS.edit,
  accessibilityLabel: "Edit",
  onPress: jest.fn(),
  ...overrides,
})

describe("Design > Patterns > ActionMenu", () => {
  it("renders a sticky action as a visible button and fires it", async () => {
    const onPress = jest.fn()
    const { getByLabelText } = render(
      <ActionMenu
        entity={row}
        menuLabel="More actions"
        actions={[action({ accessibilityLabel: "Edit", sticky: true, onPress })]}
      />,
    )

    await userEvent.press(getByLabelText("Edit"))

    expect(onPress).toHaveBeenCalledWith(row)
  })

  it("collapses non-sticky actions behind the overflow trigger", () => {
    const { getByLabelText, queryByLabelText } = render(
      <ActionMenu
        entity={row}
        menuLabel="More actions"
        actions={[action({ id: 2, accessibilityLabel: "Delete" })]}
      />,
    )

    // The overflow trigger is shown...
    expect(getByLabelText("More actions")).toBeTruthy()
    // ...and the action itself is not inline (only inside the closed dropdown).
    expect(queryByLabelText("Delete")).toBeNull()
  })

  it("opens the dropdown and runs the chosen action", async () => {
    const onPress = jest.fn()
    const { getByLabelText, findByText } = render(
      <ActionMenu
        entity={row}
        menuLabel="More actions"
        actions={[action({ id: 3, accessibilityLabel: "Delete", onPress })]}
      />,
    )

    await userEvent.press(getByLabelText("More actions"))

    const item = await findByText("Delete")
    await userEvent.press(item)

    expect(onPress).toHaveBeenCalledWith(row)
  })

  it("skips hidden actions and renders nothing when all are hidden", () => {
    const { toJSON } = render(
      <ActionMenu
        entity={row}
        menuLabel="More actions"
        actions={[action({ hidden: true })]}
      />,
    )

    expect(toJSON()).toBeNull()
  })
})
