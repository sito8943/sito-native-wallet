import * as Haptics from "expo-haptics"
import { Platform } from "react-native"

// Intent-named wrapper over expo-haptics. Best-effort: skips web and swallows
// errors (e.g. iOS Low Power Mode) so a missing buzz never breaks an action.
function run(effect: () => Promise<void>): void {
  if (Platform.OS === "web") {
    return
  }

  void effect().catch(() => {
    // best-effort
  })
}

export const haptics = {
  tap: (): void =>
    run(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),
  select: (): void => run(() => Haptics.selectionAsync()),
  success: (): void =>
    run(() =>
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
    ),
  warning: (): void =>
    run(() =>
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
    ),
}
