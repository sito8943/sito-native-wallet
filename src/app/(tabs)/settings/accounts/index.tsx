import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { BUTTON_VARIANT } from "#design/elements/Button"
import { APP_ICONS } from "#design/elements/Icon"
import { ICON_BUTTON_SIZE } from "#design/elements/IconButton"
import { spacing } from "#design/foundations"
import { useDeleteDialog } from "#design/interactions"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import EntityList from "#design/patterns/EntityList"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import {
  type Account,
  AccountAdjustBalanceSheet,
  AccountCard,
  AccountTransferSheet,
  useAccounts,
  useAdjustBalanceSheet,
  useTransferSheet,
} from "#features/accounts"
import { useTransactions } from "#features/transactions"
import { useI18n } from "#shared/i18n"
import {
  toAccountDetailsRoute,
  toAccountPrefabsRoute,
  toNewAccountRoute,
} from "#shared/navigation"

export default function Accounts(): ReactElement {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { t } = useI18n()
  const { data, removeAccount } = useAccounts()
  const accounts = data ?? []
  const { adjustBalance, transferTransaction } = useTransactions()

  // The client (local backend) owns the adjustment logic; the screen only
  // bridges the selected account's id into it.
  const { action: adjustAction, sheetProps } = useAdjustBalanceSheet({
    onAdjust: (account, newBalance, description) => {
      adjustBalance(account.id, newBalance, description)
    },
  })
  const { action: transferAction, sheetProps: transferSheetProps } =
    useTransferSheet({
      onTransfer: (from, toAccountId, amount, date, description) => {
        transferTransaction({
          fromAccountId: from.id,
          toAccountId,
          amount,
          date,
          description,
        })
      },
    })

  const deleteDialog = useDeleteDialog<Account>({
    onConfirm: (account) => {
      removeAccount(account.id)
    },
    title: t("accounts.delete.title"),
    message: t("accounts.delete.description"),
  })

  const hasTransferTarget = (origin: Account): boolean =>
    accounts.some(
      (candidate) =>
        candidate.id !== origin.id &&
        candidate.currency.id === origin.currency.id,
    )

  return (
    <View style={styles.fill}>
      <Page>
        <EntityList
          data={accounts}
          emptyMessage={t("accounts.empty")}
          emptyActions={[
            {
              children: t("accounts.addSuggested"),
              variant: BUTTON_VARIANT.OUTLINED,
              onPress: () => router.push(toAccountPrefabsRoute()),
            },
          ]}
          onSwipeDelete={(account) => () =>
            deleteDialog.action(account).onPress(account)
          }
          renderItem={(account) => (
            <AccountCard
              account={account}
              actions={[
                {
                  ...transferAction(account),
                  hidden: !hasTransferTarget(account),
                },
                adjustAction(account),
                deleteDialog.action(account),
              ]}
              onPress={(selectedAccount) =>
                router.push(toAccountDetailsRoute(selectedAccount.id))
              }
            />
          )}
        />
      </Page>
      <FAB
        accessibilityLabel={t("accounts.addSuggested")}
        icon={APP_ICONS.prefabs}
        size={ICON_BUTTON_SIZE.MD}
        onPress={() => router.push(toAccountPrefabsRoute())}
        style={{ bottom: insets.bottom + spacing(16) }}
      />
      <FAB
        accessibilityLabel={t("accounts.add")}
        icon={APP_ICONS.add}
        onPress={() => router.push(toNewAccountRoute())}
      />
      <AccountTransferSheet {...transferSheetProps} />
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
