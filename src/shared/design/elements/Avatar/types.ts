import { type AVATAR_SIZE } from "./constants"

export type AvatarSize = (typeof AVATAR_SIZE)[keyof typeof AVATAR_SIZE]

export type AvatarProps = {
  // Up to two letters; when empty a generic profile icon is shown instead.
  initials?: string
  size?: AvatarSize
}
