export type ChipProps = {
  active: boolean
  label: string
  onPress: () => void
  // When present, renders a trailing "×" that clears this chip's filter
  // (independent of onPress, which still fires when the label is tapped).
  onClear?: () => void
}
