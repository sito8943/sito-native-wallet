// Deep path on purpose: the #features/accounts barrel pulls in useAccounts (which
// imports the Manager), creating an eval-time import cycle. The client folder
// has no such dependency.
import { LocalAccountClient } from "#features/accounts/clients/LocalAccountClient"
// Deep paths on purpose (same reason as accounts below): the feature barrels
// pull in the data hooks, which import the Manager — an eval-time cycle. The
// client folders have no such dependency.
import { LocalCategoryClient } from "#features/categories/clients/LocalCategoryClient"
import { LocalCurrencyClient } from "#features/currencies/clients/LocalCurrencyClient"
// Deep path on purpose: the #features/dashboard barrel pulls in the dashboard
// components (which import the Manager through the data hooks), creating an
// eval-time import cycle. The client folder has no such dependency.
import { DashboardClient } from "#features/dashboard/data/DashboardClient"
import { LocalSubscriptionProviderClient } from "#features/subscriptionProviders/clients/LocalSubscriptionProviderClient"
// Deep path on purpose: the #features/transactions barrel pulls in the
// transaction hooks (which import the accounts/categories barrels and the
// Manager), creating an eval-time import cycle. The client folder has no such
// dependency.
import { LocalTransactionClient } from "#features/transactions/clients/LocalTransactionClient"

// Single facade over every entity client. The app never touches storage or a
// service directly — it always goes through manager.<Entity>.<method>().
// Clients are created lazily so this module has no eval-time dependency on them.
export class Manager {
  #accounts?: LocalAccountClient
  #categories?: LocalCategoryClient
  #currencies?: LocalCurrencyClient
  #dashboard?: DashboardClient
  #subscriptionProviders?: LocalSubscriptionProviderClient
  #transactions?: LocalTransactionClient

  public get Accounts(): LocalAccountClient {
    // Lazy thunk for Transactions: creating an account records an initial
    // transaction, but the dependency is resolved at call time to avoid a
    // construction cycle (Transactions also needs Accounts).
    return (this.#accounts ??= new LocalAccountClient(() => this.Transactions))
  }

  public get Categories(): LocalCategoryClient {
    return (this.#categories ??= new LocalCategoryClient())
  }

  public get Currencies(): LocalCurrencyClient {
    return (this.#currencies ??= new LocalCurrencyClient())
  }

  public get Dashboard(): DashboardClient {
    return (this.#dashboard ??= new DashboardClient())
  }

  public get SubscriptionProviders(): LocalSubscriptionProviderClient {
    return (this.#subscriptionProviders ??= new LocalSubscriptionProviderClient())
  }

  public get Transactions(): LocalTransactionClient {
    // Injected with the accounts + categories clients: persisting a transaction
    // keeps the owning account's balance in sync (the local-first backend).
    return (this.#transactions ??= new LocalTransactionClient(
      this.Accounts,
      this.Categories,
    ))
  }

  // Reset every entity's local store to its seed. Called on sign-in (the
  // account's server data replaces the device's guest data) and on sign-out
  // (clean guest state). Touching each getter instantiates the client lazily,
  // so stores not yet created are reset on disk too — no stale data from a
  // previous user lingers behind an un-instantiated client.
  public clearLocalData = (): void => {
    this.Accounts.clear()
    this.Categories.clear()
    this.Currencies.clear()
    this.Dashboard.clear()
    this.SubscriptionProviders.clear()
    this.Transactions.clear()
  }
}

export const manager = new Manager()
