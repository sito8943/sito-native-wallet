import { type ReactNode } from "react";
import { type StyleProp, type TextProps, type TextStyle } from "react-native";

import { type typography } from "#design/foundations";

type TypographyVariant = keyof typeof typography
type TypographyTone = "default" | "muted" | "subtle" | "inverted"

export type TypographyProps = TextProps & {
  children: ReactNode
  variant?: TypographyVariant
  tone?: TypographyTone
  style?: StyleProp<TextStyle>
}