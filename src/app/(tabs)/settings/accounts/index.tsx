import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import EntityList from "#design/patterns/EntityList"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import {
  AccountAdjustBalanceSheet,
  AccountCard,
  useAccounts,
  useAdjustBalanceSheet,
} from "#shared/accounts"
import { useI18n } from "#shared/i18n"
import { toAccountDetailsRoute, toNewAccountRoute } from "#shared/navigation"
import { useTransactions } from "#shared/transactions"

export default function Accounts(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const { data } = useAccounts()
  const { adjustBalance } = useTransactions()

  // The client (local backend) owns the adjustment logic; the screen only
  // bridges the selected account's id into it.
  const { action: adjustAction, sheetProps } = useAdjustBalanceSheet({
    onAdjust: (account, newBalance, description) => {
      adjustBalance(account.id, newBalance, description)
    },
  })

  return (
    <View style={styles.fill}>
      <Page>
        <EntityList
          data={data}
          emptyMessage={t("accounts.empty")}
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
    </View>
  )
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
})
