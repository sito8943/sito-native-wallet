import { type ReactElement } from "react"
import { type LayoutChangeEvent } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
import { scheduleOnRN } from "react-native-worklets"

import { haptics } from "#design/interactions"

import { LONG_PRESS_MS, SHIFT_DURATION_MS } from "./constants"
import { type DraggableRowProps } from "./types"

export function DraggableRow({
  index,
  count,
  gap,
  activeIndex,
  translationY,
  stride,
  onMeasure,
  onDragStart,
  onDrop,
  children,
}: DraggableRowProps): ReactElement {
  const style = useAnimatedStyle(() => {
    const active = activeIndex.value
    if (active === -1) {
      return { transform: [{ translateY: 0 }], zIndex: 0 }
    }
    if (index === active) {
      // The dragged row follows the finger and lifts above the rest.
      return { transform: [{ translateY: translationY.value }], zIndex: 20 }
    }

    const step = stride.value
    const hover =
      step > 0
        ? Math.max(
            0,
            Math.min(count - 1, active + Math.round(translationY.value / step)),
          )
        : active
    let shift = 0
    if (index > active && index <= hover) {
      shift = -step
    } else if (index < active && index >= hover) {
      shift = step
    }

    return {
      transform: [
        { translateY: withTiming(shift, { duration: SHIFT_DURATION_MS }) },
      ],
      zIndex: 0,
    }
  })

  const pan = Gesture.Pan()
    .activateAfterLongPress(LONG_PRESS_MS)
    .onStart(() => {
      activeIndex.value = index
      scheduleOnRN(onDragStart)
      scheduleOnRN(haptics.tap)
    })
    .onUpdate((event) => {
      translationY.value = event.translationY
    })
    .onEnd(() => {
      const step = stride.value
      const to =
        step > 0
          ? Math.max(
              0,
              Math.min(
                count - 1,
                index + Math.round(translationY.value / step),
              ),
            )
          : index
      scheduleOnRN(onDrop, index, to)
      activeIndex.value = -1
      translationY.value = 0
    })

  const handleLayout = (event: LayoutChangeEvent): void => {
    onMeasure?.(event.nativeEvent.layout.height)
  }

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[{ marginBottom: gap }, style]}
        onLayout={handleLayout}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  )
}
