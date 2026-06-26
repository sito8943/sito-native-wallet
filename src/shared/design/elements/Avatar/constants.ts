import { type TypographyVariant } from "#design/elements/Typography"
import { spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"

export const AVATAR_SIZE = {
  MD: "md",
  LG: "lg",
} as const

// Diameter + the initials text variant that fits inside it.
export const AVATAR_DIMENSIONS: Record<
  (typeof AVATAR_SIZE)[keyof typeof AVATAR_SIZE],
  { diameter: number; textVariant: TypographyVariant }
> = {
  [AVATAR_SIZE.MD]: {
    diameter: spacing(10),
    textVariant: TYPOGRAPHY_VARIANT.BODY_STRONG,
  },
  [AVATAR_SIZE.LG]: {
    diameter: spacing(14),
    textVariant: TYPOGRAPHY_VARIANT.TITLE,
  },
}
