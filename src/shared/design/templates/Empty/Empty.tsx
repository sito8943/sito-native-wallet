import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Button from "#design/elements/Button"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"

import { type EmptyProps } from "./types"

export default function Empty({
  message,
  actions = [],
}: EmptyProps): ReactElement {
  return (
    <View style={styles.container}>
      <Typography
        style={styles.message}
        tone={TYPOGRAPHY_TONE.MUTED}
        variant={TYPOGRAPHY_VARIANT.BODY}
      >
        {message}
      </Typography>

      {actions.length > 0 && (
        <View style={styles.actions}>
          {actions.map(({ children, ...action }, index) => {
            const fallbackLabel =
              typeof children === "string" || typeof children === "number"
                ? String(children)
                : `empty-action-${index + 1}`

            return (
              <Button
                key={fallbackLabel}
                accessibilityLabel={action.accessibilityLabel ?? fallbackLabel}
                {...action}
              >
                {children}
              </Button>
            )
          })}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing(4),
    marginHorizontal: spacing(4),
    marginTop: spacing(4),
  },
  message: {
    textAlign: "center",
  },
  actions: {
    gap: spacing(3),
    width: "100%",
  },
})
