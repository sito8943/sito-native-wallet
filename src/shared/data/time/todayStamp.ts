// Local YYYY/MM/DD for today, matching the app's stored date format (used by
// transaction dates, demo data, balance adjustments, …).
export const todayStamp = (): string => {
  const now = new Date()
  const month = `${now.getMonth() + 1}`.padStart(2, "0")
  const day = `${now.getDate()}`.padStart(2, "0")

  return `${now.getFullYear()}/${month}/${day}`
}
