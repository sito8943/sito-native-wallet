import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Page from "#design/templates/Page"
import { DashboardAddFab, DashboardGrid } from "#features/dashboard"

export default function Home(): ReactElement {
  return (
    <View style={styles.screen}>
      <Page>
        <DashboardGrid />
      </Page>
      <DashboardAddFab />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
