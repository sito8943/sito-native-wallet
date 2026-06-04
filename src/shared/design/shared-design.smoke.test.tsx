import { render } from "@testing-library/react-native"
import { Text } from "react-native"

import Button from "#design/elements/Button"
import Card from "#design/elements/Card"
import Chip from "#design/elements/Chip"
import Icon, { APP_ICONS } from "#design/elements/Icon"
import IconButton from "#design/elements/IconButton"
import LinearGradient from "#design/elements/LinearGradient"
import TextField from "#design/elements/TextField"
import Typography from "#design/elements/Typography"
import Accordion from "#design/patterns/Accordion"
import Autocomplete from "#design/patterns/Autocomplete"
import BottomSheet from "#design/patterns/BottomSheet"
import DeleteButton from "#design/patterns/DeleteButton"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import EntityCard from "#design/patterns/EntityCard"
import FAB from "#design/patterns/FAB"
import Form from "#design/patterns/Form"
import Empty from "#design/templates/Empty"
import Page from "#design/templates/Page"

import Dialog from "./patterns/Dialog/Dialog"

const noop = (): void => undefined

describe("Shared design smoke tests", () => {
  it("renders Button", () => {
    const { getByText } = render(
      <Button accessibilityLabel="Save" onPress={noop}>
        Save
      </Button>,
    )
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
          { id: 1, label: "Cash" },
          { id: 2, label: "Bank" },
        ]}
        value={0}
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
        entity={{ id: 1 }}
        actions={[
          {
            id: 2,
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

  it("renders Empty", () => {
    const { getByText } = render(
      <Empty
        message="Nothing here yet."
        actions={[
          {
            accessibilityLabel: "Create",
            children: "Create",
            onPress: noop,
          },
        ]}
      />,
    )

    expect(getByText("Nothing here yet.")).toBeTruthy()
    expect(getByText("Create")).toBeTruthy()
  })

  it("renders DeleteButton", () => {
    const { getByText } = render(<DeleteButton onPress={noop} />)
    expect(getByText("Delete")).toBeTruthy()
  })

  it("renders Form", () => {
    const { getByText } = render(
      <Form submitLabel="Save" onSubmit={noop}>
        <Text>Form field</Text>
      </Form>,
    )

    expect(getByText("Form field")).toBeTruthy()
    expect(getByText("Save")).toBeTruthy()
  })

  it("renders LinearGradient", () => {
    expect(() =>
      render(<LinearGradient colors={["#000000", "#ffffff"]} />),
    ).not.toThrow()
  })
})
