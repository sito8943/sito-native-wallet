import { useEffect, useState } from "react"
import { Keyboard } from "react-native"

import { KEYBOARD_EVENT } from "./constants"

// Tracks the on-screen keyboard height. KeyboardAvoidingView is unreliable
// inside a translucent, edge-to-edge Modal on Android, so the sheet is pushed
// up manually by the reported height.
export function useKeyboardHeight(): number {
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const show = Keyboard.addListener(KEYBOARD_EVENT.SHOW, (event) => {
      setHeight(event.endCoordinates.height)
    })
    const hide = Keyboard.addListener(KEYBOARD_EVENT.HIDE, () => {
      setHeight(0)
    })

    return () => {
      show.remove()
      hide.remove()
    }
  }, [])

  return height
}
