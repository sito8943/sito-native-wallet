import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import EntityList from "#design/patterns/EntityList"
import Page from "#design/templates/Page"
import { SubscriptionCard, useSubscriptions } from "#features/subscriptions"
import { useI18n } from "#shared/i18n"
import { toSubscriptionDetailsRoute } from "#shared/navigation"

export default function Subscriptions(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { data } = useSubscriptions()

  return (
    <Page>
      <EntityList
        data={data}
        emptyMessage={t("subscriptions.empty")}
        renderItem={(subscription) => (
          <SubscriptionCard
            subscription={subscription}
            onPress={(selected) =>
              router.push(toSubscriptionDetailsRoute(selected.id))
            }
          />
        )}
      />
    </Page>
  )
}
