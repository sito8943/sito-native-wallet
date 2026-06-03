// Deep path on purpose: the #shared/accounts barrel pulls in useAccounts (which
// imports the Manager), creating an eval-time import cycle. The client folder
// has no such dependency.
import { AccountClient } from "#shared/accounts/AccountClient"
import { CategoryClient } from "#shared/categories"
import { CurrencyClient } from "#shared/currencies"
import { SubscriptionProviderClient } from "#shared/subscriptionProviders"
// Deep path on purpose: the #shared/transactions barrel pulls in the
// transaction hooks (which import the accounts/categories barrels and the
// Manager), creating an eval-time import cycle. The client folder has no such
// dependency.
import { TransactionClient } from "#shared/transactions/TransactionClient"

// Single facade over every entity client. The app never touches storage or a
// service directly — it always goes through manager.<Entity>.<method>().
// Clients are created lazily so this module has no eval-time dependency on them.
export class Manager {
  #accounts?: AccountClient
  #categories?: CategoryClient
  #currencies?: CurrencyClient
  #subscriptionProviders?: SubscriptionProviderClient
  #transactions?: TransactionClient

  public get Accounts(): AccountClient {
    return (this.#accounts ??= new AccountClient())
  }

  public get Categories(): CategoryClient {
    return (this.#categories ??= new CategoryClient())
  }

  public get Currencies(): CurrencyClient {
    return (this.#currencies ??= new CurrencyClient())
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
