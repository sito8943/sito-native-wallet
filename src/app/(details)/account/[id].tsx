import { Stack, useRouter } from "expo-router"
import { type ReactElement, useRef, useState } from "react"
import {
  ActivityIndicator,
  Animated,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { APP_ICONS } from "#design/elements/Icon"
import {
  ICON_BUTTON_SIZE,
  ICON_BUTTON_VARIANT,
} from "#design/elements/IconButton"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useDeleteDialog } from "#design/interactions"
import { ConfirmationDialog } from "#design/patterns/Dialog"
import FAB from "#design/patterns/FAB"
import Page from "#design/templates/Page"
import {
  AccountAdjustBalanceSheet,
  COLLAPSED_HEADER_HEIGHT,
  CollapsibleAccountHeader,
  DEFAULT_HEADER_HEIGHT,
  useAccount,
  useAdjustBalanceSheet,
} from "#features/accounts"
import { useCategories } from "#features/categories"
import {
  makeDemoTransaction,
  type Transaction,
  TransactionList,
  useTransactions,
} from "#features/transactions"
import { useI18n } from "#shared/i18n"
import {
  toEditAccountRoute,
  toNewTransactionRoute,
  toTransactionDetailsRoute,
  useDetailRouteParams,
} from "#shared/navigation"

export default function AccountDetails(): ReactElement {
  const router = useRouter()
  const { t } = useI18n()
  const insets = useSafeAreaInsets()
  const { id } = useDetailRouteParams()
  const { data: account, isLoading } = useAccount(id)
  const {
    data: transactions,
    addTransaction,
    adjustBalance,
    removeTransaction,
  } = useTransactions({
    accountId: id,
  })
  // Dev-only seeding uses the user's real categories (system ones excluded).
  const categories = useCategories({ includeSystem: false }).data

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

  // Scroll-linked collapsing header: the list reports its scroll offset, which
  // shrinks the floating AccountCard into a compact sticky bar. headerHeight is
  // the measured expanded height, also used to pad the list so the first row
  // meets the header edge with no gap.
  const scrollY = useRef(new Animated.Value(0)).current
  const [headerHeight, setHeaderHeight] = useState(DEFAULT_HEADER_HEIGHT)

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false },
  ) as (event: NativeSyntheticEvent<NativeScrollEvent>) => void

  const onHeaderMeasure = (event: LayoutChangeEvent): void => {
    const measured = event.nativeEvent.layout.height
    if (measured > 0 && Math.round(measured) !== Math.round(headerHeight)) {
      setHeaderHeight(measured)
    }
  }

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
      {/* Title the top bar with the account name instead of the static label. */}
      <Stack.Screen options={{ title: account.name }} />
      <Page>
        <TransactionList
          data={transactions}
          emptyMessage={t("transactions.empty.default")}
          contentContainerStyle={{ paddingTop: headerHeight }}
          onScroll={onScroll}
          scrollEventThrottle={16}
          header={
            <Typography
              variant={TYPOGRAPHY_VARIANT.CAPTION}
              style={styles.heading}
            >
              {t("accounts.details.transactions", {
                count: transactions.length,
              })}
            </Typography>
          }
          onPress={(transaction) =>
            router.push(toTransactionDetailsRoute(transaction.id))
          }
          onSwipeDelete={(transaction) => () => {
            deleteDialog.action(transaction).onPress(transaction)
          }}
        />
        <CollapsibleAccountHeader
          account={account}
          actions={[adjustAction(account)]}
          scrollY={scrollY}
          expandedHeight={headerHeight}
          collapsedHeight={COLLAPSED_HEADER_HEIGHT}
          onMeasure={onHeaderMeasure}
        />
      </Page>
      {/* Dev-only: seed a random demo transaction into this account. */}
      {__DEV__ && (
        <FAB
          accessibilityLabel="Add demo transaction"
          icon={APP_ICONS.prefabs}
          size={ICON_BUTTON_SIZE.MD}
          variant={ICON_BUTTON_VARIANT.OUTLINED}
          onPress={() => addTransaction(makeDemoTransaction(id, categories))}
          style={{ bottom: insets.bottom + spacing(28) }}
        />
      )}
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
        onPress={() => router.push(toNewTransactionRoute(account.id))}
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
