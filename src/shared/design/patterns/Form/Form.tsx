import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Button from "#design/elements/Button"
import { spacing } from "#design/foundations"

import { type FormProps } from "./types"

// Shared form shell: consistent padding/spacing for the fields plus a standard
// actions block (full-width submit + any extra full-width actions). Screens
// only supply the fields and handlers so button styling never has to be
// reinvented per form. The Form stays agnostic of what extra actions do.
export default function Form({
  children,
  submitLabel,
  onSubmit,
  submitLoading = false,
  submitDisabled = false,
  extraActions,
}: FormProps): ReactElement {
  return (
    <View style={styles.container}>
      {children}

      <View style={styles.actions}>
        <Button
          label={submitLabel}
          loading={submitLoading}
          disabled={submitDisabled}
          onPress={onSubmit}
        />

        {extraActions}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: spacing(4),
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(3),
  },
  actions: {
    gap: spacing(3),
    marginTop: spacing(4),
    justifyContent: "flex-start" as const,
  },
})
