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
  CURRENCY_PREFABS,
  CurrencyCard,
  useCurrencies,
} from "#features/currencies"
import { useI18n } from "#shared/i18n"

export default function CurrencyPrefabs(): ReactElement {
  const router = useRouter()
  const styles = useThemedStyles(createStyles)
  const { t, language } = useI18n()
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
      .map(({ name, symbol, description }) => ({
        name: name[language],
        symbol,
        description: description[language],
      }))

    if (chosen.length === 0) {
      return
    }

    addCurrencies(chosen)
    router.back()
  }

  return (
    <View style={styles.fill}>
      <Page scroll contentContainerStyle={styles.container}>
        {available.length === 0 ? (
          <View style={styles.empty}>
            <Typography tone={TYPOGRAPHY_TONE.MUTED}>
              {t("currencies.prefabs.empty")}
            </Typography>
          </View>
        ) : (
          available.map((prefab, i) => (
            <View
              key={prefab.key}
              style={[selected.has(prefab.key) && styles.selected]}
            >
              <CurrencyCard
                onPress={() => toggle(prefab.key)}
                currency={{
                  ...prefab,
                  id: i,
                  name: prefab.name[language],
                  description: prefab.description[language],
                }}
              />
            </View>
          ))
        )}
      </Page>

      {available.length > 0 && (
        <FAB
          accessibilityLabel={t("currencies.addCommon")}
          icon={APP_ICONS.check}
          label={t("currencies.prefabs.addSelected", { count: selected.size })}
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
  container: {
    gap: spacing(4),
  },
  empty: {
    padding: spacing(4),
  },
  selected: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: radius.md,
  },
})
