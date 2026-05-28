import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { type ReactElement } from "react"

import { type IconPropsType } from "./types"

export default function Icon({
  icon,
  ...iconProps
}: IconPropsType): ReactElement {
  return <FontAwesomeIcon {...iconProps} icon={icon} />
}
