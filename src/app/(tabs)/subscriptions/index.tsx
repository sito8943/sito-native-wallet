import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import { toSubscriptionDetailsRoute } from "#shared/navigation"
import { SubscriptionCard, useSubscriptions } from "#shared/subscriptions"

export default function Subscriptions(): ReactElement {
  const router = useRouter()
  const { data } = useSubscriptions()

  return (
    <Page scroll>
      {data?.map((subscription) => (
        <SubscriptionCard
          key={subscription.id}
          subscription={subscription}
          onPress={(selected) =>
            router.push(toSubscriptionDetailsRoute(selected.id))
          }
        />
      ))}
    </Page>
  )
}
