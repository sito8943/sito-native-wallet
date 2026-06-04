import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { ActivityIndicator, Alert } from "react-native"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import Page from "#design/templates/Page"
import {
  type AddCurrencyDto,
  CurrencyForm,
  useCurrency,
} from "#shared/currencies"
import { useI18n } from "#shared/i18n"
import { useDetailRouteParams } from "#shared/navigation"

export default function EditCurrency(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { id } = useDetailRouteParams()
  const { data: currency, isLoading, update, remove } = useCurrency(id)

  if (isLoading) {
    return (
      <Page centered>
        <ActivityIndicator />
      </Page>
    )
  }

  if (currency === null) {
    return (
      <Page centered>
        <Typography
          variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          {t("currencies.notFound")}
        </Typography>
      </Page>
    )
  }

  const handleSubmit = (values: AddCurrencyDto): void => {
    update(values)
    router.back()
  }

  const handleDelete = (): void => {
    Alert.alert(
      t("currencies.delete.title"),
      t("currencies.delete.message", { name: currency.name }),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.delete"),
          style: "destructive",
          onPress: () => {
            remove()
            router.back()
          },
        },
      ],
    )
  }

  return (
    <Page scroll>
      <CurrencyForm
        submitLabel={t("currencies.save")}
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
