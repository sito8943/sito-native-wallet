import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Chip from "#design/elements/Chip"
import Typography from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useI18n } from "#shared/i18n"

import { type CardDisplaySectionProps } from "./types"

// Shared "VISUALIZACIÓN" section for every dashboard card's filter sheet: the
// base "show filters as badge" toggle plus any card-specific display toggles
// (passed as children). Centralises the section so cards don't each rebuild it.
export default function CardDisplaySection({
  showFiltersAsBadge,
  onToggleFiltersBadge,
  children,
}: CardDisplaySectionProps): ReactElement {
  const { t } = useI18n()

  return (
    <View style={styles.section}>
      <Typography variant={TYPOGRAPHY_VARIANT.LABEL}>
        {t("dashboard.filter.display")}
      </Typography>
      <View style={styles.toggles}>
        {children}
        <Chip
          active={showFiltersAsBadge}
          label={t("dashboard.filter.showBadge")}
          onPress={onToggleFiltersBadge}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    gap: spacing(2),
  },
  toggles: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing(2),
  },
})
