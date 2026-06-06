import { type AddCategoryDto } from "../dtos"

export type CategoryFormProps = {
  defaultValues?: AddCategoryDto
  submitLabel: string
  onSubmit: (values: AddCategoryDto) => void
  onDelete?: () => void
}
