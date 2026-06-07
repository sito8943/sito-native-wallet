import { type SubscriptionProviderPrefab } from "./types"

export const SUBSCRIPTION_PROVIDER_PREFABS: SubscriptionProviderPrefab[] = [
  {
    key: "netflix",
    name: "Netflix",
    description: { en: "Streaming service", es: "Servicio de streaming" },
    website: "https://netflix.com",
  },
  {
    key: "spotify",
    name: "Spotify",
    description: { en: "Music streaming", es: "Streaming de música" },
    website: "https://spotify.com",
  },
  {
    key: "icloud",
    name: "iCloud+",
    description: { en: "Cloud storage", es: "Almacenamiento en la nube" },
    website: "https://icloud.com",
  },
  {
    key: "github",
    name: "GitHub",
    description: {
      en: "Code hosting and CI",
      es: "Alojamiento de código e integración continua",
    },
    website: "https://github.com",
  },
  {
    key: "youtube-premium",
    name: "YouTube Premium",
    description: {
      en: "Ad-free video and music",
      es: "Vídeo y música sin anuncios",
    },
    website: "https://youtube.com/premium",
  },
  {
    key: "disney-plus",
    name: "Disney+",
    description: { en: "Streaming service", es: "Servicio de streaming" },
    website: "https://disneyplus.com",
  },
  {
    key: "amazon-prime",
    name: "Amazon Prime",
    description: {
      en: "Shipping, video and music",
      es: "Envíos, vídeo y música",
    },
    website: "https://amazon.com/prime",
  },
  {
    key: "notion",
    name: "Notion",
    description: {
      en: "Notes and docs workspace",
      es: "Espacio de notas y documentos",
    },
    website: "https://notion.so",
  },
  {
    key: "chatgpt-plus",
    name: "ChatGPT Plus",
    description: {
      en: "AI assistant subscription",
      es: "Suscripción de asistente de IA",
    },
    website: "https://openai.com",
  },
  {
    key: "google-one",
    name: "Google One",
    description: {
      en: "Cloud storage and backup",
      es: "Almacenamiento y copias en la nube",
    },
    website: "https://one.google.com",
  },
]
