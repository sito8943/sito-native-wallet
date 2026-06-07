import { useRouter } from "expo-router"
import { type ReactElement, useMemo, useState } from "react"
import { View } from "react-native"

import Button, { BUTTON_VARIANT } from "#design/elements/Button"
import { APP_ICONS } from "#design/elements/Icon"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { radius, spacing } from "#design/foundations"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import { type ThemeColors, useThemedStyles } from "#design/theme"
import { ACCOUNT_PREFABS, AccountCard, useAccounts } from "#features/accounts"
import { useCurrencies } from "#features/currencies"
import { useI18n } from "#shared/i18n"
import { toCurrenciesRoute } from "#shared/navigation"

export default function AccountPrefabs(): ReactElement {
  const router = useRouter()
  const styles = useThemedStyles(createStyles)
  const { t } = useI18n()
  const { data, addAccounts } = useAccounts()
  const { data: currencies } = useCurrencies()
  const [selected, setSelected] = useState<Set<string>>(new Set())

  // Accounts need a currency; prefabs default to the first one available.
  const defaultCurrency = currencies[0]

  // Hide prefabs already present (matched by name).
  const available = useMemo(() => {
    const existing = new Set(
      (data ?? []).map((item) => item.name.toLowerCase()),
    )
    return ACCOUNT_PREFABS.filter(
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
    if (defaultCurrency === undefined) {
      return
    }

    const chosen = available
      .filter((prefab) => selected.has(prefab.key))
      .map(({ name, bankName, type, description }) => ({
        name,
        bankName,
        type,
        description,
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
        <View style={styles.emptyAction}>
          <Typography tone={TYPOGRAPHY_TONE.MUTED}>
            {t("accounts.prefabs.needCurrency")}
          </Typography>
          <Button
            accessibilityLabel={t("accounts.prefabs.goToCurrencies")}
            variant={BUTTON_VARIANT.OUTLINED}
            onPress={() => router.push(toCurrenciesRoute())}
          >
            {t("accounts.prefabs.goToCurrencies")}
          </Button>
        </View>
      </Page>
    )
  }

  return (
    <View style={styles.fill}>
      <Page scroll>
        {available.length === 0 ? (
          <View style={styles.empty}>
            <Typography tone={TYPOGRAPHY_TONE.MUTED}>
              {t("accounts.prefabs.empty")}
            </Typography>
          </View>
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
  empty: {
    padding: spacing(4),
  },
  emptyAction: {
    padding: spacing(4),
    gap: spacing(3),
    alignItems: "flex-start" as const,
  },
  selected: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: radius.md,
  },
})
