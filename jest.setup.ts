import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock"
import {
  createElement,
  Fragment,
  type PropsWithChildren,
  type ReactNode,
} from "react"
import { Text, View, type ViewProps } from "react-native"

const mockThemeColors = {
  background: "#f3f4f6",
  surface: "#ffffff",
  border: "#d1d5db",
  textStrong: "#111827",
  textMuted: "#6b7280",
  textSubtle: "#9ca3af",
  textInverted: "#ffffff",
  positive: "#15803d",
  negative: "#dc2626",
  primary: "#2563eb",
  overlay: "rgba(17, 24, 39, 0.45)",
}

const mockCreateElement = createElement
const mockFragment = Fragment
const mockText = Text
const mockView = View

jest.mock("#design/theme", () => ({
  RESOLVED_THEME: {
    LIGHT: "light",
    DARK: "dark",
  },
  THEME_COLOR: {
    BACKGROUND: "background",
    SURFACE: "surface",
    BORDER: "border",
    TEXT_STRONG: "textStrong",
    TEXT_MUTED: "textMuted",
    TEXT_SUBTLE: "textSubtle",
    TEXT_INVERTED: "textInverted",
    POSITIVE: "positive",
    NEGATIVE: "negative",
    PRIMARY: "primary",
    OVERLAY: "overlay",
  },
  THEME_PREFERENCE: {
    LIGHT: "light",
    DARK: "dark",
    SYSTEM: "system",
  },
  ThemeProvider: ({ children }: { children?: ReactNode }) => children,
  useThemedStyles: (factory: (colors: typeof mockThemeColors) => unknown) =>
    factory(mockThemeColors),
  useThemeColors: () => mockThemeColors,
  useThemePreference: () => ({
    isLoading: false,
    preference: "light",
    resolvedTheme: "light",
    setPreference: jest.fn(),
    togglePreference: jest.fn(),
  }),
}))

jest.mock("expo-router", () => ({
  Link: ({ children }: { children?: ReactNode }) =>
    mockCreateElement(mockFragment, null, children),
}))

jest.mock("react-native-safe-area-context", () => {
  return {
    SafeAreaProvider: ({ children }: { children?: ReactNode }) => children,
    SafeAreaView: ({ children, ...props }: PropsWithChildren<ViewProps>) =>
      mockCreateElement(mockView, props, children),
    useSafeAreaInsets: () => ({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }),
  }
})

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => mockCreateElement(mockText, null, "icon"),
}))

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage)

jest.mock("react-native-reanimated", () => {
  // const React = jest.requireActual("react")
  const { View: RNView } = jest.requireActual("react-native")
  const createAnimatedComponent = (Component: React.ComponentType<unknown>) =>
    Component
  return {
    __esModule: true,
    default: {
      View: RNView,
      createAnimatedComponent,
    },
    createAnimatedComponent,
    useSharedValue: (value: unknown) => ({ value }),
    useAnimatedStyle: () => ({}),
    withTiming: (value: unknown) => value,
    interpolate: () => 0,
  }
})

jest.mock("react-native-worklets", () => ({
  scheduleOnRN: jest.fn(),
}))

jest.mock("react-native-gesture-handler", () => {
  const chain = {
    activateAfterLongPress: () => chain,
    activeOffsetX: () => chain,
    failOffsetY: () => chain,
    onStart: () => chain,
    onUpdate: () => chain,
    onEnd: () => chain,
  }
  return {
    Gesture: { Pan: () => chain },
    GestureDetector: ({ children }: { children?: ReactNode }) => children,
    GestureHandlerRootView: ({ children }: { children?: ReactNode }) =>
      children,
  }
})
