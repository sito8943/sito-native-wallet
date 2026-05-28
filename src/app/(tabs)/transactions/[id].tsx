import { type ReactElement } from "react"

import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import Page from "#design/templates/Page"
import { useDetailRouteParams } from "#shared/navigation"
import { TransactionCard, useTransactions } from "#shared/transactions"

export default function TransactionDetails(): ReactElement {
  const { id } = useDetailRouteParams()
  const { data } = useTransactions()
  const transaction = data?.find((item) => item.id === id)

  if (transaction === undefined) {
    return (
      <Page centered>
        <Typography
          variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          Transaction not found
        </Typography>
      </Page>
    )
  }

  return (
    <Page>
      <TransactionCard transaction={transaction} />
    </Page>
  )
}
