import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import {
  type AddAccountDto,
  AccountForm,
  useAccounts,
} from "#features/accounts"
import { useI18n } from "#shared/i18n"

export default function NewAccount(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { addAccount } = useAccounts()

  const handleSubmit = (values: AddAccountDto): void => {
    addAccount(values)
    router.back()
  }

  return (
    <Page scroll>
      <AccountForm submitLabel={t("accounts.create")} onSubmit={handleSubmit} />
    </Page>
  )
}
