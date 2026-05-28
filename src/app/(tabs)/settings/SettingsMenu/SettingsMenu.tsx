import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import { Link } from "expo-router"
import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

import { settingsMenuItems } from "./items"

export default function SettingsMenu(): ReactElement {
  return (
    <>
      {settingsMenuItems.map((item) => (
        <Link key={item.label} href={item.href} asChild>
          <Pressable>
            <Card>
              <View style={styles.row}>
                <View style={styles.left}>
                  <FontAwesome5
                    name={item.icon}
                    color={colors.textStrong}
                    size={spacing.lg}
                  />
                  <Typography>{item.label}</Typography>
                </View>
                <FontAwesome5
                  name="chevron-right"
                  color={colors.textMuted}
                  size={spacing.md}
                />
              </View>
            </Card>
          </Pressable>
        </Link>
      ))}
    </>
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
    gap: spacing.md,
  },
})
