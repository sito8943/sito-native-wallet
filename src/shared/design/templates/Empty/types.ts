import { type ButtonProps } from "#design/elements/Button"

export type EmptyAction = ButtonProps

export type EmptyProps = {
  message: string
  actions?: EmptyAction[]
}
