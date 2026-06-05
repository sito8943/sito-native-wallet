import { render } from "@testing-library/react-native"
import { Text } from "react-native"

import EntityList from "./EntityList"

type Row = { id: number; label: string }

describe("Design > Patterns > EntityList", () => {
  it("renders an item per row via renderItem", () => {
    const data: Row[] = [
      { id: 1, label: "First" },
      { id: 2, label: "Second" },
    ]

    const { getByText } = render(
      <EntityList data={data} renderItem={(item) => <Text>{item.label}</Text>} />,
    )

    expect(getByText("First")).toBeTruthy()
    expect(getByText("Second")).toBeTruthy()
  })

  it("shows the empty message when there is no data", () => {
    const { getByText } = render(
      <EntityList<Row>
        data={[]}
        emptyMessage="No accounts yet"
        renderItem={(item) => <Text>{item.label}</Text>}
      />,
    )

    expect(getByText("No accounts yet")).toBeTruthy()
  })
})
