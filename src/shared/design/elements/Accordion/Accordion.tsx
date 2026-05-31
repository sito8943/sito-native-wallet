import { type ReactElement, useState } from "react"
import { Pressable, View } from "react-native"

import Icon, { APP_ICONS } from "#design/elements/Icon"
import { spacing } from "#design/foundations"
import { useThemedStyles, type ThemeColors } from "#shared/theme"

import { type AccordionProps } from "./types"

export default function Accordion({
  header,
  children,
  defaultExpanded = false,
  style,
}: AccordionProps): ReactElement {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const styles = useThemedStyles(createStyles)

  return (
    <View style={style}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={() => setExpanded((current) => !current)}
        style={styles.header}
      >
        <View style={styles.headerContent}>{header}</View>
        <Icon
          icon={expanded ? APP_ICONS.chevronUp : APP_ICONS.chevronDown}
          style={styles.chevron}
        />
      </Pressable>

      {expanded && <View style={styles.body}>{children}</View>}
    </View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  header: {
    alignItems: "center" as const,
    flexDirection: "row" as const,
    gap: spacing[3],
    justifyContent: "space-between" as const,
  },
  headerContent: {
    flex: 1,
  },
  chevron: {
    color: colors.textMuted,
  },
  body: {
    marginTop: spacing[3],
  },
})
