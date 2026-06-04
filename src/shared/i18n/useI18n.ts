import { useContext } from "react"

import { I18nContext } from "./I18nContext"
import { type I18nContextValue } from "./types"

export const useI18n = (): I18nContextValue => useContext(I18nContext)
