// Body for POST /auth/password/change (Bearer): the backend identifies the user
// from the token; it only needs the current password (re-auth) and the new one.
export type ChangePasswordDto = {
  currentPassword: string
  newPassword: string
}
