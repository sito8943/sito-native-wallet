import {
  textIncludes,
  type QueryParam,
  type QueryResult,
} from "#shared/data/query"
import { createId, StorageClient } from "#shared/data/storage"

// Type-only import: erased at runtime, so it can't form an eval-time cycle
// through the Manager that constructs this client.
import {
  ADJUSTMENT_CATEGORIES,
  INITIAL_CATEGORIES,
  TRANSFER_CATEGORIES,
} from "../../demoData"
import { type AddCategoryDto, type FilterCategoryDto } from "../../dtos"
import { type TransactionCategory } from "../../TransactionCategory"
import { type RemoteCategory } from "../RemoteCategoryClient"

import { CATEGORIES_ERROR_MESSAGE, CATEGORIES_STORAGE_KEY } from "./constants"
import { parseStoredCategories } from "./utils"

const matchesCategoryFilter =
  (filters: FilterCategoryDto) =>
  (category: TransactionCategory): boolean =>
    textIncludes(category.name, filters.name) &&
    (filters.type === undefined || category.type === filters.type)

export default class LocalCategoryClient extends StorageClient<TransactionCategory> {
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

  public ensureTransferCategories = (): void => {
    const existing = new Set(this.getAll().map((category) => category.id))
    this.insertMany(
      TRANSFER_CATEGORIES.filter((category) => !existing.has(category.id)),
    )
  }

  // --- Backend sync bookkeeping ---------------------------------------------
  // These mutate via `mutate` (not patch/insert) on purpose: they record server
  // state, not user edits, so they must NOT bump `updatedAt` or otherwise look
  // like a local change to the push diff.

  // Pull (insert-only): add backend categories we don't already track by
  // remoteId. Existing local rows are left untouched (local edits win until
  // pushed); the backend's own auto/system categories are skipped.
  public mergeRemote = (remote: RemoteCategory[]): void => {
    this.mutate((items) => {
      const known = new Set(
        items
          .map((category) => category.remoteId)
          .filter((id): id is number => id !== undefined),
      )

      const additions = remote
        .filter((row) => row.auto !== true && !known.has(row.id))
        .map<TransactionCategory>((row) => ({
          id: createId(),
          remoteId: row.id,
          name: row.name,
          description: row.description ?? undefined,
          color: row.color ?? "#9e9e9e",
          type: row.type,
        }))

      return additions.length === 0 ? items : [...items, ...additions]
    })
  }

  // Record the backend id assigned to a locally-created category after its POST.
  public attachRemoteId = (localId: number, remoteId: number): void => {
    this.mutate((items) =>
      items.map((category) =>
        category.id === localId ? { ...category, remoteId } : category,
      ),
    )
  }
}
