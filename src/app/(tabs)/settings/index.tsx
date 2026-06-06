import { type ReactElement } from "react"

import Page from "#design/templates/Page"
import { SettingsMenu } from "#features/settings"

export default function Settings(): ReactElement {
  return (
    <Page scroll>
      <SettingsMenu />
    </Page>
  )
}
