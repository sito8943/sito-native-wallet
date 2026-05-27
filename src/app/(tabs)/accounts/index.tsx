import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import { AccountCard, useAccounts } from "#shared/accounts"

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
            router.push({
              pathname: "/accounts/[id]",
              params: { id: selectedAccount.id },
            })
          }
        />
      ))}
    </Page>
  )
}
