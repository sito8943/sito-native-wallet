# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0]

## [0.4.0]

### Added

- Authentication: sign-in flow with profile loading after sign in.
- Account, transaction and category CRUD.
- Entity sync layer (`useEntitySync`) that syncs multiple entities per account.
- Dashboard type resume card with recent activity and actions.
- Currencies and excluded categories.
- Auto-detect of the dev server.
- Architecture rules documentation.

### Changed

- Profile refactored to `useEntitySync` and can now save.
- Option-selection UX and account delete UX.

### Fixed

- Entity list.
- Circular imports in categories.
- Confirmation dialog no longer closes while loading.

## [0.3.0]

### Added

- Transfer action between accounts.
- Create prefab entities from the FAB.

### Changed

- Refactored dashboard modlets.
- Refactored image handling.

## [0.2.0]

### Added

- Transaction type shown on the Type Resume card.

### Changed

- Imports use path aliases instead of relative paths.
- Refactored shared constants.
- Spacing for the draggable card list.

### Fixed

- Failing tests.

## [0.1.0]

### Added

- Onboarding flow.
- Dashboard with draggable cards and a FAB to create new dashboard cards.
- Account and transaction detail views moved out of the tabs to allow easy back navigation.
- Account actions: adjust balance, lock balance, create transaction from account details.
- Swipe to delete with haptics.
- Bilingual (EN/ES) prefabs and full i18n with no hardcoded text.
- Empty states across the app.
- Offline banner.
- DateTime picker, Select input and Action dropdown components.
- Currency support and profile info.

### Changed

- Full client responsibility for accounts and transactions.
- Refactored features into the `#features` folder.

### Fixed

- Navigation on prefabs and duplicated empty state.
- Update issues and missing/Spanish translations.
