import { type StyleProp, type ViewStyle } from "react-native"

import { type TransactionCategory } from "../TransactionCategory"

export type CategoryBulletPropsType = Partial<TransactionCategory> & {
  style?: StyleProp<ViewStyle>
}
