import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import {
  type Account,
  AccountAdjustBalanceSheet,
  AccountCard,
  useAccounts,
  useAdjustBalanceSheet,
} from "#shared/accounts"
import { ADJUSTMENT_CATEGORY_ID } from "#shared/categories"
import { toAccountDetailsRoute, toNewAccountRoute } from "#shared/navigation"
import { todayStamp } from "#shared/time"
import { useTransactions } from "#shared/transactions"

export default function Accounts(): ReactElement {
  const router = useRouter()
  const { data } = useAccounts()
  const { addTransaction } = useTransactions()

  // Records the difference as a system adjustment transaction, which moves the
  // balance to the target through the normal transaction → balance flow. This
  // is the domain-crossing bit, so it lives in the screen (above both domains).
  const onAdjust = (
    account: Account,
    newBalance: number,
    description?: string,
  ): void => {
    const delta = Math.round((newBalance - account.balance) * 100) / 100
    if (delta === 0) {
      return
    }

    addTransaction({
      description: description ?? "Balance adjustment",
      amount: Math.abs(delta),
      date: todayStamp(),
      accountId: account.id,
      categoryIds: [
        delta > 0
          ? ADJUSTMENT_CATEGORY_ID.INCOME
          : ADJUSTMENT_CATEGORY_ID.EXPENSE,
      ],
    })
  }

  const { action: adjustAction, sheetProps } = useAdjustBalanceSheet({
    onAdjust,
  })

  return (
    <View style={styles.fill}>
      <Page scroll>
        {data?.map((account) => (
          <AccountCard
            key={account.id}
            account={account}
            actions={[adjustAction(account)]}
            onPress={(selectedAccount) =>
              router.push(toAccountDetailsRoute(selectedAccount.id))
            }
          />
        ))}
      </Page>
      <FAB
        accessibilityLabel="Add account"
        icon={APP_ICONS.add}
        onPress={() => router.push(toNewAccountRoute())}
      />
      <AccountAdjustBalanceSheet {...sheetProps} />
    </View>
  )
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
})
