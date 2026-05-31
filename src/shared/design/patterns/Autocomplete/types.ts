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
