import { useState, type ReactElement } from "react"
import { type LayoutChangeEvent, StyleSheet, View } from "react-native"
import { LineChart as GiftedLineChart } from "react-native-gifted-charts"

import { useThemeColors } from "#design/theme"

import {
  CHART_AXIS_FONT_SIZE,
  CHART_FILL_OPACITY,
  CHART_HEIGHT,
  CHART_PADDING,
  CHART_SECTIONS,
  CHART_STROKE_WIDTH,
  CHART_X_LABELS,
  CHART_Y_AXIS_WIDTH,
  X_LABELS_HEIGHT,
} from "./constants"
import { type LineChartProps } from "./types"

// Minimal area line chart over react-native-gifted-charts: a filled trend line
// with light Y (value) and X (label) axes. Width is measured from the layout
// (full-width, no horizontal scroll); the value range maps to the height.
export default function LineChart({
  values,
  color,
  labels,
}: LineChartProps): ReactElement {
  const colors = useThemeColors()
  const [width, setWidth] = useState(0)

  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width)
  }

  // Need a measured width and at least two points to draw a line.
  if (width === 0 || values.length < 2) {
    return <View style={styles.container} onLayout={onLayout} />
  }

  // Show ~CHART_X_LABELS evenly-spaced labels, but only on INTERIOR points: the
  // area is flush with the Y axis (initialSpacing 0), so a label centered on the
  // first/last point would clip at the plot edge. Interior labels sit inset.
  const step = Math.max(1, Math.round(values.length / CHART_X_LABELS))
  const data = values.map((value, index) => ({
    value,
    label:
      labels && index > 0 && index < values.length - 1 && index % step === 0
        ? labels[index]
        : "",
  }))

  const axisText = {
    color: colors.textMuted,
    fontSize: CHART_AXIS_FONT_SIZE,
  }

  return (
    <View style={styles.container} onLayout={onLayout}>
      <GiftedLineChart
        data={data}
        width={width - CHART_Y_AXIS_WIDTH - CHART_PADDING * 2}
        height={CHART_HEIGHT - CHART_PADDING * 2 - X_LABELS_HEIGHT}
        adjustToWidth
        disableScroll
        initialSpacing={0}
        endSpacing={0}
        thickness={CHART_STROKE_WIDTH}
        color={color}
        areaChart
        startFillColor={color}
        endFillColor={color}
        startOpacity={CHART_FILL_OPACITY}
        endOpacity={0}
        hideDataPoints
        hideRules
        noOfSections={CHART_SECTIONS}
        yAxisThickness={1}
        yAxisColor={colors.border}
        yAxisLabelWidth={CHART_Y_AXIS_WIDTH}
        yAxisTextStyle={axisText}
        xAxisThickness={1}
        xAxisColor={colors.border}
        xAxisLabelsHeight={X_LABELS_HEIGHT}
        xAxisLabelTextStyle={axisText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: CHART_HEIGHT,
    justifyContent: "center",
    paddingHorizontal: CHART_PADDING,
    width: "100%",
  },
})
