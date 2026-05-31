import { CategoryClient } from "#shared/categories"
import { CurrencyClient } from "#shared/currencies"
import { SubscriptionProviderClient } from "#shared/subscriptionProviders"

// Single facade over every entity client. The app never touches storage or a
// service directly — it always goes through manager.<Entity>.<method>().
// Clients are created lazily so this module has no eval-time dependency on them.
export class Manager {
  #categories?: CategoryClient
  #currencies?: CurrencyClient
  #subscriptionProviders?: SubscriptionProviderClient

  public get Categories(): CategoryClient {
    return (this.#categories ??= new CategoryClient())
  }

  public get Currencies(): CurrencyClient {
    return (this.#currencies ??= new CurrencyClient())
  }

  public get SubscriptionProviders(): SubscriptionProviderClient {
    return (this.#subscriptionProviders ??= new SubscriptionProviderClient())
  }
}

export const manager = new Manager()
