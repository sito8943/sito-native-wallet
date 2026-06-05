import * as Haptics from "expo-haptics"
import { Platform } from "react-native"

import { haptics } from "./haptics"

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(() => Promise.resolve()),
  selectionAsync: jest.fn(() => Promise.resolve()),
  notificationAsync: jest.fn(() => Promise.resolve()),
  ImpactFeedbackStyle: { Light: "light", Medium: "medium" },
  NotificationFeedbackType: { Success: "success", Warning: "warning" },
}))

describe("Design > Interactions > haptics", () => {
  afterEach(() => {
    jest.clearAllMocks()
    Platform.OS = "ios"
  })

  it("maps each intent to its expo-haptics call", () => {
    haptics.tap()
    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Light,
    )

    haptics.select()
    expect(Haptics.selectionAsync).toHaveBeenCalledTimes(1)

    haptics.success()
    expect(Haptics.notificationAsync).toHaveBeenCalledWith(
      Haptics.NotificationFeedbackType.Success,
    )

    haptics.warning()
    expect(Haptics.notificationAsync).toHaveBeenCalledWith(
      Haptics.NotificationFeedbackType.Warning,
    )
  })

  it("skips haptics entirely on web", () => {
    Platform.OS = "web"

    haptics.tap()
    haptics.select()
    haptics.success()

    expect(Haptics.impactAsync).not.toHaveBeenCalled()
    expect(Haptics.selectionAsync).not.toHaveBeenCalled()
    expect(Haptics.notificationAsync).not.toHaveBeenCalled()
  })

  it("never throws when the underlying effect rejects", () => {
    ;(Haptics.impactAsync as jest.Mock).mockRejectedValueOnce(
      new Error("Low Power Mode"),
    )

    expect(() => haptics.tap()).not.toThrow()
  })
})
