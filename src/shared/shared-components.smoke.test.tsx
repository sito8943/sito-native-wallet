import { render } from "@testing-library/react-native"

import {
  type Account,
  AccountAdjustBalanceSheet,
  AccountCard,
  AccountForm,
  AccountSelector,
} from "#shared/accounts"
import {
  type TransactionCategory,
  CategoryBullet,
  CategoryCard,
  CategoryForm,
} from "#shared/categories"
import { type Currency, CurrencyCard, CurrencyForm } from "#shared/currencies"
import { SettingsMenu } from "#shared/settings/SettingsMenu"
import {
  type SubscriptionProvider,
  SubscriptionProviderCard,
  SubscriptionProviderForm,
} from "#shared/subscriptionProviders"
import {
  SUBSCRIPTION_BILLING_UNIT,
  SUBSCRIPTION_STATUS,
  type Subscription,
  SubscriptionCard,
} from "#shared/subscriptions"
import {
  type Transaction,
  TransactionCard,
  TransactionForm,
  TransactionList,
  TransactionsFilters,
  TransactionTypeBadge,
} from "#shared/transactions"
import {
  TRANSACTION_SORT_ORDER,
  TRANSACTION_TYPE_FILTER,
} from "#shared/transactions/TransactionsPreferences"

const ts = {
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
}

const mockCurrencies: Currency[] = [
  {
    id: "usd",
    name: "US Dollar",
    symbol: "$",
    description: "Primary currency",
    ...ts,
  },
]

const mockAccounts: Account[] = [
  {
    id: "main",
    name: "Main account",
    balance: 1520.25,
    type: "digital",
    currency: mockCurrencies[0],
    ...ts,
  },
]

const mockCategories: TransactionCategory[] = [
  {
    id: "food",
    name: "Food",
    color: "#ef6c00",
    type: "expense",
    ...ts,
  },
  {
    id: "salary",
    name: "Salary",
    color: "#2e7d32",
    type: "income",
    ...ts,
  },
]

const accountsClient = { id: "accounts-client" }
const categoriesClient = { id: "categories-client" }
const currenciesClient = { id: "currencies-client" }
const subscriptionProvidersClient = { id: "subscription-providers-client" }
const transactionsClient = { id: "transactions-client" }

const mockSubscriptionProvider: SubscriptionProvider = {
  id: "netflix",
  name: "Netflix",
  description: "Streaming service",
  website: "https://netflix.com",
  ...ts,
}

const noop = (): void => undefined

const mockSubscription: Subscription = {
  id: "subscription-1",
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
  id: "transaction-1",
  description: "Groceries",
  amount: 42.35,
  date: "2026/06/02",
  account: {
    id: "main",
    name: "Main account",
    currencySymbol: "$",
  },
  categories: [
    {
      id: "food",
      name: "Food",
      color: "#ef6c00",
      type: "expense",
    },
  ],
}

jest.mock("#shared/data", () => ({
  useManager: () => ({
    Accounts: accountsClient,
    Categories: categoriesClient,
    Currencies: currenciesClient,
    SubscriptionProviders: subscriptionProvidersClient,
    Transactions: transactionsClient,
  }),
  todayStamp: () => "2026/01/01",
}))

jest.mock("#shared/data/storage", () => ({
  useStoredState: jest.fn(),
  createId: jest.fn(),
  StorageClient: jest.fn(),
  useClientStore: (store: { id: string }) => {
    switch (store.id) {
      case "accounts-client":
        return { items: mockAccounts, error: null, isLoading: false }
      case "categories-client":
        return { items: mockCategories, error: null, isLoading: false }
      case "currencies-client":
        return { items: mockCurrencies, error: null, isLoading: false }
      case "subscription-providers-client":
        return {
          items: [mockSubscriptionProvider],
          error: null,
          isLoading: false,
        }
      case "transactions-client":
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
        selectedId={null}
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
    const { getByText } = render(<SettingsMenu />)
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
    const { getByText } = render(<TransactionTypeBadge type="income" />)
    expect(getByText("income")).toBeTruthy()
  })

  it("renders TransactionsFilters", () => {
    const { getByText } = render(
      <TransactionsFilters
        preferences={{
          accountId: null,
          sortOrder: TRANSACTION_SORT_ORDER.NEWEST,
          typeFilter: TRANSACTION_TYPE_FILTER.ALL,
        }}
        setSortOrder={noop}
        setTypeFilter={noop}
      />,
    )

    expect(getByText("Filters")).toBeTruthy()
  })
})
