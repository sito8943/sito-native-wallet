import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import EntityCard from "#design/patterns/EntityCard"

import { type SubscriptionProviderCardProps } from "./types"

export default function SubscriptionProviderCard({
  provider,
  actions,
  style,
  flat,
  onPress,
}: SubscriptionProviderCardProps): ReactElement {
  return (
    <EntityCard
      style={style}
      flat={flat}
      actions={actions}
      entity={provider}
      onPress={onPress}
    >
      <View style={styles.copy}>
        <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
          {provider.name}
        </Typography>
        {provider.description !== undefined && provider.description !== "" && (
          <Typography
            variant={TYPOGRAPHY_VARIANT.CAPTION}
            tone={TYPOGRAPHY_TONE.MUTED}
          >
            {provider.description}
          </Typography>
        )}
      </View>
    </EntityCard>
  )
}

const styles = StyleSheet.create({
  copy: {
    flex: 1,
    gap: spacing(1),
  },
})
