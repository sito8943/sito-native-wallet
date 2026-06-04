import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import { useI18n } from "#shared/i18n"
import {
  type AddSubscriptionProviderDto,
  SubscriptionProviderForm,
  useSubscriptionProviders,
} from "#shared/subscriptionProviders"

export default function NewSubscriptionProvider(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { addSubscriptionProvider } = useSubscriptionProviders()

  const handleSubmit = (values: AddSubscriptionProviderDto): void => {
    addSubscriptionProvider(values)
    router.back()
  }

  return (
    <Page scroll>
      <SubscriptionProviderForm
        submitLabel={t("subscriptionProviders.create")}
        onSubmit={handleSubmit}
      />
    </Page>
  )
}
