import { type ReactElement } from "react"
import { ScrollView, StyleSheet } from "react-native"

import Chip from "#design/elements/Chip"
import { spacing } from "#design/foundations"

import { type AccountSelectorProps } from "./types"

export default function AccountSelector({
  accounts,
  selectedId,
  onSelect,
  allLabel = "All accounts",
}: AccountSelectorProps): ReactElement {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.scroll}
    >
      <Chip
        active={selectedId === null}
        label={allLabel}
        onPress={() => onSelect(null)}
      />
      {accounts.map((account) => (
        <Chip
          key={account.id}
          active={selectedId === account.id}
          label={account.name}
          onPress={() => onSelect(account.id)}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  content: {
    gap: spacing[2],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
})
