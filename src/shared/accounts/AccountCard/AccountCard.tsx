import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import LinearGradient from "#design/elements/LinearGradient"
import Typography from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useThemeColors, useThemePreference } from "#shared/theme"

import { ACCOUNT_TYPE, ACCOUNT_TYPE_LABEL } from "../Account"

import { type AccountCardProps } from "./types"
import { getAccountCardTheme } from "./utils"

export default function AccountCard({
  account,
  onPress,
}: AccountCardProps): ReactElement {
  const colors = useThemeColors()
  const { resolvedTheme } = useThemePreference()
  const theme = getAccountCardTheme(account.bankName, resolvedTheme, colors)
  const isGradient = theme.mode === "gradient"
  const hasBank = account.bankName !== undefined
  const showBankName = hasBank && account.type === ACCOUNT_TYPE.DIGITAL
  const meta = [
    ACCOUNT_TYPE_LABEL[account.type],
    account.currency.name,
    account.currency.symbol,
  ].join(" · ")

  const content = (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: theme.background,
          // Branded (bank) cards go borderless; the plain no-bank card keeps a
          // subtle theme border to stay legible against the page.
          borderColor: theme.border,
          borderWidth: hasBank ? 0 : 1,
        },
      ]}
    >
      {isGradient && (
        <LinearGradient
          colors={[theme.accentSoft, theme.background]}
          style={StyleSheet.absoluteFill}
        />
      )}

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View
            style={[
              styles.copyBand,
              isGradient
                ? styles.copyBandPlain
                : {
                    backgroundColor: theme.highlight,
                    borderColor: theme.border,
                  },
            ]}
          >
            <View style={styles.copy}>
              {showBankName && (
                <Typography
                  variant={TYPOGRAPHY_VARIANT.CAPTION}
                  style={{ color: theme.subtleText }}
                >
                  {account.bankName}
                </Typography>
              )}
              <Typography
                variant={TYPOGRAPHY_VARIANT.TITLE}
                style={{ color: theme.text }}
              >
                {account.name}
              </Typography>
            </View>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <Typography
            variant={TYPOGRAPHY_VARIANT.CAPTION}
            style={{ color: theme.subtleText }}
          >
            {meta}
          </Typography>

          <View style={styles.amountBlock}>
            <Typography
              variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
              style={{ color: theme.text }}
            >
              {account.balance.toFixed(2)} {account.currency.symbol}
            </Typography>
          </View>
        </View>
      </View>
    </Card>
  )

  if (onPress === undefined) {
    return content
  }

  return <Pressable onPress={() => onPress(account)}>{content}</Pressable>
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    padding: spacing(0),
  },
  content: {
    // Height authority lives here, not on the card: `flex: 1` collapses to the
    // card's minHeight inside a bounded parent (account details) and clips the
    // bottom row, while growing freely inside a ScrollView (accounts list).
    // A minHeight + space-between behaves the same in both.
    justifyContent: "space-between",
    minHeight: spacing(40),
  },
  topRow: {
    marginHorizontal: -spacing(4),
    marginTop: -spacing(4),

    padding: spacing(4),
  },
  copyBand: {
    borderBottomWidth: 1,
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(3),
    width: "100%",
  },
  copyBandPlain: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  copy: {
    gap: spacing(2),
  },
  bottomRow: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: spacing(4),
    justifyContent: "space-between",
    marginTop: spacing(16),
    paddingTop: spacing(4),
    paddingBottom: spacing(2),
    paddingHorizontal: spacing(4),
  },
  metaGroup: {
    flex: 1,
  },
  amountBlock: {
    alignItems: "flex-end",
    gap: spacing(1),
  },
})
