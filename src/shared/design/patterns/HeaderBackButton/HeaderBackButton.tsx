import { useRouter } from "expo-router"
import { type ReactElement } from "react"

import { APP_ICONS } from "#design/elements/Icon"
import IconButton, {
  ICON_BUTTON_SIZE,
  ICON_BUTTON_VARIANT,
} from "#design/elements/IconButton"
import { spacing } from "#design/foundations"
import { useThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"

import { type HeaderBackButtonProps } from "./types"

// Section index screens (accounts/currencies/…) are nested stacks that can be
// reached two ways: from settings/index (a real parent exists → pop), or via a
// deep push from another tab (no parent in this stack → native shows no back).
// This always renders a back control, falling back to a navigate when the stack
// can't pop, so the user is never stranded.
export default function HeaderBackButton({
  fallback,
}: HeaderBackButtonProps): ReactElement {
  const router = useRouter()
  const colors = useThemeColors()
  const { t } = useI18n()

  const goBack = (): void => {
    if (router.canGoBack()) {
      router.back()
      return
    }
    router.replace(fallback)
  }

  return (
    <IconButton
      accessibilityLabel={t("common.back")}
      icon={APP_ICONS.back}
      iconColor={colors.textStrong}
      hitSlop={spacing(2)}
      onPress={goBack}
      variant={ICON_BUTTON_VARIANT.TEXT}
      size={ICON_BUTTON_SIZE.LG}
    />
  )
}
