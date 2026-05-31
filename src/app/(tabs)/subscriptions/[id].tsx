import { type ReactElement } from "react"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import Page from "#design/templates/Page"
import { useDetailRouteParams } from "#shared/navigation"
import { SubscriptionCard, useSubscriptions } from "#shared/subscriptions"

export default function SubscriptionDetails(): ReactElement {
  const { id } = useDetailRouteParams()
  const { data } = useSubscriptions()

  const subscription = data?.find((item) => item.id === id)

  if (subscription === undefined) {
    return (
      <Page centered>
        <Typography
          variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          Subscription not found
        </Typography>
      </Page>
    )
  }

  const renewalDate = new Date(subscription.nextRenewalAt).toDateString()

  return (
    <Page>
      <SubscriptionCard subscription={subscription} />

      <Typography variant={TYPOGRAPHY_VARIANT.TITLE} style={styles.heading}>
        Renewal
      </Typography>
      <Typography
        variant={TYPOGRAPHY_VARIANT.BODY}
        style={styles.row}
      >
        Next renewal: {renewalDate}
      </Typography>
      <Typography variant={TYPOGRAPHY_VARIANT.BODY} style={styles.row}>
        Account: {subscription.account.name}
      </Typography>
      <Typography variant={TYPOGRAPHY_VARIANT.BODY} style={styles.row}>
        Provider: {subscription.provider.name}
      </Typography>
      <Typography variant={TYPOGRAPHY_VARIANT.BODY} style={styles.row}>
        Status: {subscription.status}
      </Typography>
      <Typography variant={TYPOGRAPHY_VARIANT.BODY} style={styles.row}>
        Notify {subscription.notificationDaysBefore} day(s) before
      </Typography>
    </Page>
  )
}

const styles = {
  heading: {
    marginHorizontal: spacing[4],
    marginTop: spacing[3],
  },
  row: {
    marginHorizontal: spacing[4],
    marginTop: spacing[1],
  },
}
