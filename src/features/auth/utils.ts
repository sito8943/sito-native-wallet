// Loose email shape check for the auth forms — the backend is the real
// authority; this just catches obvious typos before submit.
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
