import { Platform } from "react-native"

const shadows = {
  // Soft, diffuse lift — low opacity + larger blur reads as a gentle elevation
  // instead of a hard outline (which looked like a clipped border on cards).
  card:
    Platform.select({
      android: {
        elevation: 1,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      default: {},
    }) ?? {},
}

export default shadows
