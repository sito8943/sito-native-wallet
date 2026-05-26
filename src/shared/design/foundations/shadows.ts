import { Platform } from "react-native"

const shadows = {
  card:
    Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      default: {},
    }) ?? {},
}

export default shadows
