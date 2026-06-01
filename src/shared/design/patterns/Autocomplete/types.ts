import { type StyleProp, type ViewStyle } from "react-native"

export type AutocompleteOption = {
  id: string
  label: string
}

type AutocompleteBaseProps = {
  label?: string
  placeholder?: string
  options: AutocompleteOption[]
  error?: string
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
      value: string | null
      onChange: (value: string | null) => void
    })
  | (AutocompleteBaseProps & {
      multiple: true
      value: string[]
      onChange: (value: string[]) => void
    })
