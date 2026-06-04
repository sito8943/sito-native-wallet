import { type StyleProp, type ViewStyle } from "react-native"

export type AutocompleteOption = {
  id: number
  label: string
}

type AutocompleteBaseProps = {
  label?: string
  placeholder?: string
  options: AutocompleteOption[]
  error?: string
  // Locks the field: shows the current value but blocks opening, searching and
  // clearing. Used for values the user may view but not change.
  disabled?: boolean
  containerStyle?: StyleProp<ViewStyle>
  // Debounce the query before it drives filtering / onSearch. Use when the
  // option list is fetched from an API.
  debounceMs?: number
  // Fired with the debounced query, e.g. to fetch matching options.
  onSearch?: (query: string) => void
}

// Single or multiple selection, keyed by option id to match form DTOs.
export type AutocompleteProps =
  | (AutocompleteBaseProps & {
      multiple?: false
      value: number
      onChange: (value: number) => void
    })
  | (AutocompleteBaseProps & {
      multiple: true
      value: number[]
      onChange: (value: number[]) => void
    })
