import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import { AccountCard, useAccounts } from "#shared/wallet"

export default function Accounts(): ReactElement {
  const { data } = useAccounts()

  return (
    <Page scroll>
      {data?.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </Page>
  )
}
