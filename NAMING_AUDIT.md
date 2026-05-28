# Naming Inconsistency Audit — SitoWallet

Audit fecha: 2026-05-28. Scope: `src/**/*.{ts,tsx}`.

---

## 1. Props Type Naming — `PropsType` vs `Props` ✅

Mezcla de sufijo. Mismo concepto, dos nombres.

**`PropsType` (6):**
- `src/shared/accounts/AccountCard/types.ts:3` — `AccountCardPropsType`
- `src/shared/transactions/TransactionCard/types.ts:3` — `TransactionCardPropsType`
- `src/shared/transactions/TransactionsFilters/types.ts:9` — `TransactionsFiltersPropsType`
- `src/shared/categories/CategoryCard/types.ts:3` — `CategoryCardPropsType`
- `src/shared/design/elements/Card/types.ts:5` — `CardPropsType`
- `src/shared/design/elements/Icon/types.ts:5` — `IconPropsType`

**`Props` (4):**
- `src/shared/design/elements/Badge/types.ts:5` — `BadgeProps`
- `src/shared/design/elements/IconButton/types.ts:13` — `IconButtonProps`
- `src/shared/design/elements/Typography/types.ts:7` — `TypographyProps`
- `src/shared/transactions/TransactionsFilters/types.ts:16` — `FilterChipProps`

**Fix:** canonizar `ComponentNameProps`. Drop `Type` suffix. Razón: `Props` ya implica tipo; `PropsType` redundante.

---

## 2. Type vs Interface

Todo usa `type`. Sin mezcla. Sin `I`-prefix. **OK, mantener.**

---

## 3. Constants — `UPPER_SNAKE` vs `camelCase` ✅

Mezcla dentro y entre archivos.

**`UPPER_SNAKE_CASE`:**
- `src/shared/theme/constants.ts:1` — `THEME_PREFERENCE_STORAGE_KEY`
- `src/shared/transactions/useFilteredTransactions/constants.ts:3` — `DEFAULT_TRANSACTIONS_PREFERENCES`
- `src/shared/transactions/useFilteredTransactions/constants.ts:6` — `TRANSACTIONS_PREFERENCES_STORAGE_KEY`
- `src/shared/design/elements/Icon/constants.ts:9` — `APP_ICONS`
- `src/shared/transactions/TransactionTypeBadge/constants.ts:3` — `TRANSACTION_TYPE_LABELS`

**`camelCase`:**
- `src/shared/design/elements/IconButton/constants.ts:5` — `buttonSizes`
- `src/shared/transactions/TransactionsFilters/constants.ts:1` — `typeOptions`
- `src/shared/transactions/TransactionsFilters/constants.ts:5` — `sortOptions`

**Fix:** Todo `UPPER_SNAKE_CASE` para constantes module-level inmutables. Rename: `buttonSizes`→`BUTTON_SIZES`, `typeOptions`→`TYPE_OPTIONS`, `sortOptions`→`SORT_OPTIONS`.

---

## 4. Prop Names — Mismo concepto, distinto nombre ✅

**Callback de press:**
- `src/shared/accounts/AccountCard/types.ts:3` — `onPress`
- `src/shared/transactions/TransactionCard/types.ts:3` — `onPress`
- `src/shared/transactions/TransactionList/types.ts:3` — `onTransactionPress` ← diferente

**Booleans sin prefijo `is`/`has`:**
- `src/shared/transactions/TransactionTypeBadge/types.ts:4` — `filled`
- `src/shared/design/elements/IconButton/types.ts:15` — `disabled`
- `src/shared/transactions/TransactionTypeBadge/types.ts:5-6` — `showIcon`, `showText`

**Boolean con prefijo:**
- `src/shared/transactions/TransactionsFilters/types.ts:16` — `isActive` (FilterChip)

**Fix:** 
- Callback: usar `onPress` cuando el contexto ya es claro (componente recibe `transaction`). Renombrar `onTransactionPress`→`onPress`.
- Booleans: dejar `disabled`/`filled` como están (props nativos/idiomáticos RN), pero `isActive` → renombrar a `active` para alinear, o mover todos a `is`-prefix. Elegir UN estilo.

---

## 5. Hooks — Return Shape

**Data hooks consistentes (`{ data, error, isLoading }`):**
- `useAccounts`, `useCategories`, `useCurrencies`, `useTransactions`

**Outliers:**
- `src/shared/storage/useStoredState/types.ts:7` — `{ value, setValue, error, isLoading }` (usa `value`/`setValue`)
- `src/shared/theme/useThemePreference.ts:10` — `{ preference, setPreference, togglePreference, isLoading }` (usa `preference`)

**Fix:** `useStoredState` es genérico — `value`/`setValue` es razonable (no es fetch). Dejar. `useThemePreference` también semánticamente válido — `preference` describe mejor que `data`. **No bug; documentar como excepción intencional** o renombrar a `data` si se quiere uniformidad estricta.

---

## 6. File Naming

Consistente. Component `.tsx` PascalCase, `types.ts`/`constants.ts`/`index.ts` lowercase. **OK.**

---

## 7. Enum / Union Casing — INCONSISTENCIA SERIA

**Enum numérico:**
```ts
// src/shared/categories/TransactionCategory/types.ts:1-4
export enum TransactionType {
  Out = 0,
  In = 1,
}
```

**Union string literals (lowercase):**
- `src/shared/transactions/TransactionsPreferences/types.ts:1` — `"all" | "income" | "expense"`
- `src/shared/transactions/TransactionsPreferences/types.ts:3` — `"newest" | "oldest"`

**Mapping forzado:**
- `src/shared/transactions/TransactionTypeBadge/constants.ts:3` — mapea `TransactionType.In` → `"income"`
- `src/shared/categories/CategoryCard/CategoryCard.tsx:11` — `category.type === TransactionType.In ? "income" : "expense"`

**Fix:** Reemplazar enum con union `type TransactionType = "income" | "expense"`. Elimina mapeo enum→string, alinea con `TransactionTypeFilter`, más tree-shakeable, menos runtime overhead.

---

## 8. Function / Variable Naming

Consistente. `get*`, `set*`, `reset*`, verbo de acción. **OK.**

---

## 9. Folder Naming

Feature folders plural (`accounts`, `categories`, `currencies`, `transactions`). Modelos singular (`Account`, `Transaction`). Componentes PascalCase. **Patrón consistente, OK.**

---

## 10. Import / Export

Named exports para components/hooks/types. Barrels `index.ts` uniformes. **OK.**

---

## Resumen / Prioridad

| # | Issue | Severidad | Esfuerzo |
|---|-------|-----------|----------|
| 1 | `PropsType` vs `Props` (10 archivos) ✅ | Media | Bajo |
| 3 | Constants camelCase vs UPPER_SNAKE (3 archivos) ✅ | Media | Bajo |
| 7 | Enum `TransactionType` vs lowercase unions | Alta | Medio |
| 4 | `onTransactionPress` vs `onPress` + boolean prefix mix ✅ | Baja | Bajo |
| 5 | Hook return shape outliers | Baja | Medio |

**Orden recomendado:**
1. Props sufijo — rename masivo a `ComponentNameProps`.
2. Constants — uppercase los 3 outliers.
3. Reemplazar enum `TransactionType` por union.
4. Decidir convención boolean (`is`-prefix o no) y aplicar.
5. (Opcional) Alinear hook returns.
