import { type StyleProp, type ViewStyle } from "react-native"

export type SelectOption = {
  id: number
  label: string
}

// Single, required selection from a fixed list. No search or clear — for a
// searchable / clearable field use Autocomplete instead.
export type SelectProps = {
  label?: string
  placeholder?: string
  options: SelectOption[]
  value: number
  onChange: (value: number) => void
  disabled?: boolean
  error?: string
  containerStyle?: StyleProp<ViewStyle>
}
