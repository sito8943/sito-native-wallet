import { type ReactElement } from "react"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import Page from "#design/templates/Page"
import { useI18n } from "#shared/i18n"
import { useDetailRouteParams } from "#shared/navigation"
import {
  SUBSCRIPTION_STATUS,
  SubscriptionCard,
  useSubscription,
} from "#shared/subscriptions"

export default function SubscriptionDetails(): ReactElement {
  const { language, t } = useI18n()
  const { id } = useDetailRouteParams()
  const { data: subscription } = useSubscription(id)

  if (subscription === null) {
    return (
      <Page centered>
        <Typography
          variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          {t("subscriptions.notFound")}
        </Typography>
      </Page>
    )
  }

  const renewalDate = new Intl.DateTimeFormat(language, {
    dateStyle: "medium",
  }).format(new Date(subscription.nextRenewalAt))
  const statusLabel =
    subscription.status === SUBSCRIPTION_STATUS.ACTIVE
      ? t("subscriptions.status.active")
      : subscription.status === SUBSCRIPTION_STATUS.PAUSED
        ? t("subscriptions.status.paused")
        : t("subscriptions.status.canceled")

  return (
    <Page>
      <SubscriptionCard subscription={subscription} />

      <Typography variant={TYPOGRAPHY_VARIANT.TITLE} style={styles.heading}>
        {t("subscriptions.renewal.title")}
      </Typography>
      <Typography variant={TYPOGRAPHY_VARIANT.BODY} style={styles.row}>
        {t("subscriptions.renewal.next", { date: renewalDate })}
      </Typography>
      <Typography variant={TYPOGRAPHY_VARIANT.BODY} style={styles.row}>
        {t("subscriptions.renewal.account", {
          name: subscription.account.name,
        })}
      </Typography>
      <Typography variant={TYPOGRAPHY_VARIANT.BODY} style={styles.row}>
        {t("subscriptions.renewal.provider", {
          name: subscription.provider.name,
        })}
      </Typography>
      <Typography variant={TYPOGRAPHY_VARIANT.BODY} style={styles.row}>
        {t("subscriptions.renewal.status", { status: statusLabel })}
      </Typography>
      <Typography variant={TYPOGRAPHY_VARIANT.BODY} style={styles.row}>
        {t("subscriptions.renewal.notifyBefore", {
          days: subscription.notificationDaysBefore,
        })}
      </Typography>
    </Page>
  )
}

const styles = {
  heading: {
    marginHorizontal: spacing(4),
    marginTop: spacing(3),
  },
  row: {
    marginHorizontal: spacing(4),
    marginTop: spacing(1),
  },
}
