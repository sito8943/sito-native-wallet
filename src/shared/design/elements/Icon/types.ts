import { type Props } from "@fortawesome/react-native-fontawesome"

import { type APP_ICONS } from "./constants"

export type AppIcon = (typeof APP_ICONS)[keyof typeof APP_ICONS]

export type IconProps = Omit<Props, "icon"> & {
  icon: AppIcon
}
