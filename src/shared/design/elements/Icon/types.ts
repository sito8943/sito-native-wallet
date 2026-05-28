import { type Props } from "@fortawesome/react-native-fontawesome"

import { type APP_ICONS } from "./constants"

export type IconProps = Omit<Props, "icon"> & {
  icon: (typeof APP_ICONS)[keyof typeof APP_ICONS]
}
