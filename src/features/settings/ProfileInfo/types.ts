// Local-first user identity. The web wallet's ProfileDto carries name,
// description, photo and language; photo needs a native image picker (avoided
// here) and language already lives in ProfilePreferences, so this keeps just
// the editable text identity.
export type ProfileInfo = {
  name: string
  description: string
}
