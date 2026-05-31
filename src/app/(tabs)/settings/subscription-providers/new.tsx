import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import {
  type AddSubscriptionProviderDto,
  SubscriptionProviderForm,
  useSubscriptionProviders,
} from "#shared/subscriptionProviders"

export default function NewSubscriptionProvider(): ReactElement {
  const router = useRouter()
  const { addSubscriptionProvider } = useSubscriptionProviders()

  const handleSubmit = (values: AddSubscriptionProviderDto): void => {
    addSubscriptionProvider(values)
    router.back()
  }

  return (
    <Page scroll>
      <SubscriptionProviderForm submitLabel="Create" onSubmit={handleSubmit} />
    </Page>
  )
}
