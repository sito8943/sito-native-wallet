import { type ButtonProps } from "#design/elements/Button"

export type EmptyAction = Omit<ButtonProps, "accessibilityLabel"> & {
  accessibilityLabel?: string
}

export type EmptyProps = {
  message: string
  actions?: EmptyAction[]
}
