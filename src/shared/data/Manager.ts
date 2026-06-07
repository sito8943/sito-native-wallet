// Deep path on purpose: the #features/accounts barrel pulls in useAccounts (which
// imports the Manager), creating an eval-time import cycle. The client folder
// has no such dependency.
import { AccountClient } from "#features/accounts/AccountClient"
// Deep paths on purpose (same reason as accounts below): the feature barrels
// pull in the data hooks, which import the Manager — an eval-time cycle. The
// client folders have no such dependency.
import { CategoryClient } from "#features/categories/CategoryClient"
import { CurrencyClient } from "#features/currencies/CurrencyClient"
// Deep path on purpose: the #features/dashboard barrel pulls in the dashboard
// components (which import the Manager through the data hooks), creating an
// eval-time import cycle. The client folder has no such dependency.
import { DashboardClient } from "#features/dashboard/DashboardClient"
import { SubscriptionProviderClient } from "#features/subscriptionProviders/SubscriptionProviderClient"
// Deep path on purpose: the #features/transactions barrel pulls in the
// transaction hooks (which import the accounts/categories barrels and the
// Manager), creating an eval-time import cycle. The client folder has no such
// dependency.
import { TransactionClient } from "#features/transactions/TransactionClient"

// Single facade over every entity client. The app never touches storage or a
// service directly — it always goes through manager.<Entity>.<method>().
// Clients are created lazily so this module has no eval-time dependency on them.
export class Manager {
  #accounts?: AccountClient
  #categories?: CategoryClient
  #currencies?: CurrencyClient
  #dashboard?: DashboardClient
  #subscriptionProviders?: SubscriptionProviderClient
  #transactions?: TransactionClient

  public get Accounts(): AccountClient {
    // Lazy thunk for Transactions: creating an account records an initial
    // transaction, but the dependency is resolved at call time to avoid a
    // construction cycle (Transactions also needs Accounts).
    return (this.#accounts ??= new AccountClient(() => this.Transactions))
  }

  public get Categories(): CategoryClient {
    return (this.#categories ??= new CategoryClient())
  }

  public get Currencies(): CurrencyClient {
    return (this.#currencies ??= new CurrencyClient())
  }

  public get Dashboard(): DashboardClient {
    return (this.#dashboard ??= new DashboardClient())
  }

  public get SubscriptionProviders(): SubscriptionProviderClient {
    return (this.#subscriptionProviders ??= new SubscriptionProviderClient())
  }

  public get Transactions(): TransactionClient {
    // Injected with the accounts + categories clients: persisting a transaction
    // keeps the owning account's balance in sync (the local-first backend).
    return (this.#transactions ??= new TransactionClient(
      this.Accounts,
      this.Categories,
    ))
  }
}

export const manager = new Manager()
