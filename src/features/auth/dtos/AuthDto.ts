// Sign-in / sign-up payloads. Copied verbatim from the web wallet contract.
export type BaseAuthDto<TExtra extends object = object> = {
  email: string
  password: string
} & TExtra

export type AuthDto<TExtra extends object = object> = BaseAuthDto<TExtra> & {
  rememberMe?: boolean
}

// Registration adds the password confirmation (`rPassword`) the backend checks.
export type RegisterDto = BaseAuthDto & {
  rPassword: string
}
