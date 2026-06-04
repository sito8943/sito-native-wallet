import { type ReactElement } from "react"
import { View } from "react-native"

import Typography from "#design/elements/Typography"
import {
  borderWidth,
  radius,
  spacing,
  TYPOGRAPHY_VARIANT,
} from "#design/foundations"
import EntityCard from "#design/patterns/EntityCard"

import { type ThemeColors, useThemedStyles } from "#design/theme"

import { type CurrencyCardProps } from "./types"

export default function CurrencyCard({
  currency,
  actions,
  style,
  onPress,
}: CurrencyCardProps): ReactElement {
  const styles = useThemedStyles(createStyles)

  return (
    <EntityCard
      style={style}
      actions={actions}
      entity={currency}
      onPress={onPress}
    >
      <View style={styles.row}>
        <View>
          <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
            {currency.name}
          </Typography>
          {currency.description && (
            <Typography variant={TYPOGRAPHY_VARIANT.BODY}>
              {currency.description}
            </Typography>
          )}
        </View>
        <Typography variant={TYPOGRAPHY_VARIANT.SUBTLE} style={styles.symbol}>
          {currency.symbol}
        </Typography>
      </View>
    </EntityCard>
  )
}

const createStyles = (colors: ThemeColors) => ({
  row: {
    alignItems: "flex-start" as const,
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
  },
  symbol: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.full,
    borderWidth: borderWidth.thin,
    paddingHorizontal: spacing(2),
    paddingTop: spacing(0.5),
  },
})
