import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Chip from "#design/elements/Chip"
import { spacing } from "#design/foundations"

import { type OptionChipsProps } from "./types"

// Single-select row of chips. Generic over the option value so it serves both
// the transaction-type and time-window selectors in the card config sheets.
export default function OptionChips<V extends number | string>({
  options,
  value,
  onSelect,
}: OptionChipsProps<V>): ReactElement {
  return (
    <View style={styles.row}>
      {options.map((option) => (
        <Chip
          key={String(option.value)}
          active={option.value === value}
          label={option.label}
          onPress={() => {
            onSelect(option.value)
          }}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing(2),
  },
})
