import { type ReactElement } from "react"

import Typography from "#design/elements/Typography"
import Page from "#design/templates/Page"

export default function Home(): ReactElement {
  return (
    <Page scroll>
      <Typography>Home</Typography>
    </Page>
  )
}
