import { type ReactElement, useEffect, useState } from "react"
import { Animated, StyleSheet } from "react-native"

import Typography from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useThemeColors } from "#design/theme"

import { accountMeta } from "../Account"
import { AccountCard } from "../AccountCard"

import { type CollapsibleAccountHeaderProps } from "./types"

// A sticky, scroll-linked account header for the account-details screen. It
// floats above the transactions list and, as the user scrolls, shrinks the full
// AccountCard down to a compact bar (meta + balance) so transactions get the
// space. The collapse is purely visual — the owner pads the list by the
// expanded height so content meets the header edge with no gap (the height
// shrinks 1:1 with the scroll offset over the collapse range).
export default function CollapsibleAccountHeader({
  account,
  actions,
  scrollY,
  expandedHeight,
  collapsedHeight,
  onMeasure,
}: CollapsibleAccountHeaderProps): ReactElement {
  const colors = useThemeColors()
  // The full card layer keeps capturing taps (its action menu) only while
  // visible; once collapsed it must let taps reach the transactions beneath.
  const [collapsed, setCollapsed] = useState(false)

  const range = Math.max(expandedHeight - collapsedHeight, 1)

  useEffect(() => {
    const id = scrollY.addListener(({ value }) => {
      setCollapsed(value >= range * 0.5)
    })
    return () => scrollY.removeListener(id)
  }, [scrollY, range])

  const height = scrollY.interpolate({
    inputRange: [0, range],
    outputRange: [expandedHeight, collapsedHeight],
    extrapolate: "clamp",
  })
  const fullOpacity = scrollY.interpolate({
    inputRange: [0, range * 0.5],
    outputRange: [1, 0],
    extrapolate: "clamp",
  })
  const compactOpacity = scrollY.interpolate({
    inputRange: [range * 0.4, range],
    outputRange: [0, 1],
    extrapolate: "clamp",
  })

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: colors.background, height }]}
    >
      <Animated.View
        style={[styles.fullLayer, { opacity: fullOpacity }]}
        pointerEvents={collapsed ? "none" : "auto"}
        onLayout={onMeasure}
      >
        <AccountCard account={account} actions={actions} />
      </Animated.View>

      <Animated.View
        style={[
          styles.compactBar,
          { height: collapsedHeight, opacity: compactOpacity },
        ]}
        pointerEvents="none"
      >
        <Typography variant={TYPOGRAPHY_VARIANT.BODY_STRONG} numberOfLines={1}>
          {accountMeta(account)}
        </Typography>
        <Typography variant={TYPOGRAPHY_VARIANT.BODY_STRONG}>
          {account.balance.toFixed(2)} {account.currency.symbol}
        </Typography>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    left: 0,
    overflow: "hidden",
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
  },
  // Absolute with no bottom so its laid-out height is the natural card height,
  // which onMeasure reports back to the owner for list padding. paddingTop
  // gives the card breathing room below the nav header; it's baked into the
  // measured height so list padding and the collapse range stay in sync.
  fullLayer: {
    left: 0,
    padding: spacing(4),
    paddingBottom: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  compactBar: {
    alignItems: "center",
    bottom: 0,
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(2),
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    position: "absolute",
    right: 0,
  },
})
