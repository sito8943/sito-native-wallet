import { useRouter } from "expo-router"
import { type ReactElement } from "react"
import { View } from "react-native"

import { APP_ICONS } from "#design/elements/Icon"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import { AccountCard, useAccounts } from "#shared/accounts"
import { toAccountDetailsRoute, toNewAccountRoute } from "#shared/navigation"

export default function Accounts(): ReactElement {
  const router = useRouter()
  const { data } = useAccounts()

  return (
    <View style={{ flex: 1 }}>
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
      <FAB
        accessibilityLabel="Add account"
        icon={APP_ICONS.add}
        onPress={() => router.push(toNewAccountRoute())}
      />
    </View>
  )
}
