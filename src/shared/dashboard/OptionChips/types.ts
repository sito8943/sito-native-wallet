export type OptionChoice<V extends number | string> = {
  value: V
  label: string
}

export type OptionChipsProps<V extends number | string> = {
  options: Array<OptionChoice<V>>
  value: V
  onSelect: (value: V) => void
}
