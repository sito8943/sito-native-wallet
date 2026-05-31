import {
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native"

export type TextFieldProps = Omit<TextInputProps, "style"> & {
  label?: string
  error?: string
  containerStyle?: StyleProp<ViewStyle>
}
