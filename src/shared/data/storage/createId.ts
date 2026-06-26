// Monotonic within the process: `Date.now()` gives the millisecond, a wrapping
// counter (0–999) makes ids unique even when many are minted in the same tick —
// e.g. a sync pull inserting a whole list in one synchronous `.map()`. A random
// suffix collides there (birthday paradox), and duplicate ids corrupt the local
// store and the sync baseline (rows keyed by id overwrite each other).
let sequence = 0

export const createId = (): number => {
  sequence = (sequence + 1) % 1000
  return Date.now() * 1000 + sequence
}
