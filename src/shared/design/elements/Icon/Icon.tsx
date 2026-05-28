import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { type ReactElement } from "react"

import { type IconProps } from "./types"

export default function Icon({ icon, ...iconProps }: IconProps): ReactElement {
  return <FontAwesomeIcon {...iconProps} icon={icon} />
}
