import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import {
  type AddCurrencyDto,
  CurrencyForm,
  useCurrencies,
} from "#features/currencies"
import { useI18n } from "#shared/i18n"

export default function NewCurrency(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { addCurrency } = useCurrencies()

  const handleSubmit = (values: AddCurrencyDto): void => {
    addCurrency(values)
    router.back()
  }

  return (
    <Page scroll>
      <CurrencyForm
        submitLabel={t("currencies.create")}
        onSubmit={handleSubmit}
      />
    </Page>
  )
}
