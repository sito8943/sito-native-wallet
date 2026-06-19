import { render } from "@testing-library/react-native"

import {
  type Account,
  AccountAdjustBalanceSheet,
  AccountCard,
  AccountForm,
  AccountSelector,
} from "#features/accounts"
import { SessionProvider } from "#features/auth"
import {
  TRANSACTION_TYPE,
  type TransactionCategory,
  CategoryBullet,
  CategoryCard,
  CategoryForm,
} from "#features/categories"
import { type Currency, CurrencyCard, CurrencyForm } from "#features/currencies"
import { SettingsMenu } from "#features/settings/components/SettingsMenu"
import {
  type SubscriptionProvider,
  SubscriptionProviderCard,
  SubscriptionProviderForm,
} from "#features/subscriptionProviders"
import {
  SUBSCRIPTION_BILLING_UNIT,
  SUBSCRIPTION_STATUS,
  type Subscription,
  SubscriptionCard,
} from "#features/subscriptions"
import {
  type Transaction,
  TransactionCard,
  TransactionForm,
  TransactionList,
  TransactionsFilterSheet,
  TransactionTypeBadge,
} from "#features/transactions"
import {
  TRANSACTION_SORT_ORDER,
  TRANSACTION_TYPE_FILTER,
} from "#features/transactions/TransactionsPreferences"

const ts = {
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
}

const mockCurrencies: Currency[] = [
  {
    id: 1,
    name: "US Dollar",
    symbol: "$",
    description: "Primary currency",
    ...ts,
  },
]

const mockAccounts: Account[] = [
  {
    id: 1,
    name: "Main account",
    balance: 1520.25,
    type: "digital",
    currency: mockCurrencies[0],
    ...ts,
  },
]

const mockCategories: TransactionCategory[] = [
  {
    id: 2,
    name: "Food",
    color: "#ef6c00",
    type: TRANSACTION_TYPE.EXPENSE,
    ...ts,
  },
  {
    id: 3,
    name: "Salary",
    color: "#2e7d32",
    type: TRANSACTION_TYPE.INCOME,
    ...ts,
  },
]

const mockSubscriptionProvider: SubscriptionProvider = {
  id: 1,
  name: "Netflix",
  description: "Streaming service",
  website: "https://netflix.com",
  ...ts,
}

const noop = (..._args: unknown[]): void => undefined

const createClient = <T extends { id: number }>(
  id: number,
  items: T[],
): {
  id: number
  list: (..._args: unknown[]) => {
    sort: null
    order: "asc"
    currentPage: number
    pageSize: number
    totalElements: number
    totalPages: number
    items: T[]
  }
  getById: (entityId: number) => T | undefined
  add: typeof noop
  addMany: typeof noop
  update: typeof noop
  remove: typeof noop
  adjustBalance: typeof noop
} => ({
  id,
  list: (..._args: unknown[]) => ({
    sort: null,
    order: "asc",
    currentPage: 0,
    pageSize: items.length,
    totalElements: items.length,
    totalPages: items.length === 0 ? 0 : 1,
    items,
  }),
  getById: (entityId: number) => items.find((item) => item.id === entityId),
  add: noop,
  addMany: noop,
  update: noop,
  remove: noop,
  adjustBalance: noop,
})

const mockSubscription: Subscription = {
  id: 1,
  name: "Netflix Premium",
  amount: 17.99,
  currency: mockCurrencies[0],
  provider: mockSubscriptionProvider,
  account: mockAccounts[0],
  billingFrequency: 1,
  billingUnit: SUBSCRIPTION_BILLING_UNIT.MONTH,
  nextRenewalAt: "2026-07-10T12:00:00.000Z",
  status: SUBSCRIPTION_STATUS.ACTIVE,
  notificationDaysBefore: 3,
}

const mockTransaction: Transaction = {
  id: 1,
  description: "Groceries",
  amount: 42.35,
  date: "2026/06/02",
  account: {
    id: 1,
    name: "Main account",
    currencySymbol: "$",
  },
  categories: [
    {
      id: 2,
      name: "Food",
      color: "#ef6c00",
      type: TRANSACTION_TYPE.EXPENSE,
    },
  ],
}

const mockAccountsClient = createClient(101, mockAccounts)
const mockCategoriesClient = createClient(102, mockCategories)
const mockCurrenciesClient = createClient(103, mockCurrencies)
const mockSubscriptionProvidersClient = createClient(104, [
  mockSubscriptionProvider,
])
const mockTransactionsClient = createClient(105, [mockTransaction])

jest.mock("#shared/data", () => ({
  useManager: () => ({
    Accounts: mockAccountsClient,
    Categories: mockCategoriesClient,
    Currencies: mockCurrenciesClient,
    SubscriptionProviders: mockSubscriptionProvidersClient,
    Transactions: mockTransactionsClient,
  }),
  todayStamp: () => "2026/01/01",
  parseStamp: (value: string) => new Date(value),
  formatStamp: (date: Date) => date.toISOString(),
}))

