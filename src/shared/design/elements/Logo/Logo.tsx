import { type ReactElement } from "react"
import { Path, Svg } from "react-native-svg"

import { useThemeColors } from "#design/theme"

import {
  LOGO_GLYPH_PATH,
  LOGO_VIEWBOX_HEIGHT,
  LOGO_VIEWBOX_WIDTH,
} from "./constants"
import { type LogoProps } from "./types"

// The app's brand glyph, drawn as vector with no background (the bundled PNG
// assets are a grey placeholder until a stable release). Ported from the wallet
// web logomark; defaults to the theme primary color.
export default function Logo({ width = 120, color }: LogoProps): ReactElement {
  const colors = useThemeColors()
  const height = (width * LOGO_VIEWBOX_HEIGHT) / LOGO_VIEWBOX_WIDTH

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${LOGO_VIEWBOX_WIDTH} ${LOGO_VIEWBOX_HEIGHT}`}
    >
      <Path d={LOGO_GLYPH_PATH} fill={color ?? colors.primary} />
    </Svg>
  )
}
