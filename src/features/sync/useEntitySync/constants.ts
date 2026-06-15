// Wait this long after the last local change before pushing, so editing a row's
// fields doesn't fire a request per keystroke.
export const PUSH_DEBOUNCE_MS = 800
