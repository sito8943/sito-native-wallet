# SitoWallet

SitoWallet is a personal finance mobile app for everyday money management. It gives you a glanceable dashboard of your current balance, lets you record income and expenses, organize money across multiple accounts and currencies, categorize transactions, and keep recurring subscriptions visible so renewals never surprise you. It works offline first — every action is stored on-device and stays usable without a connection — making it a practical, private tracker for your day-to-day finances.

## Technical Overview

SitoWallet is an [Expo](https://docs.expo.dev/) (SDK 56) React Native app written in TypeScript with file-based routing via expo-router. The codebase is organized **feature-first**: routing lives in `src/app` (route files only) and is kept separate from application/rendering logic in `src/features/*` and `src/shared/*`. Each concept is an isolated **modlet** — a self-contained folder exposing its public surface through an `index.ts` barrel — consumed across the app via explicit subpath aliases (`#features/*`, `#shared/*`, `#design/*`) rather than relative `..` chains or a root alias. The app is **local-first**: a `StorageClient` over `AsyncStorage` acts as a stand-in backend, keeping persistence concerns out of the domain and UI so an online API can be swapped in later. Connectivity state is tracked for an offline banner, and local notifications drive subscription reminders.

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

- **Node 24** (see `.nvmrc` — run `nvm use`)
- npm
- For device/simulator builds: [Expo Go](https://expo.dev/go) or a dev client, plus Xcode (iOS) / Android Studio (Android)
- For cloud builds: an [Expo account](https://expo.dev/) and `eas-cli` (`npm i -g eas-cli`)

### Setup

```bash
nvm use            # Node 24
npm install        # .npmrc sets force=true
npm start          # launch the Expo dev server
```

Then press `i` (iOS simulator), `a` (Android emulator), or scan the QR code with a dev client.

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
  app/        # expo-router routes only (routing layer)
  features/   # domain modlets: accounts, transactions, subscriptions,
              # subscriptionProviders, currencies, categories, dashboard, settings
  shared/     # cross-cutting modlets: data, design, navigation, i18n,
              # network, notifications, onboarding
```

Import from a feature/shared module via its alias, e.g. `import { TransactionForm } from "#features/transactions"`.
