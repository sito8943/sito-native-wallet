import { useEffect, useState, type ReactElement } from "react"
import { Text, TextInput, View } from "react-native"

import Card from "#design/elements/Card"
import { APP_ICONS } from "#design/elements/Icon"
import IconButton, {
  ICON_BUTTON_SIZE,
  ICON_BUTTON_VARIANT,
} from "#design/elements/IconButton"
import {
  radius,
  spacing,
  typography,
  TYPOGRAPHY_VARIANT,
} from "#design/foundations"
import {
  useThemeColors,
  useThemedStyles,
  type ThemeColors,
} from "#design/theme"
import { useI18n } from "#shared/i18n"

import { type CardFrameProps } from "./types"

// Shared chrome for every dashboard card: an inline editable title (saved on
// blur), a filter button that opens the card's config sheet, a delete button,
// the active-filter chips, then the card's value.
export default function CardFrame({
  title,
  placeholder,
  onRename,
  onOpenFilters,
  onDelete,
  filterBadgeCount,
  activeFilters,
  children,
}: CardFrameProps): ReactElement {
  const { t } = useI18n()
  const colors = useThemeColors()
  const styles = useThemedStyles(createStyles)

  const [value, setValue] = useState(title ?? "")
  useEffect(() => {
    setValue(title ?? "")
  }, [title])

  const visibleFilterBadgeCount =
    filterBadgeCount !== undefined && filterBadgeCount > 0
      ? filterBadgeCount
      : null

  return (
    <Card>
      <View style={styles.header}>
        <TextInput
          style={styles.title}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.textSubtle}
          returnKeyType="done"
          onChangeText={setValue}
          onEndEditing={() => {
            onRename(value.trim())
          }}
        />
        <View style={styles.filterButton}>
          <IconButton
            accessibilityLabel={t("dashboard.card.filters")}
            icon={APP_ICONS.filter}
            variant={ICON_BUTTON_VARIANT.TEXT}
            size={ICON_BUTTON_SIZE.LG}
            color={colors.textMuted}
            onPress={onOpenFilters}
          />
          {visibleFilterBadgeCount !== null ? (
            <View
              pointerEvents="none"
              style={styles.filterBadge}
              testID="dashboard-filter-badge"
            >
              <Text style={styles.filterBadgeText}>
                {visibleFilterBadgeCount}
              </Text>
            </View>
          ) : null}
        </View>
        <IconButton
          accessibilityLabel={t("dashboard.card.delete.action")}
          icon={APP_ICONS.delete}
          variant={ICON_BUTTON_VARIANT.TEXT}
          size={ICON_BUTTON_SIZE.LG}
          color={colors.negative}
          onPress={onDelete}
        />
      </View>

      {activeFilters}

      <View style={styles.content}>{children}</View>
    </Card>
  )
}

const createStyles = (colors: ThemeColors) => ({
  header: {
    alignItems: "center" as const,
    flexDirection: "row" as const,
    gap: spacing(2),
  },
  title: {
    color: colors.textStrong,
    flex: 1,
    fontSize: typography[TYPOGRAPHY_VARIANT.TITLE].fontSize,
    fontWeight: typography[TYPOGRAPHY_VARIANT.TITLE].fontWeight,
    padding: 0,
  },
  filterButton: {
    position: "relative" as const,
  },
  filterBadge: {
    alignItems: "center" as const,
    backgroundColor: colors.negative,
    borderRadius: radius.full,
    height: spacing(5),
    justifyContent: "center" as const,
    minWidth: spacing(5),
    paddingHorizontal: spacing(1),
    position: "absolute" as const,
    right: -spacing(1),
    top: -spacing(1),
    zIndex: 1,
  },
  filterBadgeText: {
    color: colors.textInverted,
    fontSize: typography[TYPOGRAPHY_VARIANT.CAPTION].fontSize,
    fontWeight: "700" as const,
  },
  content: {
    marginTop: spacing(3),
  },
})
