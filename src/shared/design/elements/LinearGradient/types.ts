import { type StyleProp, type ViewStyle } from "react-native"

export type LinearGradientProps = {
  // Ordered color stops, spread evenly from start to end.
  colors: string[]
  // Gradient vector in unit space (0–1). Defaults to a top-left → bottom-right diagonal.
  start?: { x: number; y: number }
  end?: { x: number; y: number }
  style?: StyleProp<ViewStyle>
}
