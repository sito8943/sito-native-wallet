import NetInfo from "@react-native-community/netinfo"
import { useEffect, useState } from "react"

export default function useIsOnline(): boolean {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const reachable = state.isInternetReachable
      setIsOnline(state.isConnected === true && reachable !== false)
    })

    return unsubscribe
  }, [])

  return isOnline
}
