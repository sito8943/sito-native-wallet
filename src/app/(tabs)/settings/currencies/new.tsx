import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import {
  type AddCurrencyDto,
  CurrencyForm,
  useCurrencies,
} from "#shared/currencies"

export default function NewCurrency(): ReactElement {
  const router = useRouter()
  const { addCurrency } = useCurrencies()

  const handleSubmit = (values: AddCurrencyDto): void => {
    addCurrency(values)
    router.back()
  }

  return (
    <Page scroll>
      <CurrencyForm submitLabel="Create" onSubmit={handleSubmit} />
    </Page>
  )
}
