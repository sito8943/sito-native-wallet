import { Tabs, useRouter } from "expo-router"
import { type ReactElement } from "react"
import { Pressable, StyleSheet } from "react-native"

import Avatar from "#design/elements/Avatar"
import Icon, { APP_ICONS } from "#design/elements/Icon"
import IconButton, {
  ICON_BUTTON_SIZE,
  ICON_BUTTON_VARIANT,
} from "#design/elements/IconButton"
import Typography from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useThemeColors } from "#design/theme"
import {
  profileInitials,
  useProfileInfo,
} from "#features/settings/components/ProfileInfo"
import { useEntitySync } from "#features/sync"
import { useI18n } from "#shared/i18n"
import { toProfileRoute } from "#shared/navigation"

export default function Layout(): ReactElement {
  const colors = useThemeColors()
  const { t } = useI18n()
  const router = useRouter()
  const { data: profile } = useProfileInfo()
  const initials = profileInitials(profile.name)
  // Pull every entity on sign-in and push local edits back, in dependency order.
  useEntitySync()
  const resolveIconColor = (color: unknown): string | undefined =>
    typeof color === "string" ? color : undefined

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t("nav.home"),
          // Real top bar via the navigation header: identity on the left,
          // notifications on the right, no centered title.
          headerStyle: { backgroundColor: colors.surface },
          headerShadowVisible: false,
          headerTitle: () => null,
          headerLeft: () => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("home.profile")}
              style={styles.headerIdentity}
              onPress={() =>
                router.push(toProfileRoute(), { withAnchor: true })
              }
            >
              <Avatar initials={initials} />
              <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
                {profile.name.trim() || t("home.greeting")}
              </Typography>
            </Pressable>
          ),
          headerRight: () => (
            <IconButton
              accessibilityLabel={t("home.notifications")}
              icon={APP_ICONS.notifications}
              iconColor={colors.textStrong}
              hitSlop={spacing(2)}
              // No notifications feature yet; visual placeholder for now.
              onPress={() => undefined}
              variant={ICON_BUTTON_VARIANT.TEXT}
              size={ICON_BUTTON_SIZE.XL}
            />
          ),
          tabBarIcon: ({ color }) => (
            <Icon
              icon={APP_ICONS.home}
              color={resolveIconColor(color)}
              size={spacing(5)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: t("nav.transactions"),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon
              icon={APP_ICONS.transactions}
              color={resolveIconColor(color)}
              size={spacing(5)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="subscriptions"
        options={{
          title: t("nav.subscriptions"),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon
              icon={APP_ICONS.subscriptions}
              color={resolveIconColor(color)}
              size={spacing(5)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("nav.settings"),
          headerShown: false,
          // Re-enter settings at its root instead of restoring the last deep
          // screen (e.g. a section reached via a deep push from another tab).
          popToTopOnBlur: true,
          tabBarIcon: ({ color }) => (
            <Icon
              icon={APP_ICONS.settings}
              color={resolveIconColor(color)}
              size={spacing(5)}
            />
          ),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  headerIdentity: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing(3),
    marginLeft: spacing(4),
  },
})
