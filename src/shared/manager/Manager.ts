import { CurrencyClient } from "#shared/currencies"

// Single facade over every entity client. The app never touches storage or a
// service directly — it always goes through manager.<Entity>.<method>().
// Clients are created lazily so this module has no eval-time dependency on them.
export class Manager {
  #currencies?: CurrencyClient

  public get Currencies(): CurrencyClient {
    return (this.#currencies ??= new CurrencyClient())
  }
}

export const manager = new Manager()
