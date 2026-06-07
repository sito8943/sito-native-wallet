import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import { useDeleteDialog } from "#design/interactions"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import EntityList from "#design/patterns/EntityList"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import {
  type Account,
  AccountAdjustBalanceSheet,
  AccountCard,
  useAccounts,
  useAdjustBalanceSheet,
} from "#features/accounts"
import { useTransactions } from "#features/transactions"
import { useI18n } from "#shared/i18n"
import { toAccountDetailsRoute, toNewAccountRoute } from "#shared/navigation"

export default function Accounts(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { data, removeAccount } = useAccounts()
  const { adjustBalance } = useTransactions()

  // The client (local backend) owns the adjustment logic; the screen only
  // bridges the selected account's id into it.
  const { action: adjustAction, sheetProps } = useAdjustBalanceSheet({
    onAdjust: (account, newBalance, description) => {
      adjustBalance(account.id, newBalance, description)
    },
  })

  const deleteDialog = useDeleteDialog<Account>({
    onConfirm: (account) => {
      removeAccount(account.id)
    },
    title: t("accounts.delete.title"),
    message: t("accounts.delete.description"),
  })

  return (
    <View style={styles.fill}>
      <Page>
        <EntityList
          data={data}
          emptyMessage={t("accounts.empty")}
          onSwipeDelete={(account) => () =>
            deleteDialog.action(account).onPress(account)
          }
          renderItem={(account) => (
            <AccountCard
              account={account}
              actions={[adjustAction(account)]}
              onPress={(selectedAccount) =>
                router.push(toAccountDetailsRoute(selectedAccount.id))
              }
            />
          )}
        />
      </Page>
      <FAB
        accessibilityLabel={t("accounts.add")}
        icon={APP_ICONS.add}
        onPress={() => router.push(toNewAccountRoute())}
      />
      <AccountAdjustBalanceSheet {...sheetProps} />
      <ConfirmationDialog {...deleteDialog} confirmLabel={t("common.delete")} />
    </View>
  )
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
})
