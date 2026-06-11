import { type ReactElement } from "react"
import { ScrollView, StyleSheet } from "react-native"

import Chip from "#design/elements/Chip"
import { spacing } from "#design/foundations"

import { type ActiveFiltersProps } from "./types"

// Read-only summary of a card's filters, rendered as chips that reopen the
// config sheet when tapped. Labels are unique within a card (account / type /
// time), so each doubles as its key.
export default function ActiveFilters({
  labels,
  onPress,
}: ActiveFiltersProps): ReactElement {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.scroll}
    >
      {labels.map((label) => (
        <Chip key={label} active={false} label={label} onPress={onPress} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  content: {
    flexDirection: "row",
    gap: spacing(2),
    paddingTop: spacing(2),
  },
})
