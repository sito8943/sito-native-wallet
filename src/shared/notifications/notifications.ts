import * as Notifications from "expo-notifications"
import { Platform } from "react-native"

let configured: boolean | null = null

export async function configureNotifications(): Promise<boolean> {
  if (configured !== null) return configured

  const { status } = await Notifications.requestPermissionsAsync()
  if (status !== Notifications.PermissionStatus.GRANTED) {
    configured = false
    return false
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  })

  configured = true
  return true
}

export async function createNotification({
  title,
  short,
  body,
}: {
  title: string
  short?: string
  body: string
}): Promise<void> {
  const ok = await configureNotifications()
  if (!ok) return

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      subtitle: Platform.select({ android: short }) ?? "",
      body,
    },
    trigger: null,
  })
}
