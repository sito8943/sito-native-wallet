import { type ReactElement } from "react"

import EntityList from "#design/patterns/EntityList"
import { useI18n } from "#shared/i18n"

import { TransactionCard } from "../TransactionCard"

import { type TransactionListProps } from "./types"

// Thin wrapper over the generic EntityList that renders each row as a
// TransactionCard. Virtualization + infinite pagination live in EntityList.
export default function TransactionList({
  data,
  emptyMessage,
  onPress,
  actionsFor,
  onEndReached,
  onSwipeDelete,
  header,
  contentContainerStyle,
  onScroll,
  scrollEventThrottle,
}: TransactionListProps): ReactElement {
  const { t } = useI18n()

  return (
    <EntityList
      data={data}
      emptyMessage={emptyMessage ?? t("transactions.empty.default")}
      header={header}
      onEndReached={onEndReached}
      onSwipeDelete={onSwipeDelete}
      contentContainerStyle={contentContainerStyle}
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
      renderItem={(transaction) => (
        <TransactionCard
          transaction={transaction}
          actions={actionsFor?.(transaction)}
          onPress={onPress}
        />
      )}
    />
  )
}
