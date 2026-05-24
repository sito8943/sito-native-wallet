import { type ReactElement } from "react"
import { Platform, StyleSheet, View } from "react-native"

import { type CardPropsType } from "./types"

export default function Card({ children }: CardPropsType): ReactElement {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    marginHorizontal: 16,
    marginVertical: 8,

    borderRadius: 20,
    backgroundColor: "#ffffff",

    shadowColor: "#000",
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
    }),
  },
})
