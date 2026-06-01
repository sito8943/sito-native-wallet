import { useEffect, useRef } from "react"
import {
  Animated,
  Dimensions,
  PanResponder,
  type PanResponderInstance,
} from "react-native"

import {
  SWIPE_ACTIVATE_OFFSET,
  SWIPE_CLOSE_DISTANCE,
  SWIPE_CLOSE_DURATION,
  SWIPE_CLOSE_VELOCITY,
} from "./constants"
import { type SwipeToClose } from "./types"

// Drag-down-to-dismiss for the sheet. PanResponder + Animated keeps it
// self-contained inside the Modal (no GestureHandlerRootView needed). The sheet
// follows the finger downward; releasing past a distance or with enough
// velocity slides it out and fires onClose, otherwise it springs back.
export function useSwipeToClose(
  open: boolean,
  onClose: () => void,
): SwipeToClose {
  const translateY = useRef(new Animated.Value(0)).current

  // Keep the latest onClose so the once-created responder never calls a stale one.
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  // Reset to the resting position whenever the sheet (re)opens.
  useEffect(() => {
    if (open) {
      translateY.setValue(0)
    }
  }, [open, translateY])

  const responderRef = useRef<PanResponderInstance | undefined>(undefined)
  const responder = (responderRef.current ??= PanResponder.create({
    // The grip is non-interactive, so claim the touch immediately — relying on
    // move-negotiation alone failed to grab over static views inside the Modal.
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_event, gesture) =>
      gesture.dy > SWIPE_ACTIVATE_OFFSET &&
      Math.abs(gesture.dy) > Math.abs(gesture.dx),
    onPanResponderMove: (_event, gesture) => {
      if (gesture.dy > 0) {
        translateY.setValue(gesture.dy)
      }
    },
    onPanResponderRelease: (_event, gesture) => {
      const shouldClose =
        gesture.dy > SWIPE_CLOSE_DISTANCE || gesture.vy > SWIPE_CLOSE_VELOCITY

      if (shouldClose) {
        Animated.timing(translateY, {
          toValue: Dimensions.get("window").height,
          duration: SWIPE_CLOSE_DURATION,
          useNativeDriver: true,
        }).start(() => {
          onCloseRef.current()
        })
        return
      }

      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start()
    },
  }))

  return { translateY, panHandlers: responder.panHandlers }
}
