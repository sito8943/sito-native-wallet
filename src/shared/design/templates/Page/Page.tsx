import { type ReactElement, type ReactNode } from "react"
import {
  ScrollView,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { spacing } from "#design/foundations"
import { useThemeColors } from "#shared/theme"

export type PageProps = {
  children: ReactNode
  scroll?: boolean
  centered?: boolean
  style?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
}

export default function Page({
  children,
  scroll = false,
  centered = false,
  style,
  contentContainerStyle,
}: PageProps): ReactElement {
  const colors = useThemeColors()

  if (scroll) {
    return (
      <SafeAreaView
        style={[styles.page, { backgroundColor: colors.background }, style]}
      >
        <ScrollView
          contentContainerStyle={[
            styles.content,
            centered && styles.centeredContent,
            contentContainerStyle,
          ]}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView
      style={[styles.page, { backgroundColor: colors.background }, style]}
    >
      <View
        style={[
          styles.content,
          styles.fill,
          centered && styles.centeredContent,
          contentContainerStyle,
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  fill: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingVertical: spacing.xs,
  },
  centeredContent: {
    alignItems: "center",
    justifyContent: "center",
  },
})
