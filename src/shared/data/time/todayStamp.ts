// App date format: local "YYYY/MM/DD HH:mm". Used by transaction dates, balance
// adjustments, … The time component keeps same-day records sorting correctly;
// the format stays lexicographically sortable (string compare = date then time).

const pad = (value: number): string => `${value}`.padStart(2, "0")

// Date -> "YYYY/MM/DD HH:mm".
export const formatStamp = (date: Date): string =>
  `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ` +
  `${pad(date.getHours())}:${pad(date.getMinutes())}`

// "YYYY/MM/DD HH:mm" (or legacy "YYYY/MM/DD") -> local Date. Parsed by hand
// because RN/Hermes doesn't reliably parse the slash format with a time.
export const parseStamp = (stamp: string): Date => {
  const [datePart, timePart] = stamp.trim().split(" ")
  const [year, month, day] = datePart.split("/").map(Number)
  const [hours, minutes] = (timePart ?? "00:00").split(":").map(Number)

  return new Date(year, (month ?? 1) - 1, day ?? 1, hours ?? 0, minutes ?? 0)
}

// "YYYY/MM/DD HH:mm" for now.
export const todayStamp = (): string => formatStamp(new Date())
