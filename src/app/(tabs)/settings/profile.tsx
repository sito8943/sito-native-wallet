import { useMemo, type ReactElement } from "react"
import { Pressable, View } from "react-native"

import Card from "#design/elements/Card"
import Icon, { APP_ICONS } from "#design/elements/Icon"
import TextField from "#design/elements/TextField"
import Typography, { TYPOGRAPHY_TONE } from "#design/elements/Typography"
import {
  borderWidth,
  radius,
  spacing,
  TYPOGRAPHY_VARIANT,
} from "#design/foundations"
import Select from "#design/patterns/Select"
import Page from "#design/templates/Page"
import {
  THEME_PREFERENCE,
  useThemeColors,
  useThemedStyles,
  useThemePreference,
  type ThemeColors,
  type ThemePreference,
} from "#design/theme"
import { useProfileInfo, profileInitials } from "#features/settings/ProfileInfo"
import { LANGUAGE, useI18n, type Language } from "#shared/i18n"

const APPEARANCE_OPTIONS: Array<{
  labelKey:
    | "profile.appearance.light"
    | "profile.appearance.dark"
    | "profile.appearance.system"
  value: ThemePreference
}> = [
  { labelKey: "profile.appearance.light", value: THEME_PREFERENCE.LIGHT },
  { labelKey: "profile.appearance.dark", value: THEME_PREFERENCE.DARK },
  { labelKey: "profile.appearance.system", value: THEME_PREFERENCE.SYSTEM },
]

const LANGUAGE_OPTIONS: Array<{
  labelKey: "profile.language.english" | "profile.language.spanish"
  value: Language
}> = [
  { labelKey: "profile.language.english", value: LANGUAGE.EN },
  { labelKey: "profile.language.spanish", value: LANGUAGE.ES },
]

export default function Profile(): ReactElement {
  const styles = useThemedStyles(createStyles)
  const colors = useThemeColors()
  const { preference, setPreference } = useThemePreference()
  const { isLoading, language, setLanguage, t } = useI18n()
  const { data: profile, setData: setProfile } = useProfileInfo()
  const initials = profileInitials(profile.name)
  const languageOptions = useMemo(
    () =>
      LANGUAGE_OPTIONS.map((option, index) => ({
        id: index + 1,
        label: t(option.labelKey),
      })),
    [t],
  )
  const selectedLanguageId = language === LANGUAGE.EN ? 1 : 2

  return (
    <Page scroll>
      <Card>
        <View style={styles.identity}>
          <View style={styles.avatar}>
            {initials ? (
              <Typography
                variant={TYPOGRAPHY_VARIANT.TITLE}
                tone={TYPOGRAPHY_TONE.INVERTED}
              >
                {initials}
              </Typography>
            ) : (
              <Icon icon={APP_ICONS.profile} color={colors.textInverted} />
            )}
          </View>
          <View style={styles.identityCopy}>
            <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
              {t("profile.info.title")}
            </Typography>
            <Typography tone={TYPOGRAPHY_TONE.MUTED}>
              {t("profile.info.description")}
            </Typography>
          </View>
        </View>

        <View style={styles.fields}>
          <TextField
            label={t("profile.info.name")}
            placeholder={t("profile.info.namePlaceholder")}
            value={profile.name}
            onChangeText={(name) => {
              setProfile((current) => ({ ...current, name }))
            }}
          />
        </View>
      </Card>

      <Card>
        <View style={styles.copy}>
          <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
            {t("profile.appearance.title")}
          </Typography>
          <Typography tone={TYPOGRAPHY_TONE.MUTED}>
            {t("profile.appearance.description")}
          </Typography>
        </View>

        <View style={styles.segments}>
          {APPEARANCE_OPTIONS.map((option) => {
            const active = preference === option.value
            return (
              <Pressable
                key={option.value}
                onPress={() => {
                  setPreference(option.value)
                }}
                style={[
                  styles.segment,
                  active ? styles.segmentActive : styles.segmentInactive,
                ]}
              >
                <Typography
                  variant={TYPOGRAPHY_VARIANT.LABEL}
                  tone={
                    active ? TYPOGRAPHY_TONE.INVERTED : TYPOGRAPHY_TONE.DEFAULT
                  }
                >
                  {t(option.labelKey)}
                </Typography>
              </Pressable>
            )
          })}
        </View>
      </Card>

      <Card>
        <View style={styles.copy}>
          <Typography variant={TYPOGRAPHY_VARIANT.TITLE}>
            {t("profile.language.title")}
          </Typography>
          <Typography tone={TYPOGRAPHY_TONE.MUTED}>
            {t("profile.language.description")}
          </Typography>
        </View>

        <Select
          label={t("profile.language.title")}
          placeholder={t("profile.language.placeholder")}
          options={languageOptions}
          value={selectedLanguageId}
          disabled={isLoading}
          onChange={(optionId) => {
            setLanguage(optionId === 1 ? LANGUAGE.EN : LANGUAGE.ES)
          }}
        />
      </Card>
    </Page>
  )
}

const createStyles = (colors: ThemeColors) => ({
  copy: {
    gap: spacing(2),
    marginBottom: spacing(4),
  },
  identity: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: spacing(4),
    marginBottom: spacing(4),
  },
  identityCopy: {
    flex: 1,
    gap: spacing(1),
  },
  avatar: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
    width: spacing(14),
    height: spacing(14),
    paddingTop: spacing(1),
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  fields: {
    gap: spacing(4),
  },
  segments: {
    flexDirection: "row" as const,
    gap: spacing(3),
  },
  segment: {
    alignItems: "center" as const,
    borderRadius: radius.full,
    borderWidth: borderWidth.thin,
    flex: 1,
    paddingHorizontal: spacing(3),
    paddingVertical: spacing(2),
  },
  segmentActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  segmentInactive: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
})
