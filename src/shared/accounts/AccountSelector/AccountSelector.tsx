import { type ReactElement } from "react"
import { ScrollView, StyleSheet } from "react-native"

import Chip from "#design/elements/Chip"
import { spacing } from "#design/foundations"
import { useI18n } from "#shared/i18n"

import { type AccountSelectorProps } from "./types"

export default function AccountSelector({
  accounts,
  selectedId,
  onSelect,
  allLabel,
}: AccountSelectorProps): ReactElement {
  const { t } = useI18n()

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.scroll}
    >
      <Chip
        active={selectedId === 0}
        label={allLabel ?? t("accounts.all")}
        onPress={() => onSelect(0)}
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
    gap: spacing(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(2),
  },
})
