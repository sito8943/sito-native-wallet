import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import EntityList from "#design/patterns/EntityList"
import Page from "#design/templates/Page"
import { useI18n } from "#shared/i18n"
import { toSubscriptionDetailsRoute } from "#shared/navigation"
import { SubscriptionCard, useSubscriptions } from "#shared/subscriptions"

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
