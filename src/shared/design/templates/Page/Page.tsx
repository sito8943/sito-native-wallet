import { type ReactElement, type ReactNode } from "react"
import { ScrollView, type StyleProp, View, type ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { spacing } from "#design/foundations"
import { useThemedStyles, type ThemeColors } from "#shared/theme"

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
  const styles = useThemedStyles(createStyles)

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

const createStyles = (colors: ThemeColors) => ({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  fill: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingVertical: spacing[2],
  },
  centeredContent: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
})
