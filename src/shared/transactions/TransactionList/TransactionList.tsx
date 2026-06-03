import { type ReactElement } from "react"

import EntityList from "#design/patterns/EntityList"

import { TransactionCard } from "../TransactionCard"

import { type TransactionListProps } from "./types"

// Thin wrapper over the generic EntityList that renders each row as a
// TransactionCard. Virtualization + infinite pagination live in EntityList.
export default function TransactionList({
  data,
  emptyMessage = "No transactions available.",
  onPress,
  actionsFor,
  onEndReached,
  header,
}: TransactionListProps): ReactElement {
  return (
    <EntityList
      data={data}
      emptyMessage={emptyMessage}
      header={header}
      onEndReached={onEndReached}
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
