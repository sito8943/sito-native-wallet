export type LineChartProps = {
  // Y values, ascending by x (oldest → newest). Need ≥2 to draw a line.
  values: number[]
  color: string
  // Optional X-axis labels aligned 1:1 with `values`. Only a few are shown
  // (evenly spaced) to avoid overlap; the rest render blank.
  labels?: string[]
}
