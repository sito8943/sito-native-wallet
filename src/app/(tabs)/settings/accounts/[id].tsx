import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { APP_ICONS } from "#design/elements/Icon"
import { ICON_BUTTON_SIZE } from "#design/elements/IconButton"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useDeleteDialog } from "#design/interactions"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import {
  AccountAdjustBalanceSheet,
  AccountCard,
  useAccount,
  useAdjustBalanceSheet,
} from "#features/accounts"
import {
  type Transaction,
  TransactionList,
  useTransactions,
} from "#features/transactions"
import { useI18n } from "#shared/i18n"
import {
  toAccountNewTransactionRoute,
  toAccountTransactionDetailsRoute,
  toEditAccountRoute,
  useDetailRouteParams,
} from "#shared/navigation"

export default function AccountDetails(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const insets = useSafeAreaInsets()
  const { id } = useDetailRouteParams()
  const { data: account, isLoading } = useAccount(id)
  const { data: transactions, adjustBalance, removeTransaction } =
    useTransactions({
      accountId: id,
    })

  const deleteDialog = useDeleteDialog<Transaction>({
    onConfirm: (transaction) => {
      removeTransaction(transaction.id)
    },
    title: t("transactions.delete.title"),
    message: t("transactions.delete.description"),
  })

  // Account actions (currently just adjust balance). The client owns the
  // adjustment logic; the screen only bridges the account id into it.
  const { action: adjustAction, sheetProps } = useAdjustBalanceSheet({
    onAdjust: (target, newBalance, description) => {
      adjustBalance(target.id, newBalance, description)
    },
  })

  if (isLoading) {
    return (
      <Page centered>
        <ActivityIndicator />
      </Page>
    )
  }

  if (account === null) {
    return (
      <Page centered>
        <Typography
          variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
          tone={TYPOGRAPHY_TONE.MUTED}
        >
          {t("accounts.notFound")}
        </Typography>
      </Page>
    )
  }

  return (
    <View style={styles.screen}>
      <Page>
        <AccountCard account={account} actions={[adjustAction(account)]} />

        {account.description !== undefined && (
          <Typography
            variant={TYPOGRAPHY_VARIANT.BODY}
            tone={TYPOGRAPHY_TONE.MUTED}
            style={styles.description}
          >
            {account.description}
          </Typography>
        )}

        <Typography variant={TYPOGRAPHY_VARIANT.TITLE} style={styles.heading}>
          {t("accounts.details.transactions", { count: transactions.length })}
        </Typography>

        <TransactionList
          data={transactions}
          emptyMessage={t("transactions.empty.default")}
          onPress={(transaction) =>
            router.push(toAccountTransactionDetailsRoute(transaction.id))
          }
          onSwipeDelete={(transaction) => () => {
            deleteDialog.action(transaction).onPress(transaction)
          }}
        />
      </Page>
      {/* Secondary action: edit, a smaller FAB stacked above the primary one. */}
      <FAB
        accessibilityLabel={t("accounts.edit.title")}
        icon={APP_ICONS.edit}
        size={ICON_BUTTON_SIZE.MD}
        onPress={() => router.push(toEditAccountRoute(account.id))}
        style={{ bottom: insets.bottom + spacing(16) }}
      />
      {/* Primary action: add a transaction to this account. */}
      <FAB
        accessibilityLabel={t("transactions.add")}
        icon={APP_ICONS.add}
        onPress={() => router.push(toAccountNewTransactionRoute(account.id))}
      />
      <AccountAdjustBalanceSheet {...sheetProps} />
      <ConfirmationDialog {...deleteDialog} confirmLabel={t("common.delete")} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  description: {
    marginHorizontal: spacing(4),
    marginTop: spacing(1),
  },
  heading: {
    marginHorizontal: spacing(4),
    marginTop: spacing(3),
  },
})
