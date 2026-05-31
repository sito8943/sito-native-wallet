import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { ActivityIndicator, Alert } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import Page from "#design/templates/Page"
import {
  type AddCurrencyDto,
  CurrencyForm,
  useCurrencies,
} from "#shared/currencies"
import { useDetailRouteParams } from "#shared/navigation"

export default function EditCurrency(): ReactElement {
  const router = useRouter()
  const { id } = useDetailRouteParams()
  const { data, isLoading, updateCurrency, removeCurrency } = useCurrencies()

  if (isLoading) {
    return (
      <Page centered>
        <ActivityIndicator />
      </Page>
    )
  }

  const currency = data.find((item) => item.id === id)

  if (currency === undefined) {
    return (
      <Page centered>
        <Typography
          variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          Currency not found
        </Typography>
      </Page>
    )
  }

  const handleSubmit = (values: AddCurrencyDto): void => {
    updateCurrency(currency.id, values)
    router.back()
  }

  const handleDelete = (): void => {
    Alert.alert(
      "Delete currency",
      `Delete "${currency.name}"? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            removeCurrency(currency.id)
            router.back()
          },
        },
      ],
    )
  }

  return (
    <Page scroll>
      <CurrencyForm
        submitLabel="Save"
        defaultValues={{
          name: currency.name,
          symbol: currency.symbol,
          description: currency.description ?? "",
        }}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </Page>
  )
}
