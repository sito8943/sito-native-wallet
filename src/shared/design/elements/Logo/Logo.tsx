import { type ReactElement } from "react"
import { Path, Rect, Svg } from "react-native-svg"

import {
  LOGO_COLOR,
  LOGO_CORNER_RATIO,
  LOGO_GLYPH_PATH,
  LOGO_VIEWBOX,
} from "./constants"
import { type LogoProps } from "./types"

// The app's brand mark, drawn as vector (the bundled PNG assets are a grey
// placeholder until a stable release). Square; ported from the wallet web
// `logo-blue.svg`.
export default function Logo({
  size = 72,
  rounded = true,
}: LogoProps): ReactElement {
  const corner = rounded ? LOGO_VIEWBOX * LOGO_CORNER_RATIO : 0

  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${LOGO_VIEWBOX} ${LOGO_VIEWBOX}`}
    >
      <Rect
        width={LOGO_VIEWBOX}
        height={LOGO_VIEWBOX}
        rx={corner}
        ry={corner}
        fill={LOGO_COLOR.BACKGROUND}
      />
      <Path d={LOGO_GLYPH_PATH} fill={LOGO_COLOR.GLYPH} />
    </Svg>
  )
}
