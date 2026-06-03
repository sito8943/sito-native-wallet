export const toError = (error: unknown, fallback: string): Error =>
  error instanceof Error ? error : new Error(fallback)

export const nowIso = (): string => new Date().toISOString()
