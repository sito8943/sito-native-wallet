import { render } from "@testing-library/react-native"
import { type ReactNode } from "react"
import { Text } from "react-native"

import EntityList from "./EntityList"

// SwipeableRow pulls in native gesture/animation libs; stub them so rows render.
jest.mock("react-native-gesture-handler", () => {
  const chain = {
    activeOffsetX: () => chain,
    failOffsetY: () => chain,
    onUpdate: () => chain,
    onEnd: () => chain,
  }
  return {
    Gesture: { Pan: () => chain },
    GestureDetector: ({ children }: { children?: ReactNode }) => children,
  }
})

jest.mock("react-native-reanimated", () => {
  const { View } = jest.requireActual("react-native")
  return {
    __esModule: true,
    default: { View },
    useSharedValue: (value: unknown) => ({ value }),
    useAnimatedStyle: () => ({}),
    withTiming: (value: unknown) => value,
  }
})

jest.mock("react-native-worklets", () => ({ scheduleOnRN: jest.fn() }))

type Row = { id: number; label: string }

describe("Design > Patterns > EntityList", () => {
  it("renders an item per row via renderItem", () => {
    const data: Row[] = [
      { id: 1, label: "First" },
      { id: 2, label: "Second" },
    ]

    const { getByText } = render(
      <EntityList
        data={data}
        renderItem={(item) => <Text>{item.label}</Text>}
      />,
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

  it("renders rows whether or not onSwipeDelete enables a handler", () => {
    const data: Row[] = [
      { id: 1, label: "Swipeable" },
      { id: 2, label: "Locked" },
    ]

    const { getByText } = render(
      <EntityList
        data={data}
        renderItem={(item) => <Text>{item.label}</Text>}
        // id 2 returns undefined → not wrapped in a SwipeableRow.
        onSwipeDelete={(item) => (item.id === 1 ? jest.fn() : undefined)}
      />,
    )

    expect(getByText("Swipeable")).toBeTruthy()
    expect(getByText("Locked")).toBeTruthy()
  })
})
