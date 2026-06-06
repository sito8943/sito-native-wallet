import { textIncludes, type QueryParam, type QueryResult } from "#shared/data"
import { createId, StorageClient } from "#shared/data/storage"

import { ADJUSTMENT_CATEGORIES, INITIAL_CATEGORIES } from "../demoData"
import { type AddCategoryDto, type FilterCategoryDto } from "../dtos"
import { type TransactionCategory } from "../TransactionCategory"

import { CATEGORIES_ERROR_MESSAGE, CATEGORIES_STORAGE_KEY } from "./constants"
import { parseStoredCategories } from "./utils"

const matchesCategoryFilter =
  (filters: FilterCategoryDto) =>
  (category: TransactionCategory): boolean =>
    textIncludes(category.name, filters.name) &&
    (filters.type === undefined || category.type === filters.type)

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

  public update = (id: number, input: AddCategoryDto): void => {
    this.patch(id, input)
  }

  // includeSystem defaults to true; management/list views pass false to hide
  // the system (adjustment) categories the user can't edit by hand.
  public list = (
    params: QueryParam<TransactionCategory> = {},
    filters?: FilterCategoryDto,
    includeSystem = true,
  ): QueryResult<TransactionCategory> => {
    const matchesFilter =
      filters === undefined ? undefined : matchesCategoryFilter(filters)

    return this.runQuery(
      params,
      (category) =>
        (includeSystem || category.system !== true) &&
        (matchesFilter === undefined || matchesFilter(category)),
    )
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
