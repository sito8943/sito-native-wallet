import { Link } from "expo-router"
import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Icon, { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"

import { useSession } from "../session"

// Settings entry for auth: a "Sign in" link when browsing as a guest, or the
// signed-in account + a "Sign out" action when authenticated.
export default function AuthMenuCard(): ReactElement {
  const { t } = useI18n()
  const colors = useThemeColors()
  const { account, isAuthenticated, logout } = useSession()

  if (!isAuthenticated) {
    return (
      <Link href="/sign-in" asChild>
        <Pressable>
          <Card>
            <View style={styles.row}>
              <View style={styles.left}>
                <Icon
                  icon={APP_ICONS.login}
                  color={colors.textStrong}
                  size={spacing(5)}
                />
                <Typography>{t("settings.menu.signIn")}</Typography>
              </View>
              <Icon
                icon={APP_ICONS.chevronRight}
                color={colors.textMuted}
                size={spacing(4)}
              />
            </View>
          </Card>
        </Pressable>
      </Link>
    )
  }

  return (
    <Card>
      <View style={styles.identity}>
        <Typography
          variant={TYPOGRAPHY_VARIANT.CAPTION}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          {t("auth.signedInAs")}
        </Typography>
        <Typography>{account?.email ?? ""}</Typography>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t("auth.signOut")}
        onPress={() => {
          void logout()
        }}
        style={styles.signOut}
      >
        <Icon
          icon={APP_ICONS.logout}
          color={colors.negative}
          size={spacing(5)}
        />
        <Typography style={{ color: colors.negative }}>
          {t("auth.signOut")}
        </Typography>
      </Pressable>
    </Card>
  )
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing(4),
  },
  identity: {
    gap: spacing(1),
    marginBottom: spacing(4),
  },
  signOut: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing(4),
  },
})
