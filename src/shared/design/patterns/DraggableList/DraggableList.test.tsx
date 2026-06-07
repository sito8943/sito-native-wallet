import { render } from "@testing-library/react-native"
import { type ReactNode } from "react"
import { Text } from "react-native"

import DraggableList from "./DraggableList"

// Gesture + animation libs are native-bound; stub them so the component renders
// in JSDOM. We assert structure/children, not the gesture itself.
jest.mock("react-native-gesture-handler", () => {
  const chain = {
    activateAfterLongPress: () => chain,
    onStart: () => chain,
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

jest.mock("#design/interactions", () => ({
  haptics: { tap: jest.fn() },
}))

type Row = { id: string; label: string }

const DATA: Row[] = [
  { id: "a", label: "Balance" },
  { id: "b", label: "Income" },
  { id: "c", label: "Expenses" },
]

describe("Design > Patterns > DraggableList", () => {
  it("renders the header and a row per item", () => {
    const { getByText } = render(
      <DraggableList
        data={DATA}
        header={<Text>Your cards</Text>}
        keyExtractor={(item) => item.id}
        onReorder={jest.fn()}
        renderItem={(item) => <Text>{item.label}</Text>}
      />,
    )

    expect(getByText("Your cards")).toBeTruthy()
    expect(getByText("Balance")).toBeTruthy()
    expect(getByText("Income")).toBeTruthy()
    expect(getByText("Expenses")).toBeTruthy()
  })
})
