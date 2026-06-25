import { useRouter } from "expo-router"
import { useCallback, useRef, useState, type ReactElement } from "react"
import {
  FlatList,
  useWindowDimensions,
  View,
  type LayoutChangeEvent,
  type ListRenderItemInfo,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import Button, { BUTTON_VARIANT } from "#design/elements/Button"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import { radius, spacing, TYPOGRAPHY_VARIANT } from "#design/foundations"
import { useThemedStyles, type ThemeColors } from "#design/theme"
import { useI18n } from "#shared/i18n"

import OnboardingStep, {
  type OnboardingStepDefinition,
} from "../OnboardingStep"
import { useOnboarding } from "../useOnboarding"

import { ONBOARDING_STEPS } from "./constants"

// First-run wizard. A paged horizontal FlatList drives native swiping (the
// codebase intentionally avoids GestureHandlerRootView), while the footer
// buttons scroll the same list so both stay in sync. Finishing or skipping
// marks onboarding complete and hands control to the app.
export default function OnboardingWizard(): ReactElement {
  const { t } = useI18n()
  const router = useRouter()
  const styles = useThemedStyles(createStyles)
  const { complete } = useOnboarding()

  const window = useWindowDimensions()
  const listRef = useRef<FlatList<OnboardingStepDefinition>>(null)
  const [index, setIndex] = useState(0)
  // Seed from the window so the pager mounts on the first frame; onLayout then
  // refines to the carousel's exact box (it sits below the top bar / footer).
  const [size, setSize] = useState({
    width: window.width,
    height: window.height,
  })

  const total = ONBOARDING_STEPS.length
  const isLast = index === total - 1

  const finish = useCallback(() => {
    complete()
    // Seed a first-run default currency + account so a brand-new device isn't an
    // empty shell. Lazily imported (dynamic, not top-level): pulling the accounts
    // feature + Manager graph into onboarding's eager imports would drag the
    // whole entity-client + AsyncStorage graph into the boot path. Fire-and-
    // forget — the stores are reactive, so /home shows the account once it lands.
    void import("#features/accounts/seedDefaultAccount").then(
      ({ seedDefaultAccount }) => seedDefaultAccount(),
    )
    router.replace("/home")
  }, [complete, router])

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(next, total - 1))
      listRef.current?.scrollToIndex({ index: clamped, animated: true })
      setIndex(clamped)
    },
    [total],
  )

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setSize({ width, height })
  }, [])

  const handleMomentumEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (size.width === 0) {
        return
      }

      setIndex(Math.round(event.nativeEvent.contentOffset.x / size.width))
    },
    [size.width],
  )

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<OnboardingStepDefinition>) => (
      <OnboardingStep step={item} width={size.width} height={size.height} />
    ),
    [size.width, size.height],
  )

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.topBar}>
        {!isLast && (
          <Typography
            variant={TYPOGRAPHY_VARIANT.BODY_STRONG}
            tone={TYPOGRAPHY_TONE.SUBTLE}
            onPress={finish}
            accessibilityRole="button"
            style={styles.skip}
          >
            {t("onboarding.action.skip")}
          </Typography>
        )}
      </View>

      <View style={styles.carousel} onLayout={handleLayout}>
        {size.width > 0 && (
          <FlatList
            ref={listRef}
            data={ONBOARDING_STEPS}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleMomentumEnd}
            getItemLayout={(_data, i) => ({
              length: size.width,
              offset: size.width * i,
              index: i,
            })}
          />
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {ONBOARDING_STEPS.map((step, i) => (
            <View
              key={step.key}
              style={[styles.dot, i === index && styles.dotActive]}
            />
          ))}
        </View>

        <Typography
          variant={TYPOGRAPHY_VARIANT.CAPTION}
          tone={TYPOGRAPHY_TONE.SUBTLE}
        >
          {t("onboarding.progress", { current: index + 1, total })}
        </Typography>

        <View style={styles.actions}>
          {index > 0 && (
            <Button
              variant={BUTTON_VARIANT.OUTLINED}
              accessibilityLabel={t("onboarding.action.back")}
              onPress={() => {
                goTo(index - 1)
              }}
              style={styles.actionButton}
            >
              {t("onboarding.action.back")}
            </Button>
          )}

          <Button
            accessibilityLabel={
              isLast
                ? t("onboarding.action.getStarted")
                : t("onboarding.action.next")
            }
            onPress={() => {
              if (isLast) {
                finish()
                return
              }

              goTo(index + 1)
            }}
            style={styles.actionButton}
          >
            {isLast
              ? t("onboarding.action.getStarted")
              : t("onboarding.action.next")}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

const createStyles = (colors: ThemeColors) => ({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  topBar: {
    alignItems: "flex-end" as const,
    justifyContent: "center" as const,
    minHeight: spacing(11),
    paddingHorizontal: spacing(4),
  },
  skip: {
    padding: spacing(2),
  },
  carousel: {
    flex: 1,
  },
  footer: {
    alignItems: "center" as const,
    gap: spacing(4),
    paddingBottom: spacing(4),
    paddingHorizontal: spacing(4),
    paddingTop: spacing(2),
  },
  dots: {
    flexDirection: "row" as const,
    gap: spacing(2),
  },
  dot: {
    backgroundColor: colors.border,
    borderRadius: radius.full,
    height: spacing(2),
    width: spacing(2),
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: spacing(6),
  },
  actions: {
    flexDirection: "row" as const,
    gap: spacing(3),
    width: "100%" as const,
  },
  actionButton: {
    flex: 1,
  },
})
