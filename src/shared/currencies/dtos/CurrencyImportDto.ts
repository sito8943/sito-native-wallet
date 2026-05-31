import { type ImportDto } from "#shared/dtos"

import { type ImportPreviewCurrencyDto } from "./ImportPreviewCurrencyDto"

export type CurrencyImportDto = ImportDto<ImportPreviewCurrencyDto>
