import { type ReactElement } from "react"
import { type LayoutChangeEvent } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { scheduleOnRN } from "react-native-worklets"

import Icon, { APP_ICONS } from "#design/elements/Icon"
import { radius, spacing } from "#design/foundations"
import { haptics } from "#design/interactions"
import {
  THEME_COLOR,
  useThemeColors,
  useThemedStyles,
  type ThemeColors,
} from "#design/theme"

import { HORIZONTAL_SLOP, TRIGGER_RATIO } from "./constants"
import { type SwipeableRowProps } from "./types"

// Swipe a row right to reveal a delete backdrop that grows to fill the gap, then
// commit past TRIGGER_RATIO of the width. onDelete fires on commit (callers
// confirm in a dialog); the row snaps back.
export default function SwipeableRow({
  children,
  onDelete,
  disabled = false,
}: SwipeableRowProps): ReactElement {
  const styles = useThemedStyles(createStyles)
  const colors = useThemeColors()
  const translateX = useSharedValue(0)
  const rowWidth = useSharedValue(0)
  // Buzz once per threshold crossing, not every frame.
  const armed = useSharedValue(false)

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  const backgroundStyle = useAnimatedStyle(() => ({
    width: translateX.value,
  }))

  // Bail out after all hooks have run.
  if (disabled) {
    return <>{children}</>
  }

  const onLayout = (event: LayoutChangeEvent): void => {
    rowWidth.value = event.nativeEvent.layout.width
  }

  const pan = Gesture.Pan()
    .activeOffsetX([-HORIZONTAL_SLOP, HORIZONTAL_SLOP])
    .failOffsetY([-HORIZONTAL_SLOP, HORIZONTAL_SLOP])
    .onUpdate((event) => {
      const width = rowWidth.value
      // Right swipes only, clamped to the row width.
      translateX.value = Math.max(0, Math.min(event.translationX, width))
      const passed = width > 0 && translateX.value >= width * TRIGGER_RATIO
      if (passed && !armed.value) {
        armed.value = true
        scheduleOnRN(haptics.tap)
      } else if (!passed && armed.value) {
        armed.value = false
      }
    })
    .onEnd(() => {
      if (
        rowWidth.value > 0 &&
        translateX.value >= rowWidth.value * TRIGGER_RATIO
      ) {
        scheduleOnRN(haptics.success)
        scheduleOnRN(onDelete)
      }
      armed.value = false
      translateX.value = withTiming(0)
    })

  return (
    <Animated.View style={styles.container} onLayout={onLayout}>
      <Animated.View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[styles.action, backgroundStyle]}
      >
        <Icon
          icon={APP_ICONS.delete}
          color={colors[THEME_COLOR.TEXT_INVERTED]}
        />
      </Animated.View>

      <GestureDetector gesture={pan}>
        <Animated.View style={rowStyle}>{children}</Animated.View>
      </GestureDetector>
    </Animated.View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  container: {
    justifyContent: "center" as const,
    overflow: "hidden" as const,
    borderRadius: radius.md,
  },
  action: {
    position: "absolute" as const,
    left: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "flex-start" as const,
    paddingLeft: spacing(4),
    overflow: "hidden" as const,
    backgroundColor: colors[THEME_COLOR.NEGATIVE],
  },
})
