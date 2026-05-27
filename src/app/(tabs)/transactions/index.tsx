import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import { TransactionList, useTransactions } from "#shared/transactions"
import Page from "#design/templates/Page"

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
