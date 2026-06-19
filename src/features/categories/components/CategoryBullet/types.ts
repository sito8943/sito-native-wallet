import { type StyleProp, type ViewStyle } from "react-native"

import { type TransactionCategory } from "../../TransactionCategory"

export type CategoryBulletProps = Partial<TransactionCategory> & {
  style?: StyleProp<ViewStyle>
}
