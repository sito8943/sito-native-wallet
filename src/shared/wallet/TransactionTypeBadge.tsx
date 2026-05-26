import { type ReactElement } from "react"

import Badge from "#design/elements/Badge"

import { TRANSACTION_TYPE_LABELS } from "./constants"
import {
  TransactionType,
  type TransactionTypeBadgePropsType,
} from "./types"

export default function TransactionTypeBadge({
  type,
}: TransactionTypeBadgePropsType): ReactElement {
  const tone = type === TransactionType.In ? "positive" : "negative"

  return <Badge tone={tone}>{TRANSACTION_TYPE_LABELS[type]}</Badge>
}
