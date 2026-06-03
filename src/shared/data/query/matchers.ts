// Case-insensitive "contains" used by entity filter predicates. A blank or
// undefined query matches everything (the filter is considered unset).
export const textIncludes = (
  value: string | undefined,
  query: string | undefined,
): boolean => {
  if (query === undefined || query.trim() === "") {
    return true
  }

  return (value ?? "").toLowerCase().includes(query.trim().toLowerCase())
}
