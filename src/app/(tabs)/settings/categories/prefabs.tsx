import { useRouter } from "expo-router"
import { type ReactElement, useMemo, useState } from "react"
import { View } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { radius, spacing } from "#design/foundations"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import { type ThemeColors, useThemedStyles } from "#design/theme"
import {
  CATEGORY_PREFABS,
  CategoryCard,
  useCategories,
} from "#shared/categories"

export default function CategoryPrefabs(): ReactElement {
  const router = useRouter()
  const styles = useThemedStyles(createStyles)
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
      <Page scroll>
        {available.length === 0 ? (
          <View style={styles.empty}>
            <Typography tone={TYPOGRAPHY_TONE.MUTED}>
              All suggested categories are already added.
            </Typography>
          </View>
        ) : (
          available.map((prefab, index) => (
            <View
              key={prefab.key}
              style={[selected.has(prefab.key) && styles.selected]}
            >
              <CategoryCard
                category={{ ...prefab, id: index + 1 }}
                onPress={() => toggle(prefab.key)}
                style={styles.card}
              />
            </View>
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

const createStyles = (colors: ThemeColors) => ({
  fill: {
    flex: 1,
  },
  empty: {
    padding: spacing(4),
  },
  selected: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: radius.md,
  },
  card: {
    borderRadius: radius.md,
  },
})
