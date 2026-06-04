import { type ReactElement, type ReactNode } from "react"
import { ScrollView, type StyleProp, View, type ViewStyle } from "react-native"
import { type Edge, SafeAreaView } from "react-native-safe-area-context"

import { spacing } from "#design/foundations"
import { useThemedStyles, type ThemeColors } from "#design/theme"

export type PageProps = {
  children: ReactNode
  scroll?: boolean
  centered?: boolean
  // Most screens sit under a navigator header that already provides the top
  // safe-area inset, so adding it again here just leaves a dead gap. Headerless
  // screens (e.g. Home) opt back in with `topInset`.
  topInset?: boolean
  // Off by default so content flows edge-to-edge under the tab bar. Screens
  // with no tab bar (or that need the home-indicator clearance) opt in.
  bottomInset?: boolean
  style?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
}

export default function Page({
  children,
  scroll = false,
  centered = false,
  topInset = false,
  bottomInset = false,
  style,
  contentContainerStyle,
}: PageProps): ReactElement {
  const styles = useThemedStyles(createStyles)
  const edges: Edge[] = ["left", "right"]

  if (topInset) {
    edges.push("top")
  }

  if (bottomInset) {
    edges.push("bottom")
  }

  if (scroll) {
    return (
      <SafeAreaView edges={edges} style={[styles.page, style]}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
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
    <SafeAreaView edges={edges} style={[styles.page, style]}>
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
    paddingHorizontal: spacing(4),
    gap: spacing(4),
    paddingVertical: spacing(6),
  },
  centeredContent: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
})
