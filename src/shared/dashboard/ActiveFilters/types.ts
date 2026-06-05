export type ActiveFiltersProps = {
  // One label per active filter (e.g. account name, type, time window).
  labels: string[]
  onPress: () => void
}
