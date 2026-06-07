# SitoWallet

SitoWallet is a mobile app for tracking personal finances. It lets you see your current balance, add income and expenses, manage multiple accounts and currencies, categorize transactions, and keep an eye on recurring subscriptions.

The app is offline-first, so your data is saved on the device and the main features keep working even without an internet connection.

## Technical Overview

SitoWallet is an Expo SDK 56 React Native app built with TypeScript and expo-router.

The project uses a feature-first structure. Route files live in `src/app`, while the actual app logic is split between `src/features` and `src/shared`. Each feature is kept as a small self-contained module with an `index.ts` file that exposes what the rest of the app can use.

Imports are handled through aliases like `#features/*`, `#shared/*`, and `#design/*`, instead of long relative paths.

The app is local-first. Data is stored through a `StorageClient` backed by `AsyncStorage`, so the persistence layer is separated from the UI and domain logic. This makes it easier to replace local storage with an API later.

It also tracks connectivity to show an offline banner and uses local notifications for subscription reminders.

**Tech stack**

- **Runtime / framework:** Expo SDK 56, React Native 0.85, React 19
- **Language:** TypeScript
- **Routing:** expo-router (typed routes, file-based)
- **State / forms:** React hooks, react-hook-form
- **Persistence:** `@react-native-async-storage/async-storage` (local-first)
- **Connectivity:** `@react-native-community/netinfo`
- **Notifications:** `expo-notifications` (subscription reminders)
- **UI:** react-native-reanimated, gesture-handler, safe-area-context, react-native-svg, FontAwesome icons
- **i18n:** in-house translations under `src/shared/i18n`
- **Tooling:** Jest + `@testing-library/react-native`, ESLint, Prettier, Knip
- **External services:** [EAS](https://docs.expo.dev/eas/) (Expo Application Services) for cloud builds/submission

## Getting Started

### Prerequisites

- **Node 24** — see `.nvmrc` and run `nvm use`
- npm
- For local device/simulator builds:
  - a **dev client** / custom development build
  - Xcode for iOS or Android Studio for Android
- **Expo Go is not supported** because the app uses native modules that Expo Go does not include:
  - `expo-notifications`
  - `expo-dev-client`
  - `@react-native-community/netinfo`
- For cloud builds:
  - an [Expo account](https://expo.dev/)
  - `eas-cli` installed globally: `npm i -g eas-cli`

### Setup

This app needs a dev build. Expo Go will crash on launch because it does not include all the native modules used by the app.

```bash
nvm use
npm install

# First time, or after adding/changing a native module:
# build and install the dev client on a simulator/device.
npx expo run:ios
# or
npx expo run:android

# No local native toolchain?
# Create a cloud development build instead:
# eas build --profile development --platform ios

# Day-to-day development:
# start the dev server and open it from the installed dev build.
npx expo start --dev-client
```

### Environment variables

None required. The app is local-first and stores all data on-device — there are no secrets or API keys to configure for local development. Cloud builds use the EAS `projectId` already set in `app.json`; building/submitting only requires being logged in to your own Expo account (`eas login`).

### Commands

| Command                   | Purpose                                         |
| ------------------------- | ----------------------------------------------- |
| `npm start`               | Start the Expo dev server                       |
| `npm test`                | Run Jest in watch mode                          |
| `npm run test:ci`         | Run tests once with coverage                    |
| `npm run lint`            | Full gate: typecheck + eslint + prettier + knip |
| `npm run lint:fix`        | Auto-fix ESLint issues                          |
| `npm run prettier:format` | Format the codebase                             |
| `npm run build`           | Trigger an EAS Android build                    |

### Project structure

```

src/
app/ # expo-router routes only (routing layer)
features/ # domain modlets: accounts, transactions, subscriptions, # subscriptionProviders, currencies, categories, dashboard, settings
shared/ # cross-cutting modlets: data, design, navigation, i18n, # network, notifications, onboarding

```

Import from a feature/shared module via its alias, e.g. `import { TransactionForm } from "#features/transactions"`.

```

```
