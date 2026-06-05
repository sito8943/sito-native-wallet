import { useRef, useState, type ReactElement } from "react"
import { Modal, Pressable, useWindowDimensions, View } from "react-native"

import Icon, { APP_ICONS } from "#design/elements/Icon"
import IconButton, {
  ICON_BUTTON_SIZE,
  ICON_BUTTON_VARIANT,
} from "#design/elements/IconButton"
import Typography from "#design/elements/Typography"
import { radius, shadows, spacing } from "#design/foundations"
import {
  THEME_COLOR,
  useThemeColors,
  useThemedStyles,
  type ThemeColors,
} from "#design/theme"

import { type ActionMenuProps } from "./types"

// Renders a row of entity actions. `sticky` actions show as visible icon
// buttons; the rest (default) collapse into a 3-dots trigger that opens a
// dropdown anchored beneath it. The dropdown is a Modal so it escapes any
// `overflow: hidden` on the host card.
export default function ActionMenu<T>({
  entity,
  actions,
  color,
  menuLabel,
}: ActionMenuProps<T>): ReactElement | null {
  const colors = useThemeColors()
  const styles = useThemedStyles(createStyles)
  const { width } = useWindowDimensions()
  const triggerRef = useRef<View>(null)
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState<{ top: number; right: number } | null>(
    null,
  )

  const visible = actions.filter((action) => action.hidden !== true)
  const sticky = visible.filter((action) => action.sticky === true)
  const overflow = visible.filter((action) => action.sticky !== true)

  if (visible.length === 0) {
    return null
  }

  // Open right away so the dropdown never waits on layout, then measure the
  // trigger in window space so it lands right under it, right-aligned to its
  // edge. The menu stays invisible until anchored, avoiding a corner flash.
  const openMenu = (): void => {
    setAnchor(null)
    setOpen(true)
    triggerRef.current?.measureInWindow((x, y, w, h) => {
      setAnchor({
        top: y + h + spacing(1),
        right: Math.max(width - (x + w), spacing(2)),
      })
    })
  }

  return (
    <View style={styles.row}>
      {sticky.map((action) => (
        <IconButton
          key={action.id}
          accessibilityLabel={action.accessibilityLabel}
          disabled={action.disabled}
          hitSlop={spacing(2)}
          icon={action.icon}
          color={color}
          onPress={() => {
            action.onPress(entity)
          }}
          size={ICON_BUTTON_SIZE.LG}
          variant={ICON_BUTTON_VARIANT.TEXT}
        />
      ))}

      {overflow.length > 0 && (
        <View ref={triggerRef} collapsable={false}>
          <IconButton
            accessibilityLabel={menuLabel}
            hitSlop={spacing(2)}
            icon={APP_ICONS.more}
            color={color}
            onPress={openMenu}
            size={ICON_BUTTON_SIZE.LG}
            variant={ICON_BUTTON_VARIANT.TEXT}
          />
        </View>
      )}

      <Modal
        animationType="fade"
        navigationBarTranslucent
        onRequestClose={() => {
          setOpen(false)
        }}
        statusBarTranslucent
        transparent
        visible={open}
      >
        {/* Invisible full-screen catcher: tapping anywhere off the menu closes
            it, without dimming the screen behind (dropdown, not a sheet). */}
        <Pressable
          accessibilityLabel={menuLabel}
          style={styles.backdrop}
          onPress={() => {
            setOpen(false)
          }}
        />

        <View
          style={[
            styles.menu,
            anchor ?? styles.menuFallback,
            anchor === null && styles.hidden,
          ]}
        >
          {overflow.map((action) => {
            const tint =
              action.disabled === true
                ? colors[THEME_COLOR.TEXT_SUBTLE]
                : colors[action.color ?? THEME_COLOR.TEXT_STRONG]

            return (
              <Pressable
                key={action.id}
                accessibilityLabel={action.accessibilityLabel}
                disabled={action.disabled}
                style={styles.item}
                onPress={() => {
                  setOpen(false)
                  action.onPress(entity)
                }}
              >
                <Icon icon={action.icon} color={tint} size={spacing(4)} />
                <Typography style={{ color: tint }}>
                  {action.accessibilityLabel}
                </Typography>
              </Pressable>
            )
          })}
        </View>
      </Modal>
    </View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  row: {
    alignItems: "center" as const,
    flexDirection: "row" as const,
    gap: spacing(1),
  },
  backdrop: {
    flex: 1,
  },
  menu: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    minWidth: spacing(40),
    paddingVertical: spacing(1),
    position: "absolute" as const,
    ...shadows.card,
  },
  // Position used for the frame before the trigger is measured; paired with
  // `hidden` so it's never actually painted off-anchor.
  menuFallback: {
    top: spacing(12),
    right: spacing(2),
  },
  hidden: {
    opacity: 0,
  },
  item: {
    alignItems: "center" as const,
    flexDirection: "row" as const,
    gap: spacing(3),
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(3),
  },
})
