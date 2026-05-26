import colors from "./colors"

const typography = {
  display: {
    color: colors.textStrong,
    fontSize: 24,
    fontWeight: "700",
  },
  title: {
    color: colors.textStrong,
    fontSize: 18,
    fontWeight: "700",
  },
  body: {
    color: colors.textStrong,
    fontSize: 16,
  },
  bodyStrong: {
    color: colors.textStrong,
    fontSize: 16,
    fontWeight: "700",
  },
  caption: {
    color: colors.textMuted,
    fontSize: 12,
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  subtle: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "700",
  },
} as const

export default typography
