import { type ReactElement, type ReactNode } from "react"
import {
  type StyleProp,
  StyleSheet,
  Text,
  type TextProps,
  type TextStyle,
} from "react-native"

import { colors, typography } from "#design/foundations"

type TypographyVariant = keyof typeof typography
type TypographyTone = "default" | "muted" | "subtle" | "inverted"

export type TypographyProps = TextProps & {
  children: ReactNode
  variant?: TypographyVariant
  tone?: TypographyTone
  style?: StyleProp<TextStyle>
}

export default function Typography({
  children,
  variant = "body",
  tone = "default",
  style,
  ...props
}: TypographyProps): ReactElement {
  return (
    <Text {...props} style={[styles[variant], toneStyles[tone], style]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create(typography)

const toneStyles = StyleSheet.create({
  default: {},
  muted: {
    color: colors.textMuted,
  },
  subtle: {
    color: colors.textSubtle,
  },
  inverted: {
    color: colors.textInverted,
  },
})
