import { useRouter } from "expo-router"
import { type ReactElement, useMemo, useState } from "react"
import { StyleSheet, View } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import FAB from "#design/patterns/FAB"
import PrefabCard from "#design/patterns/PrefabCard"
import Page from "#design/templates/Page"
import {
  CATEGORY_PREFABS,
  CategoryBullet,
  useCategories,
} from "#shared/categories"
import { TransactionTypeBadge } from "#shared/transactions/TransactionTypeBadge"

export default function CategoryPrefabs(): ReactElement {
  const router = useRouter()
  const { data, addCategories } = useCategories()
  const [selected, setSelected] = useState<Set<string>>(new Set())

  // Hide prefabs already present (matched by name).
  const available = useMemo(() => {
    const existing = new Set(data.map((item) => item.name.toLowerCase()))
    return CATEGORY_PREFABS.filter(
      (prefab) => !existing.has(prefab.name.toLowerCase()),
    )
  }, [data])

  const toggle = (key: string): void => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const confirm = (): void => {
    const chosen = available
      .filter((prefab) => selected.has(prefab.key))
      .map(({ name, type, color, description }) => ({
        name,
        type,
        color,
        description,
      }))

    if (chosen.length === 0) {
      return
    }

    addCategories(chosen)
    router.back()
  }

  return (
    <View style={styles.fill}>
      <Page scroll bottomInset>
        {available.length === 0 ? (
          <View style={styles.empty}>
            <Typography tone={TYPOGRAPHY_TONE.MUTED}>
              All suggested categories are already added.
            </Typography>
          </View>
        ) : (
          available.map((prefab) => (
            <PrefabCard
              key={prefab.key}
              selected={selected.has(prefab.key)}
              onPress={() => toggle(prefab.key)}
              trailing={
                <TransactionTypeBadge
                  type={prefab.type}
                  filled={false}
                  showText={false}
                />
              }
            >
              <View style={styles.header}>
                <CategoryBullet color={prefab.color} />
                <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
                  {prefab.name}
                </Typography>
              </View>
              {prefab.description !== undefined && (
                <Typography variant={TYPOGRAPHY_VARIANT.BODY}>
                  {prefab.description}
                </Typography>
              )}
            </PrefabCard>
          ))
        )}
      </Page>

      {available.length > 0 && (
        <FAB
          accessibilityLabel="Add selected categories"
          icon={APP_ICONS.check}
          label={`Add ${selected.size}`}
          disabled={selected.size === 0}
          onPress={confirm}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  empty: {
    padding: spacing(4),
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing(2),
  },
})
