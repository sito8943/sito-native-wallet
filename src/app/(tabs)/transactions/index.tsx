import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import { TransactionList, useTransactions } from "#shared/transactions"

export default function Transactions(): ReactElement {
  const router = useRouter()
  const { data } = useTransactions()

  return (
    <Page>
      <TransactionList
        data={data ?? undefined}
        onTransactionPress={(transaction) =>
          router.push({
            pathname: "/transactions/[id]",
            params: { id: transaction.id },
          })
        }
      />
    </Page>
  )
}
