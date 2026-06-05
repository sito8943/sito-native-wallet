import { render } from "@testing-library/react-native"
import { type ReactNode } from "react"
import { Text, View, type ViewProps } from "react-native"

import SwipeableRow from "./SwipeableRow"

// Gesture + animation libs are native-bound; stub them so the component renders
// in JSDOM. We assert structure/children, not the gesture itself.
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
  const { View: RNView } = jest.requireActual("react-native")
  return {
    __esModule: true,
    default: { View: RNView },
    useSharedValue: (value: unknown) => ({ value }),
    useAnimatedStyle: () => ({}),
    withTiming: (value: unknown) => value,
    interpolate: () => 0,
  }
})

jest.mock("react-native-worklets", () => ({
  scheduleOnRN: jest.fn(),
}))

describe("Design > Patterns > SwipeableRow", () => {
  it("renders its child row", () => {
    const { getByText } = render(
      <SwipeableRow onDelete={jest.fn()}>
        <Text>Row content</Text>
      </SwipeableRow>,
    )

    expect(getByText("Row content")).toBeTruthy()
  })

  it("renders children without a swipe affordance when disabled", () => {
    const Child = (props: ViewProps) => <View {...props} testID="child" />

    const { getByTestId } = render(
      <SwipeableRow onDelete={jest.fn()} disabled>
        <Child />
      </SwipeableRow>,
    )

    expect(getByTestId("child")).toBeTruthy()
  })
})
