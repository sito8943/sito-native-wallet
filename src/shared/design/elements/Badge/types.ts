import { type ReactNode } from "react";
import { type StyleProp, type ViewStyle } from "react-native";

type BadgeTone = "neutral" | "positive" | "negative"

export type BadgeProps = {
  children: ReactNode
  tone?: BadgeTone
  style?: StyleProp<ViewStyle>
}
