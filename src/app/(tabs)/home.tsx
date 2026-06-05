import { type ReactElement } from "react"

import Typography from "#design/elements/Typography"
import { TYPOGRAPHY_VARIANT } from "#design/foundations"
import Page from "#design/templates/Page"
import { DashboardGrid } from "#shared/dashboard"
import { useI18n } from "#shared/i18n"

export default function Home(): ReactElement {
  const { t } = useI18n()

  return (
    <Page scroll topInset>
      <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
        {t("home.title")}
      </Typography>
      <DashboardGrid />
    </Page>
  )
}
