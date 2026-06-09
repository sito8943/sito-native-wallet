import { useRouter } from "expo-router"
import { type ReactElement, useMemo, useState } from "react"
import { View } from "react-native"

import { BUTTON_VARIANT } from "#design/elements/Button"
import { APP_ICONS } from "#design/elements/Icon"
import { radius, spacing } from "#design/foundations"
import FAB from "#design/patterns/FAB"
import Empty from "#design/templates/Empty"
import Page from "#design/templates/Page"
import { type ThemeColors, useThemedStyles } from "#design/theme"
import { ACCOUNT_PREFABS, AccountCard, useAccounts } from "#features/accounts"
import { useCurrencies } from "#features/currencies"
import { useI18n } from "#shared/i18n"
import { toCurrenciesRoute } from "#shared/navigation"

export default function AccountPrefabs(): ReactElement {
  const router = useRouter()
  const styles = useThemedStyles(createStyles)
  const { t, language } = useI18n()
  const { data, addAccounts } = useAccounts()
  const { data: currencies } = useCurrencies()
  const [selected, setSelected] = useState<Set<string>>(new Set())

  // Accounts need a currency; prefabs default to the first one available.
  const defaultCurrency = currencies[0]

  // Hide prefabs already present (matched by localized name).
  const available = useMemo(() => {
    const existing = new Set(
      (data ?? []).map((item) => item.name.toLowerCase()),
    )
    return ACCOUNT_PREFABS.filter(
      (prefab) => !existing.has(prefab.name[language].toLowerCase()),
    )
  }, [data, language])

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
    if (defaultCurrency === undefined) {
      return
    }

    const chosen = available
      .filter((prefab) => selected.has(prefab.key))
      .map(({ name, bankName, type, description }) => ({
        name: name[language],
        bankName,
        type,
        description: description[language],
        balance: 0,
        currency: defaultCurrency,
      }))

    if (chosen.length === 0) {
      return
    }

    addAccounts(chosen)
    router.back()
  }

  if (defaultCurrency === undefined) {
    return (
      <Page scroll>
        <Empty
          message={t("accounts.prefabs.needCurrency")}
          actions={[
            {
              children: t("accounts.prefabs.goToCurrencies"),
              variant: BUTTON_VARIANT.OUTLINED,
              onPress: () => router.push(toCurrenciesRoute()),
            },
          ]}
        />
      </Page>
    )
  }

  return (
    <View style={styles.fill}>
      <Page scroll contentContainerStyle={styles.container}>
        {available.length === 0 ? (
          <Empty message={t("accounts.prefabs.empty")} />
        ) : (
          available.map((prefab, index) => (
            <View
              key={prefab.key}
              style={[selected.has(prefab.key) && styles.selected]}
            >
              <AccountCard
                account={{
                  ...prefab,
                  id: index + 1,
                  name: prefab.name[language],
                  description: prefab.description[language],
                  balance: 0,
                  currency: defaultCurrency,
                }}
                onPress={() => toggle(prefab.key)}
              />
            </View>
          ))
        )}
      </Page>

      {available.length > 0 && (
        <FAB
          accessibilityLabel={t("accounts.addSuggested")}
          icon={APP_ICONS.check}
          label={t("accounts.prefabs.addSelected", { count: selected.size })}
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
  selected: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: radius.md,
  },
})
