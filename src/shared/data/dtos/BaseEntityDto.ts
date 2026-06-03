import { type DeleteDto } from "./DeleteDto"

export type BaseEntityDto = DeleteDto & {
  deletedAt?: Date | null
  createdAt: Date
  updatedAt: Date
}
