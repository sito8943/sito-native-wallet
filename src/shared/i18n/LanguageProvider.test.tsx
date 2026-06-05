import AsyncStorage from "@react-native-async-storage/async-storage"
import { render } from "@testing-library/react-native"
import { Text } from "react-native"

import { LanguageProvider } from "./LanguageProvider"
import { useI18n } from "./useI18n"

function Consumer(): React.ReactElement {
  const { t, language } = useI18n()
  return <Text>{`${language}:${t("common.save")}`}</Text>
}

describe("i18n > LanguageProvider", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    jest.clearAllMocks()
  })

  it("provides a working translator and the active language to consumers", async () => {
    const { findByText } = render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>,
    )

    // Default profile language is English, so `t` resolves the English copy.
    expect(await findByText("en:Save")).toBeTruthy()
  })
})
