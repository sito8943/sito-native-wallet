import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Logo from "#design/elements/Logo"
import { spacing } from "#design/foundations"

// Brand mark shown above the auth forms.
export default function AuthHeader(): ReactElement {
  return (
    <View style={styles.container}>
      <Logo size={80} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: spacing(2),
  },
})
