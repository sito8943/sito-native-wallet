import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import { type AddAccountDto, AccountForm, useAccounts } from "#shared/accounts"

export default function NewAccount(): ReactElement {
  const router = useRouter()
  const { addAccount } = useAccounts()

  const handleSubmit = (values: AddAccountDto): void => {
    addAccount(values)
    router.back()
  }

  return (
    <Page scroll>
      <AccountForm submitLabel="Create" onSubmit={handleSubmit} />
    </Page>
  )
}
