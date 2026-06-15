import NetInfo from "@react-native-community/netinfo"
import { useEffect, useState } from "react"

export default function useIsOnline(): boolean {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // Trust the OS connection flag only. `isInternetReachable` comes from a
      // probe to a remote host (e.g. Google's generate_204) that can falsely
      // report `false` on emulators or networks that block it — which wrongly
      // flagged the app "offline" even with a working connection and a
      // reachable LAN server. Treat only an explicit disconnect as offline
      // (`isConnected` may be null/unknown → assume online).
      setIsOnline(state.isConnected !== false)
    })

    return unsubscribe
  }, [])

  return isOnline
}
