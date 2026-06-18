export type ActiveFilter = {
  label: string
  // When present, the chip shows a "×" that clears just this filter.
  onClear?: () => void
}

export type ActiveFiltersProps = {
  // One entry per active filter (e.g. account name, type, time window).
  items: ActiveFilter[]
  onPress: () => void
}
