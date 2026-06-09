import { type StyleProp, type ViewStyle } from "react-native"

export type DateTimeFieldProps = {
  label?: string
  // Current value; null shows the placeholder.
  value: Date | null
  onChange: (date: Date) => void
  error?: string
  placeholder?: string
  containerStyle?: StyleProp<ViewStyle>
}
