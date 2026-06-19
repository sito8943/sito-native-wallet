import { Link } from "expo-router"
import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Icon, { APP_ICONS } from "#design/elements/Icon"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import { useThemeColors } from "#design/theme"
import { AuthMenuCard } from "#features/auth"
import { useI18n } from "#shared/i18n"

import { settingsMenuItems } from "./items"

export default function SettingsMenu(): ReactElement {
  const colors = useThemeColors()
  const { t } = useI18n()

  return (
    <View style={styles.container}>
      <AuthMenuCard />

      {settingsMenuItems.map((item) => (
        <Link key={item.labelKey} href={item.href} asChild>
          <Pressable>
            <Card>
              <View style={styles.row}>
                <View style={styles.left}>
                  <Icon
                    icon={item.icon}
                    color={colors.textStrong}
                    size={spacing(5)}
                  />
                  <Typography>{t(item.labelKey)}</Typography>
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
      ))}
    </View>
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
  container: {
    gap: spacing(4),
  },
})
