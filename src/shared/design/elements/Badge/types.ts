import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

type BadgeTone = "neutral" | "positive" | "negative"

export type BadgeProps = {
  children: ReactNode
  tone?: BadgeTone
  style?: StyleProp<ViewStyle>
}
