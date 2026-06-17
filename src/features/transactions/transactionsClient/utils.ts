// Date mapping between the app's local stamp ("YYYY/MM/DD HH:mm", see
// #shared/data/time) and the backend's ISO LocalDateTime ("YYYY-MM-DDTHH:mm:ss").
// Done as string transforms (not via Date) to keep the wall-clock time exact and
// avoid timezone shifts in either direction.

// "YYYY/MM/DD HH:mm" (or legacy "YYYY/MM/DD") -> "YYYY-MM-DDTHH:mm:00".
export const stampToIso = (stamp: string): string => {
  const [datePart, timePart] = stamp.trim().split(" ")
  const date = datePart.replaceAll("/", "-")
  const time = timePart ?? "00:00"
  return `${date}T${time}:00`
}

// Backend ISO ("YYYY-MM-DDTHH:mm:ss(.SSS)(Z)") -> local stamp "YYYY/MM/DD HH:mm".
export const isoToStamp = (iso: string): string => {
  const [datePart, timePart] = iso.trim().split("T")
  const date = datePart.replaceAll("-", "/")
  const time = (timePart ?? "00:00").slice(0, 5)
  return `${date} ${time}`
}
