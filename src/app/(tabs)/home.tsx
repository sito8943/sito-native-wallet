import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import Page from "#design/templates/Page"
import { DashboardAddFab, DashboardGrid } from "#features/dashboard"
import { useI18n } from "#shared/i18n"

export default function Home(): ReactElement {
  const { t } = useI18n()

  return (
    <View style={styles.screen}>
      <Page topInset>
        <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
          {t("home.title")}
        </Typography>
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
