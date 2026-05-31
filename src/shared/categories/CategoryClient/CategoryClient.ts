import { createId, StorageClient } from "#shared/storage"

import { INITIAL_CATEGORIES } from "../demoData"
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

  public update = (id: string, input: AddCategoryDto): void => {
    this.patch(id, input)
  }
}
