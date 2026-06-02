import spacing from "./spacing"

export const TYPOGRAPHY_VARIANT = {
  DISPLAY: "display",
  TITLE: "title",
  BODY: "body",
  BODY_STRONG: "bodyStrong",
  CAPTION: "caption",
  LABEL: "label",
  SUBTLE: "subtle",
} as const

const typography = {
  [TYPOGRAPHY_VARIANT.DISPLAY]: {
    fontSize: spacing(6),
    fontWeight: "700",
  },
  [TYPOGRAPHY_VARIANT.TITLE]: {
    fontSize: spacing(5),
    fontWeight: "700",
  },
  [TYPOGRAPHY_VARIANT.BODY]: {
    fontSize: spacing(4),
  },
  [TYPOGRAPHY_VARIANT.BODY_STRONG]: {
    fontSize: spacing(4),
    fontWeight: "700",
  },
  [TYPOGRAPHY_VARIANT.CAPTION]: {
    fontSize: spacing(3),
  },
  [TYPOGRAPHY_VARIANT.LABEL]: {
    fontSize: spacing(3),
    fontWeight: "700",
    textTransform: "uppercase",
  },
  [TYPOGRAPHY_VARIANT.SUBTLE]: {
    fontSize: spacing(3),
    fontWeight: "700",
  },
} as const

export default typography
