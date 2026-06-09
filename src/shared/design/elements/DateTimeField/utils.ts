const pad = (value: number): string => `${value}`.padStart(2, "0")

// Display only — mirrors the app's "YYYY/MM/DD HH:mm" stamp format.
export const display = (date: Date): string =>
  `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ` +
  `${pad(date.getHours())}:${pad(date.getMinutes())}`
