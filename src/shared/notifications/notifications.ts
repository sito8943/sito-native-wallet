import type * as ExpoNotifications from "expo-notifications"
import { Platform } from "react-native"

type NotificationsModule = typeof ExpoNotifications
let notificationsModule: NotificationsModule | null = null
let configured = false
let attemptedConfiguration = false

async function loadNotificationsModule(): Promise<NotificationsModule | null> {
  try {
    return await import("expo-notifications")
  } catch {
    return null
  }
}

async function configureNotifications(): Promise<NotificationsModule | null> {
  if (attemptedConfiguration) {
    return configured ? notificationsModule : null
  }
  attemptedConfiguration = true

  const Notifications = await loadNotificationsModule()
  if (!Notifications) {
    return null
  }

  const { granted } = await Notifications.requestPermissionsAsync()
  if (!granted) {
    return null
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
  notificationsModule = Notifications
  return Notifications
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
  const Notifications = await configureNotifications()
  if (!Notifications) return

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      subtitle: Platform.select({ android: short }) ?? "",
      body,
    },
    trigger: null,
  })
}
