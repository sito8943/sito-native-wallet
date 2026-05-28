import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import { AccountCard, useAccounts } from "#shared/accounts"
import { toAccountDetailsRoute } from "#shared/navigation"

export default function Accounts(): ReactElement {
  const router = useRouter()
  const { data } = useAccounts()

  return (
    <Page scroll>
      {data?.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          onPress={(selectedAccount) =>
            router.push(toAccountDetailsRoute(selectedAccount.id))
          }
        />
      ))}
    </Page>
  )
}
