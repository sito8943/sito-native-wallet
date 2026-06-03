import { useId, type ReactElement } from "react"
import { View } from "react-native"
import {
  Defs,
  LinearGradient as SvgLinearGradient,
  Rect,
  Stop,
  Svg,
} from "react-native-svg"

import { type LinearGradientProps } from "./types"

export default function LinearGradient({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
}: LinearGradientProps): ReactElement {
  // useId keeps the gradient def unique per instance — avoids url(#id) collisions.
  const id = useId()
  const lastIndex = colors.length - 1

  return (
    <View style={style} pointerEvents="none">
      <Svg width="100%" height="100%">
        <Defs>
          <SvgLinearGradient
            id={id}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
          >
            {colors.map((color, index) => (
              <Stop
                key={`${color}-${index}`}
                offset={lastIndex === 0 ? 0 : index / lastIndex}
                stopColor={color}
              />
            ))}
          </SvgLinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#${id})`} />
      </Svg>
    </View>
  )
}
