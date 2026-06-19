import { useCallback, useState, type ReactElement } from "react"
import {
  FlatList,
  View,
  type LayoutChangeEvent,
  type ListRenderItemInfo,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native"

import { radius, spacing } from "#design/foundations"
import { useThemedStyles, type ThemeColors } from "#design/theme"

import { type Account } from "../../Account"
import { AccountVisual } from "../AccountCard"

import { GAP, HALF_GAP, PADDING, SIDE } from "./constants"
import { type AccountCarouselProps } from "./types"

// Swipeable account cards with pagination dots. A horizontal FlatList that snaps
// per card (snapToInterval, not pagingEnabled) so each card is narrower than the
// viewport and the previous/next cards peek on both sides of the centred one —
// same pattern as OnboardingWizard otherwise (no gesture-handler dep). Swiping
// to a card selects that account.
export default function AccountCarousel({
  accounts,
  selectedId,
  onSelect,
  onPressAccount,
  action,
}: AccountCarouselProps): ReactElement {
  const styles = useThemedStyles(createStyles)

  const selectedIndex = Math.max(
    0,
    accounts.findIndex((account) => account.id === selectedId),
  )
  const [index, setIndex] = useState(selectedIndex)
  const [width, setWidth] = useState(0)

  // Card width leaves a peek inset on each side; the slot adds the gap.
  const itemWidth = width - SIDE * 2
  const interval = itemWidth + GAP

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width)
  }, [])

  const handleMomentumEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (interval <= 0) {
        return
      }
      const next = Math.round(event.nativeEvent.contentOffset.x / interval)
      setIndex(next)
      const account = accounts[next]
      if (account !== undefined && account.id !== selectedId) {
        onSelect(account.id)
      }
    },
    [accounts, interval, onSelect, selectedId],
  )

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Account>) => (
      <View style={[styles.item, { width: itemWidth }]}>
        <AccountVisual account={item} onPress={onPressAccount} />
      </View>
    ),
    [itemWidth, onPressAccount, styles.item],
  )

  return (
    <View>
      <View onLayout={handleLayout}>
        {itemWidth > 0 && (
          <FlatList
            data={accounts}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={interval}
            snapToAlignment="start"
            decelerationRate="fast"
            initialScrollIndex={selectedIndex}
            onMomentumScrollEnd={handleMomentumEnd}
            // Side padding centres the snapped card (peek on both sides).
            contentContainerStyle={styles.content}
            getItemLayout={(_data, i) => ({
              length: interval,
              offset: interval * i,
              index: i,
            })}
          />
        )}
      </View>

      <View style={styles.dotsRow}>
        <View style={styles.side} />
        <View style={styles.dots}>
          {accounts.map((account, i) => (
            <View
              key={account.id}
              style={[styles.dot, i === index && styles.dotActive]}
            />
          ))}
        </View>
        <View style={[styles.side, styles.sideEnd]}>{action}</View>
      </View>
    </View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  // Half-gap each side → full GAP between adjacent cards (width set inline).
  item: {
    marginHorizontal: HALF_GAP,
  },
  content: {
    paddingHorizontal: PADDING,
  },
  dotsRow: {
    alignItems: "center" as const,
    flexDirection: "row" as const,
    marginTop: spacing(3),
  },
  // Equal flex sides keep the dots centered while the action sits on the right.
  side: {
    flex: 1,
  },
  sideEnd: {
    alignItems: "flex-end" as const,
  },
  dots: {
    flexDirection: "row" as const,
    gap: spacing(2),
  },
  dot: {
    backgroundColor: colors.border,
    borderRadius: radius.full,
    height: spacing(2),
    width: spacing(2),
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: spacing(6),
  },
})
