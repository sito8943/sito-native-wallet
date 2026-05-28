import { type SubscriptionProvider } from "./SubscriptionProvider"

export const INITIAL_SUBSCRIPTION_PROVIDERS: SubscriptionProvider[] = [
  {
    id: "netflix",
    name: "Netflix",
    description: "Streaming service",
    website: "https://netflix.com",
  },
  {
    id: "spotify",
    name: "Spotify",
    description: "Music streaming",
    website: "https://spotify.com",
  },
  {
    id: "icloud",
    name: "iCloud+",
    description: "Cloud storage",
    website: "https://icloud.com",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Code hosting and CI",
    website: "https://github.com",
  },
]
