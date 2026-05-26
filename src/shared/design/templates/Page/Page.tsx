import { type ReactElement, type ReactNode } from "react"
import {
  ScrollView,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { colors, spacing } from "#design/foundations"

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
  if (scroll) {
    return (
      <SafeAreaView style={[styles.page, style]}>
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
    <SafeAreaView style={[styles.page, style]}>
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
    backgroundColor: colors.background,
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
