import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import EntityCard from "#design/patterns/EntityCard"
import { TransactionTypeBadge } from "#shared/transactions/TransactionTypeBadge"

import { CategoryBullet } from "../CategoryBullet"

import { type CategoryCardProps } from "./types"

export default function CategoryCard({
  category,
  actions,
  onPress,
}: CategoryCardProps): ReactElement {
  return (
    <EntityCard actions={actions} entity={category} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.copy}>
          <View style={styles.header}>
            <CategoryBullet color={category.color} style={styles.marker} />
            <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
              {category.name}
            </Typography>
          </View>
          {category.description && (
            <Typography variant={TYPOGRAPHY_VARIANT.BODY}>
              {category.description}
            </Typography>
          )}
        </View>
        <TransactionTypeBadge
          type={category.type}
          filled={false}
          showText={false}
        />
      </View>
    </EntityCard>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start" as const,
    flexDirection: "row" as const,
    justifyContent: "space-between",
    width: "100%",
  },
  copy: {
    flexDirection: "column" as const,
  },
  header: {
    alignItems: "center" as const,
    flexDirection: "row" as const,
    gap: spacing(2),
    justifyContent: "flex-start" as const,
  },
  marker: {
    marginTop: -spacing(1),
  },
})
