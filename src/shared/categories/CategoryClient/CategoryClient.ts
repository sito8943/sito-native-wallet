import { createId, StorageClient } from "#shared/data/storage"

import { ADJUSTMENT_CATEGORIES, INITIAL_CATEGORIES } from "../demoData"
import { type AddCategoryDto } from "../dtos"
import { type TransactionCategory } from "../TransactionCategory"

import { CATEGORIES_ERROR_MESSAGE, CATEGORIES_STORAGE_KEY } from "./constants"
import { parseStoredCategories } from "./utils"

export default class CategoryClient extends StorageClient<TransactionCategory> {
  constructor() {
    super({
      storageKey: CATEGORIES_STORAGE_KEY,
      errorMessage: CATEGORIES_ERROR_MESSAGE,
      initialValue: INITIAL_CATEGORIES,
      parse: parseStoredCategories,
    })
  }

  public add = (input: AddCategoryDto): void => {
    this.insert({ id: createId(), ...input })
  }

  public addMany = (inputs: AddCategoryDto[]): void => {
    this.insertMany(inputs.map((input) => ({ id: createId(), ...input })))
  }

  public update = (id: string, input: AddCategoryDto): void => {
    this.patch(id, input)
  }

  // Find-or-create the system adjustment categories (mirrors the backend
  // creating its auto category on demand). Called before recording an auto
  // transaction so its category always exists.
  public ensureAdjustmentCategories = (): void => {
    const existing = new Set(this.getAll().map((category) => category.id))
    this.insertMany(
      ADJUSTMENT_CATEGORIES.filter((category) => !existing.has(category.id)),
    )
  }
}
