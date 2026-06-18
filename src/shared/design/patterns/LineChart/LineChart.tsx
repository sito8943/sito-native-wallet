import { useState, type ReactElement } from "react"
import { type LayoutChangeEvent, StyleSheet, View } from "react-native"
import { Path, Polyline, Svg } from "react-native-svg"

import {
  CHART_FILL_OPACITY,
  CHART_HEIGHT,
  CHART_PADDING,
  CHART_STROKE_WIDTH,
} from "./constants"
import { type LineChartProps } from "./types"

// Minimal line chart over react-native-svg: a polyline of the values plus a
// faint filled area beneath it. Width is measured from the layout (the chart is
// full-width); the value range maps to the inner height. No axes — the trend is
// the point; the caller shows any headline value as text.
export default function LineChart({
  values,
  color,
}: LineChartProps): ReactElement {
  const [width, setWidth] = useState(0)

  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width)
  }

  // Need a measured width and at least two points to draw a line.
  if (width === 0 || values.length < 2) {
    return <View style={styles.container} onLayout={onLayout} />
  }

  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const innerWidth = width - CHART_PADDING * 2
  const innerHeight = CHART_HEIGHT - CHART_PADDING * 2
  const baseline = CHART_HEIGHT - CHART_PADDING

  const points = values.map((value, index) => {
    const x = CHART_PADDING + (index / (values.length - 1)) * innerWidth
    const y = CHART_PADDING + (1 - (value - min) / span) * innerHeight
    return { x, y }
  })

  const line = points.map(({ x, y }) => `${x},${y}`).join(" ")
  const area =
    `M ${points[0].x},${baseline} ` +
    points.map(({ x, y }) => `L ${x},${y}`).join(" ") +
    ` L ${points[points.length - 1].x},${baseline} Z`

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Svg width={width} height={CHART_HEIGHT}>
        <Path d={area} fill={color} fillOpacity={CHART_FILL_OPACITY} />
        <Polyline
          points={line}
          fill="none"
          stroke={color}
          strokeWidth={CHART_STROKE_WIDTH}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: CHART_HEIGHT,
    width: "100%",
  },
})