jest.mock("#shared/data/storage", () => ({
  useStoredState: jest.fn(),
  createId: jest.fn(),
  StorageClient: jest.fn(),
  useClientStore: (store: { id: number }) => {
    switch (store.id) {
      case 101:
        return { items: mockAccounts, error: null, isLoading: false }
      case 102:
        return { items: mockCategories, error: null, isLoading: false }
      case 103:
        return { items: mockCurrencies, error: null, isLoading: false }
      case 104:
        return {
          items: [mockSubscriptionProvider],
          error: null,
          isLoading: false,
        }
      case 105:
        return { items: [mockTransaction], error: null, isLoading: false }
      default:
        return { items: [], error: null, isLoading: false }
    }
  },
}))

describe("Shared feature component smoke tests", () => {
  it("renders AccountCard", () => {
    const { getByText } = render(<AccountCard account={mockAccounts[0]} />)
    expect(getByText("Main account")).toBeTruthy()
  })

  it("renders AccountForm", () => {
    const { getByText } = render(
      <AccountForm submitLabel="Save account" onSubmit={noop} />,
    )

    expect(getByText("Save account")).toBeTruthy()
  })

  it("renders AccountSelector", () => {
    const { getByText } = render(
      <AccountSelector
        accounts={mockAccounts}
        selectedId={0}
        onSelect={noop}
      />,
    )

    expect(getByText("All accounts")).toBeTruthy()
  })

  it("renders AccountAdjustBalanceSheet", () => {
    expect(() =>
      render(
        <AccountAdjustBalanceSheet
          account={mockAccounts[0]}
          open
          onClose={noop}
          onSubmit={noop}
        />,
      ),
    ).not.toThrow()
  })

  it("renders CategoryBullet", () => {
    const { getByText } = render(<CategoryBullet color="#ef6c00" name="Food" />)

    expect(getByText("Food")).toBeTruthy()
  })

  it("renders CategoryCard", () => {
    const { getByText } = render(<CategoryCard category={mockCategories[0]} />)
    expect(getByText("Food")).toBeTruthy()
  })

  it("renders CategoryForm", () => {
    const { getByText } = render(
      <CategoryForm submitLabel="Save category" onSubmit={noop} />,
    )

    expect(getByText("Save category")).toBeTruthy()
  })

  it("renders CurrencyCard", () => {
    const { getByText } = render(<CurrencyCard currency={mockCurrencies[0]} />)
    expect(getByText("US Dollar")).toBeTruthy()
  })

  it("renders CurrencyForm", () => {
    const { getByText } = render(
      <CurrencyForm submitLabel="Save currency" onSubmit={noop} />,
    )

    expect(getByText("Save currency")).toBeTruthy()
  })

  it("renders SettingsMenu", () => {
    const { getByText } = render(
      <SessionProvider>
        <SettingsMenu />
      </SessionProvider>,
    )
    expect(getByText("Profile")).toBeTruthy()
  })

  it("renders SubscriptionProviderCard", () => {
    const { getByText } = render(
      <SubscriptionProviderCard provider={mockSubscriptionProvider} />,
    )

    expect(getByText("Netflix")).toBeTruthy()
  })

  it("renders SubscriptionProviderForm", () => {
    const { getByText } = render(
      <SubscriptionProviderForm submitLabel="Save provider" onSubmit={noop} />,
    )

    expect(getByText("Save provider")).toBeTruthy()
  })

  it("renders SubscriptionCard", () => {
    const { getByText } = render(
      <SubscriptionCard subscription={mockSubscription} />,
    )

    expect(getByText("Netflix Premium")).toBeTruthy()
  })

  it("renders TransactionCard", () => {
    const { getByText } = render(
      <TransactionCard transaction={mockTransaction} />,
    )

    expect(getByText("Groceries")).toBeTruthy()
  })

  it("renders TransactionForm", () => {
    const { getByText } = render(
      <TransactionForm submitLabel="Save transaction" onSubmit={noop} />,
    )

    expect(getByText("Save transaction")).toBeTruthy()
  })

  it("renders TransactionList", () => {
    const { getByText } = render(<TransactionList data={[mockTransaction]} />)
    expect(getByText("Groceries")).toBeTruthy()
  })

  it("renders TransactionTypeBadge", () => {
    const { getByText } = render(
      <TransactionTypeBadge type={TRANSACTION_TYPE.INCOME} />,
    )
    expect(getByText(String(TRANSACTION_TYPE.INCOME))).toBeTruthy()
  })

  it("renders TransactionsFilterSheet", () => {
    const { getByText } = render(
      <TransactionsFilterSheet
        open
        preferences={{
          accountId: 0,
          sortOrder: TRANSACTION_SORT_ORDER.NEWEST,
          typeFilter: TRANSACTION_TYPE_FILTER.ALL,
        }}
        setSortOrder={noop}
        setTypeFilter={noop}
        onClose={noop}
      />,
    )

    expect(getByText("Filters")).toBeTruthy()
  })
})
