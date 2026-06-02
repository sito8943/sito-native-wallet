import { render } from "@testing-library/react-native"
import { Text } from "react-native"

import Button from "#design/elements/Button"
import Card from "#design/elements/Card"
import Chip from "#design/elements/Chip"
import Icon, { APP_ICONS } from "#design/elements/Icon"
import IconButton from "#design/elements/IconButton"
import TextField from "#design/elements/TextField"
import Typography from "#design/elements/Typography"
import Accordion from "#design/patterns/Accordion"
import Autocomplete from "#design/patterns/Autocomplete"
import BottomSheet from "#design/patterns/BottomSheet"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import EntityCard from "#design/patterns/EntityCard"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"

import Dialog from "./patterns/Dialog/Dialog"

const noop = (): void => undefined

describe("Shared design smoke tests", () => {
  it("renders Button", () => {
    const { getByText } = render(<Button label="Save" onPress={noop} />)
    expect(getByText("Save")).toBeTruthy()
  })

  it("renders Card", () => {
    const { getByText } = render(
      <Card>
        <Text>Card body</Text>
      </Card>,
    )

    expect(getByText("Card body")).toBeTruthy()
  })

  it("renders Chip", () => {
    const { getByText } = render(
      <Chip active={false} label="Expense" onPress={noop} />,
    )

    expect(getByText("Expense")).toBeTruthy()
  })

  it("renders Icon", () => {
    expect(() => render(<Icon icon={APP_ICONS.add} />)).not.toThrow()
  })

  it("renders IconButton", () => {
    expect(() =>
      render(
        <IconButton
          accessibilityLabel="Add item"
          icon={APP_ICONS.add}
          onPress={noop}
        />,
      ),
    ).not.toThrow()
  })

  it("renders TextField", () => {
    const { getByDisplayValue } = render(
      <TextField onChangeText={noop} value="Cash" />,
    )

    expect(getByDisplayValue("Cash")).toBeTruthy()
  })

  it("renders Typography", () => {
    const { getByText } = render(<Typography>Summary</Typography>)
    expect(getByText("Summary")).toBeTruthy()
  })

  it("renders Accordion", () => {
    const { getByText } = render(
      <Accordion header={<Text>Advanced filters</Text>}>
        <Text>Accordion body</Text>
      </Accordion>,
    )

    expect(getByText("Advanced filters")).toBeTruthy()
  })

  it("renders Autocomplete", () => {
    const { getByText } = render(
      <Autocomplete
        label="Account"
        placeholder="Choose account"
        options={[
          { id: "cash", label: "Cash" },
          { id: "bank", label: "Bank" },
        ]}
        value={null}
        onChange={noop}
      />,
    )

    expect(getByText("Choose account")).toBeTruthy()
  })

  it("renders BottomSheet", () => {
    expect(() =>
      render(
        <BottomSheet open title="Picker" onClose={noop}>
          <Text>Sheet body</Text>
        </BottomSheet>,
      ),
    ).not.toThrow()
  })

  it("renders Dialog", () => {
    expect(() =>
      render(
        <Dialog open title="Delete item" onClose={noop}>
          <Text>Dialog body</Text>
        </Dialog>,
      ),
    ).not.toThrow()
  })

  it("renders ConfirmationDialog", () => {
    expect(() =>
      render(
        <ConfirmationDialog
          open
          title="Delete account"
          message="This cannot be undone."
          handleClose={noop}
          handleSubmit={noop}
        />,
      ),
    ).not.toThrow()
  })

  it("renders EntityCard", () => {
    const { getByText } = render(
      <EntityCard
        entity={{ id: "entity-1" }}
        actions={[
          {
            id: "edit",
            icon: APP_ICONS.edit,
            accessibilityLabel: "Edit entity",
            onPress: noop,
          },
        ]}
        onPress={noop}
      >
        <Text>Entity body</Text>
      </EntityCard>,
    )

    expect(getByText("Entity body")).toBeTruthy()
  })

  it("renders FAB", () => {
    const { getByText } = render(
      <FAB
        accessibilityLabel="Add transaction"
        icon={APP_ICONS.add}
        label="Add"
        onPress={noop}
      />,
    )

    expect(getByText("Add")).toBeTruthy()
  })

  it("renders Page", () => {
    const { getByText } = render(
      <Page>
        <Text>Page content</Text>
      </Page>,
    )

    expect(getByText("Page content")).toBeTruthy()
  })
})
