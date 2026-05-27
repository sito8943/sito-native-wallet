import { typography } from "#design/foundations";
import { ReactNode } from "react";
import { StyleProp, TextProps, TextStyle } from "react-native";

type TypographyVariant = keyof typeof typography
type TypographyTone = "default" | "muted" | "subtle" | "inverted"

export type TypographyProps = TextProps & {
  children: ReactNode
  variant?: TypographyVariant
  tone?: TypographyTone
  style?: StyleProp<TextStyle>
}