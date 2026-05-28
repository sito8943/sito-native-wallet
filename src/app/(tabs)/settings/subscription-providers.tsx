import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import {
  SubscriptionProviderCard,
  useSubscriptionProviders,
} from "#shared/subscriptionProviders"

export default function SubscriptionProviders(): ReactElement {
  const { data } = useSubscriptionProviders()

  return (
    <Page scroll>
      {data?.map((provider) => (
        <SubscriptionProviderCard key={provider.id} provider={provider} />
      ))}
    </Page>
  )
}
