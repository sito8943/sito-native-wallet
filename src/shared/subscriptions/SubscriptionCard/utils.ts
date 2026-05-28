export function renewalLabel(days: number): string {
  if (days < 0) return `overdue ${Math.abs(days)}d`
  if (days === 0) return "renews today"
  if (days === 1) return "renews tomorrow"
  return `renews in ${days} days`
}
