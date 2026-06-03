import { useRouter } from "expo-router"
import { type ReactElement, useMemo, useState } from "react"
import { StyleSheet, View } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import FAB from "#design/patterns/FAB"
import PrefabCard from "#design/patterns/PrefabCard"
import Page from "#design/templates/Page"
import { CURRENCY_PREFABS, useCurrencies } from "#shared/currencies"

export default function CurrencyPrefabs(): ReactElement {
  const router = useRouter()
  const { data, addCurrencies } = useCurrencies()
  const [selected, setSelected] = useState<Set<string>>(new Set())

  // Hide prefabs already present (matched by symbol).
  const available = useMemo(() => {
    const existing = new Set(data.map((item) => item.symbol.toLowerCase()))
    return CURRENCY_PREFABS.filter(
      (prefab) => !existing.has(prefab.symbol.toLowerCase()),
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
      .map(({ name, symbol, description }) => ({ name, symbol, description }))

    if (chosen.length === 0) {
      return
    }

    addCurrencies(chosen)
    router.back()
  }

  return (
    <View style={styles.fill}>
      <Page scroll bottomInset>
        {available.length === 0 ? (
          <View style={styles.empty}>
            <Typography tone={TYPOGRAPHY_TONE.MUTED}>
              All common currencies are already added.
            </Typography>
          </View>
        ) : (
          available.map((prefab) => (
            <PrefabCard
              key={prefab.key}
              selected={selected.has(prefab.key)}
              onPress={() => toggle(prefab.key)}
              trailing={
                <Typography variant={TYPOGRAPHY_VARIANT.SUBTLE}>
                  {prefab.symbol}
                </Typography>
              }
            >
              <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
                {prefab.name}
              </Typography>
              <Typography variant={TYPOGRAPHY_VARIANT.BODY}>
                {prefab.description}
              </Typography>
            </PrefabCard>
          ))
        )}
      </Page>

      {available.length > 0 && (
        <FAB
          accessibilityLabel="Add selected currencies"
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
})
