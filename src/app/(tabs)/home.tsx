import { type ReactElement } from "react"

import Typography from "#design/elements/Typography"
import Page from "#design/templates/Page"
import { useI18n } from "#shared/i18n"

export default function Home(): ReactElement {
  const { t } = useI18n()

  return (
    <Page scroll topInset>
      <Typography>{t("home.title")}</Typography>
    </Page>
  )
}
