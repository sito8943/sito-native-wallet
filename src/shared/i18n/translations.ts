import { LANGUAGE } from "./constants"

export const translations = {
  [LANGUAGE.EN]: {
    "nav.home": "Home",
    "nav.transactions": "Transactions",
    "nav.subscriptions": "Subscriptions",
    "nav.settings": "Settings",
    "home.title": "Home",
    "settings.title": "Settings",
    "settings.profile.title": "Profile",
    "settings.menu.profile": "Profile",
    "settings.menu.accounts": "Accounts",
    "settings.menu.subscriptionProviders": "Subscription Providers",
    "settings.menu.categories": "Categories",
    "settings.menu.currencies": "Currencies",
    "profile.appearance.title": "Appearance",
    "profile.appearance.description":
      "Choose how SitoWallet looks. System follows your device setting.",
    "profile.appearance.light": "Light",
    "profile.appearance.dark": "Dark",
    "profile.appearance.system": "System",
    "profile.language.title": "Language",
    "profile.language.description":
      "Choose the language used across the app interface.",
    "profile.language.english": "English",
    "profile.language.spanish": "Spanish",
  },
  [LANGUAGE.ES]: {
    "nav.home": "Inicio",
    "nav.transactions": "Transacciones",
    "nav.subscriptions": "Suscripciones",
    "nav.settings": "Ajustes",
    "home.title": "Inicio",
    "settings.title": "Ajustes",
    "settings.profile.title": "Perfil",
    "settings.menu.profile": "Perfil",
    "settings.menu.accounts": "Cuentas",
    "settings.menu.subscriptionProviders": "Proveedores de suscripciones",
    "settings.menu.categories": "Categorias",
    "settings.menu.currencies": "Monedas",
    "profile.appearance.title": "Apariencia",
    "profile.appearance.description":
      "Elige como se ve SitoWallet. Sistema sigue la configuracion de tu dispositivo.",
    "profile.appearance.light": "Claro",
    "profile.appearance.dark": "Oscuro",
    "profile.appearance.system": "Sistema",
    "profile.language.title": "Idioma",
    "profile.language.description":
      "Elige el idioma usado en la interfaz de la aplicacion.",
    "profile.language.english": "Ingles",
    "profile.language.spanish": "Espanol",
  },
} as const
