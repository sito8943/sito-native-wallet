import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"

import { type UseStoredStateOptions, type UseStoredStateResult } from "./types"
import { toError } from "./utils"

export default function useStoredState<T>({
  errorMessage,
  initialValue,
  parseStoredValue,
  storageKey,
}: UseStoredStateOptions<T>): UseStoredStateResult<T> {
  const [data, setData] = useState<T>(initialValue)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    void (async () => {
      try {
        const cachedValue = await AsyncStorage.getItem(storageKey)

        if (!isMounted || !cachedValue) {
          return
        }

        setData(parseStoredValue(JSON.parse(cachedValue)))
      } catch (error) {
        if (isMounted) {
          setError(toError(error, errorMessage))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    })()

    return () => {
      isMounted = false
    }
  }, [errorMessage, parseStoredValue, storageKey])

  useEffect(() => {
    if (isLoading) {
      return
    }

    void AsyncStorage.setItem(storageKey, JSON.stringify(data)).catch(
      (error: unknown) => {
        setError(toError(error, errorMessage))
      },
    )
  }, [data, errorMessage, isLoading, storageKey])

  return {
    data,
    error,
    isLoading,
    setData,
  }
}
