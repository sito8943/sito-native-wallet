import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"

import { type SubscriptionProviderCardProps } from "./types"

export default function SubscriptionProviderCard({
  provider,
  onPress,
}: SubscriptionProviderCardProps): ReactElement {
  const content = (
    <Card>
      <View style={styles.copy}>
        <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
          {provider.name}
        </Typography>
        {provider.description !== undefined && (
          <Typography variant={TYPOGRAPHY_VARIANT.CAPTION}>
            {provider.description}
          </Typography>
        )}
      </View>
    </Card>
  )

  if (onPress === undefined) {
    return content
  }

  return <Pressable onPress={() => onPress(provider)}>{content}</Pressable>
}

const styles = StyleSheet.create({
  copy: {
    flex: 1,
    gap: spacing[1],
  },
})
