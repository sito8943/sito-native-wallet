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
    fontSize: 24,
    fontWeight: "700",
  },
  [TYPOGRAPHY_VARIANT.TITLE]: {
    fontSize: 18,
    fontWeight: "700",
  },
  [TYPOGRAPHY_VARIANT.BODY]: {
    fontSize: 16,
  },
  [TYPOGRAPHY_VARIANT.BODY_STRONG]: {
    fontSize: 16,
    fontWeight: "700",
  },
  [TYPOGRAPHY_VARIANT.CAPTION]: {
    fontSize: 12,
  },
  [TYPOGRAPHY_VARIANT.LABEL]: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  [TYPOGRAPHY_VARIANT.SUBTLE]: {
    fontSize: 14,
    fontWeight: "700",
  },
} as const

export default typography
