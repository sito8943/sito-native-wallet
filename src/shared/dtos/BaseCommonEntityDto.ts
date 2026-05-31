import { type DeleteDto } from "./DeleteDto"

export type BaseCommonEntityDto = DeleteDto & {
  updatedAt: Date
}
